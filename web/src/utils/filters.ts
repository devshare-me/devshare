import {
  BiCollection,
  BiAlarm,
  BiNews,
  BiCodeAlt,
  BiLink,
  BiGroup,
  BiVideo,
  BiImage,
} from 'react-icons/bi'

export const filters = [
  { name: 'All', icon: BiCollection },
  {
    name: 'Updates',
    singular: 'Update',
    icon: BiAlarm,
    color: 'indigo',
  },
  {
    name: 'Snippets',
    singular: 'Snippet',
    icon: BiCodeAlt,
    color: 'yellow',
  },
  {
    name: 'Links',
    singular: 'Link',
    icon: BiLink,
    color: 'blue',
  },
  {
    name: 'Images',
    singular: 'Image',
    icon: BiImage,
    color: 'pink',
  },
  {
    name: 'Videos',
    singular: 'Video',
    icon: BiVideo,
    color: 'red',
  },
  {
    name: 'Articles',
    singular: 'Article',
    icon: BiNews,
    color: 'green',
  },
]

export const views = [
  { name: 'Following', icon: BiGroup },
  { name: 'Recent', singular: 'Recent', icon: BiCollection, color: 'blue' },
]
