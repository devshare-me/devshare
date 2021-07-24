import {
  AuthenticationError,
  context,
  ForbiddenError,
  parseJWT,
} from '@redwoodjs/api'
import { db } from 'src/lib/db'
import cuid from 'cuid'
import mailchimp from '@mailchimp/mailchimp_marketing'

process.env.MAILCHIMP_API_KEY &&
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  })

export const getCurrentUser = async (
  decoded,
  { _token, _type },
  { _event, _context }
) => {
  const email = decoded.email
  const name = decoded?.user_metadata?.full_name
  const image = decoded?.user_metadata?.avatar_url

  const extraData = {}
  const includes = {
    include: {
      following: {
        select: {
          id: true,
        },
      },
      bookmarks: {
        select: {
          postId: true,
        },
      },
      _count: {
        select: {
          bookmarks: true,
          comments: true,
          posts: true,
        },
      },
    },
  }

  let user = await db.user.findUnique({
    where: {
      email,
    },
    ...includes,
  })

  if (!user) {
    const id = cuid()

    if (image) {
      extraData['image'] = image
    }

    if (name) {
      extraData['name'] = name
    }

    user = await db.user.create({
      data: {
        id,
        email,
        username: id,
        ...extraData,
      },
      ...includes,
    })

    if (
      process.env.MAILCHIMP_API_KEY &&
      process.env.MAILCHIMP_AUDIENCE_ID &&
      process.env.NODE_ENV === 'production'
    ) {
      await mailchimp.lists.addListMember(process.env.MAILCHIMP_AUDIENCE_ID, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FULL_NAME: name ? name : '',
        },
      })
    }
  } else {
    if (image !== user.image) {
      extraData['image'] = image
    }

    if (name && !user.name) {
      extraData['name'] = name
    }

    if (Object.keys(extraData).length) {
      user = await db.user.update({
        where: {
          email,
        },
        data: {
          ...extraData,
        },
        ...includes,
      })
    }
  }

  return { ...user, roles: parseJWT({ decoded }).roles }
}

export const requireAuth = ({ role } = {}) => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    typeof role === 'string' &&
    !context.currentUser.roles?.includes(role)
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }

  if (
    typeof role !== 'undefined' &&
    Array.isArray(role) &&
    !context.currentUser.roles?.some((r) => role.includes(r))
  ) {
    throw new ForbiddenError("You don't have access to do that.")
  }
}
