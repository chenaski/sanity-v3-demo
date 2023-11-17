import React from 'react'
import {DocumentActionComponent, useDocumentOperation} from 'sanity'
import {CATEGORIES} from '../../constants'
import {Box, Button, Card, Label, Select} from '@sanity/ui'
import {PublishIcon, EditIcon} from '@sanity/icons'

export const ChangeCategoryAction: DocumentActionComponent = ({id, type, published, draft}) => {
  const doc = draft || published

  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const [category, setCategory] = React.useState<string>(doc?.category as string)

  const {patch} = useDocumentOperation(id, type)

  React.useEffect(() => {
    setCategory(doc?.category as string)
  }, [doc?.category])

  if (type !== 'post') return null

  const patchField = (field: string | null) => {
    if (!field || field === doc?.category) return
    patch.execute([{set: {category: field}}])
  }

  return {
    label: `Edit category`,
    icon: EditIcon,
    onHandle: () => {
      setCategory(category)
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'dialog',
      onClose: () => {
        setCategory(doc?.category as string)
        setDialogOpen(false)
      },
      header: 'Edit category',
      content: (
        <>
          <Card>
            <Label size={4}>Select new category</Label>
          </Card>

          <Box paddingY={4}>
            <Select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setCategory(e.target.value as string)
              }
              value={category}
            >
              {CATEGORIES.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.title}
                </option>
              ))}
            </Select>
          </Box>

          <Button
            tone="primary"
            icon={PublishIcon}
            onClick={() => {
              patchField(category)
              setDialogOpen(false)
            }}
            text={'Update'}
          />
        </>
      ),
    },
  }
}
