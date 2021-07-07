import { AuthenticationError, ForbiddenError, parseJWT } from '@redwoodjs/api'
import { db } from 'src/lib/db'
import cuid from 'cuid'

/**
 * getCurrentUser returns the user information together with
 * an optional collection of roles used by requireAuth() to check
 * if the user is authenticated or has role-based access
 *
 * @param decoded - The decoded access token containing user info and JWT claims like `sub`
 * @param { token, SupportedAuthTypes type } - The access token itself as well as the auth provider type
 * @param { APIGatewayEvent event, Context context } - An object which contains information from the invoker
 * such as headers and cookies, and the context information about the invocation such as IP Address
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
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

/**
 * Use requireAuth in your services to check that a user is logged in,
 * whether or not they are assigned a role, and optionally raise an
 * error if they're not.
 *
 * @param {string=} roles - An optional role or list of roles
 * @param {string[]=} roles - An optional list of roles
 * @returns {boolean} - If the currentUser is authenticated (and assigned one of the given roles)
 *
 * @throws {AuthenticationError} - If the currentUser is not authenticated
 * @throws {ForbiddenError} If the currentUser is not allowed due to role permissions
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
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
