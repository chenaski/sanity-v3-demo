import {EditIcon} from '@sanity/icons'
import {CATEGORIES} from '../../constants'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: EditIcon,
  fields: [
    {
      name: 'title',
      title: 'Post Title',
      type: 'string',
    },
    {
      name: 'text',
      title: 'Post Text',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      readOnly: ({document: {_createdAt}}: {document: {_createdAt: string}}) => !!_createdAt,
      options: {
        list: CATEGORIES,
      },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      text: 'text.0.children.0.text',
      author: 'author.name',
    },
    prepare(selection: {title: string; text: string; author: string}) {
      const {title, text, author} = selection
      return {
        title: title,
        subtitle: text,
        media: (
          <div>
            {author
              .split(' ')
              .slice(0, 2)
              .map((name: string) => name[0])}
          </div>
        ),
      }
    },
  },
}
