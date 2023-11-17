import {EyeClosedIcon} from '@sanity/icons'

import {CreatePostsAndAuthors} from './Component'

export const createPostsAndAuthors = () => {
  return {
    name: 'sanityPluginTest',
    title: 'sanityPluginTest',
    icon: EyeClosedIcon,
    component: CreatePostsAndAuthors,
  }
}
