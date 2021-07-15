export const postQuery = `
  id
  type
  user {
    name
    image
    username
  }
  shares {
    id
  }
  bookmarkedBy {
    userId
  }
  title
  url
  content
  description
  private
  createdAt
  updatedAt
`

export const feedQuery = `
  ${postQuery}
  sharedPost {
    ${postQuery}
  }
`

export const userQuery = `
  id
  username
  name
  image
  location
  github
  twitter
  website
  createdAt
`
