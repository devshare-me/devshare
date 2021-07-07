import {
  BiCollection,
  BiAlarm,
  BiNews,
  BiCodeAlt,
  BiLink,
  BiGroup,
} from 'react-icons/bi'

export const filters = [
  { name: 'All', icon: BiCollection },
  { name: 'Updates', to: 'updates', icon: BiAlarm, color: 'blue' },
  { name: 'Articles', to: 'articles', icon: BiNews, color: 'green' },
  { name: 'Snippets', to: 'snippets', icon: BiCodeAlt, color: 'yellow' },
  { name: 'Links', to: 'links', icon: BiLink, color: 'red' },
]

export const views = [
  { name: 'Following', icon: BiGroup },
  { name: 'Recent', to: 'recent', icon: BiGroup, color: 'blue' },
]
