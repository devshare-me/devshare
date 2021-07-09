import {
  AuthenticationError,
  context,
  ForbiddenError,
  parseJWT,
} from '@redwoodjs/api'
import { db } from 'src/lib/db'
import cuid from 'cuid'

export const getCurrentUser = async (
  decoded,
  { _token, _type },
  { _event, _context }
) => {
  const email = decoded.email
  const name = decoded?.user_metadata?.full_name
  const image = decoded?.user_metadata?.avatar_url
  const extraData = {}

  let user = await db.user.findUnique({
    where: {
      email,
    },
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
    })
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
