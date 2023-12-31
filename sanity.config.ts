import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {categoryBadge} from './badges/categoryBadge'
import {ChangeCategoryAction} from './actions/changePostCategory'
import {structure} from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Sanity Project',

  projectId: 'lsqew6sh',
  dataset: 'production',

  plugins: [deskTool({structure}), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    badges: [categoryBadge],
    actions: [ChangeCategoryAction],
  },
})
