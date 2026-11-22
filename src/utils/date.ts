
export function formatDate(dateString: string): string {
  if (!dateString) return ''

  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)

  if (isNaN(date.getTime())) return dateString

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}