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
  {
    name: 'Updates',
    singular: 'Update',
    to: 'updates',
    icon: BiAlarm,
    color: 'blue',
  },
  {
    name: 'Snippets',
    singular: 'Snippet',
    to: 'snippets',
    icon: BiCodeAlt,
    color: 'yellow',
  },
  {
    name: 'Articles',
    singular: 'Article',
    to: 'articles',
    icon: BiNews,
    color: 'green',
  },
  {
    name: 'Links',
    singular: 'Link',
    to: 'links',
    icon: BiLink,
    color: 'red',
  },
]

export const views = [
  { name: 'Following', icon: BiGroup },
  { name: 'Recent', to: 'recent', icon: BiGroup, color: 'blue' },
]
