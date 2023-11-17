export const categoryBadge = ({published}) => {
  if (published) {
    return {
      label: published.category,
      title: 'Hello I am a badge for the category',
      color: 'success',
    }
  }
  return null
}
