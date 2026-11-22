import { useMemo, useState } from 'react'

export function useSearch<T>(items: T[], fields: (keyof T)[]) {
  const [search, setSearch] = useState('')

  const results = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return items

    return items.filter((item) => {
      const text = fields
        .map((field) => String(item[field] ?? ''))
        .join(' ')
        .toLowerCase()
      return text.includes(term)
    })
  }, [items, fields, search])

  return { search, setSearch, results }
}