import { unfurl } from 'unfurl.js'

export const ogData = async ({ url }) => {
  const data = await unfurl(url.replace(/\/+$/, ''))

  return {
    title: data.open_graph?.title || data.twitter_card?.title || data.title,
    description:
      data.open_graph?.description ||
      data.twitter_card?.description ||
      data.description,
    image: data.open_graph?.images[0]?.url || data.twitter_card?.images[0]?.url,
  }
}
