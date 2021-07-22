import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { Octokit } from '@octokit/core'

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      email
      username
      name
      image
      location
      github
      twitter
      website
      createdAt
    }
  }
`

const GithubProfile = () => {
  const { isAuthenticated, currentUser, client } = useAuth()

  const [updateUser, { loading, error }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      location.reload()
    },
  })

  React.useEffect(() => {
    async function getGithubProfile() {
      const input = {}
      const session = client.auth.session()

      if (session.provider_token) {
        const octokit = new Octokit({
          auth: session.provider_token,
        })
        const { data } = await octokit.request('GET /user')

        const username = data.login
        const image = data.avatar_url

        if (username !== currentUser.username) {
          input['username'] = username
          input['github'] = username
        }

        if (image !== currentUser.image) {
          input['image'] = image
        }

        if (Object.keys(input).length !== 0 && input.constructor === Object) {
          input['darkMode'] = currentUser.darkMode

          updateUser({
            variables: {
              id: currentUser.id,
              input,
            },
          })
        }
      }
    }

    if (isAuthenticated) {
      getGithubProfile()
    }
  }, [isAuthenticated])

  return <></>
}

export default GithubProfile
