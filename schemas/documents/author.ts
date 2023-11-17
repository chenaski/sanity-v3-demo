import {UserIcon} from '@sanity/icons'

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    {
      name: 'name',
      title: 'Author Name',
      type: 'string',
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
    },
  ],
}
