'use client'

import { SlidersHorizontal, ArrowDownWideNarrow } from 'lucide-react'

export type SortKey = 'relevant' | 'highest' | 'alphabetical'

export interface ResultFilters {
  category: string
  material: string
  application: string
  type: string
}

export const ALL = 'all'

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
}) {
  const id = `filter-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
      >
        <option value={ALL}>All</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

export function ResultsControls({
  filters,
  onFilterChange,
  sort,
  onSortChange,
  categories,
  materials,
  applications,
  types,
}: {
  filters: ResultFilters
  onFilterChange: (f: ResultFilters) => void
  sort: SortKey
  onSortChange: (s: SortKey) => void
  categories: readonly string[]
  materials: readonly string[]
  applications: readonly string[]
  types: readonly string[]
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center gap-2 text-sm font-semibold">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
        Refine
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-1">
        <Select
          label="Product category"
          value={filters.category}
          onChange={(v) => onFilterChange({ ...filters, category: v })}
          options={categories}
        />
        <Select
          label="Material"
          value={filters.material}
          onChange={(v) => onFilterChange({ ...filters, material: v })}
          options={materials}
        />
        <Select
          label="Application"
          value={filters.application}
          onChange={(v) => onFilterChange({ ...filters, application: v })}
          options={applications}
        />
        <Select
          label="Standard type"
          value={filters.type}
          onChange={(v) => onFilterChange({ ...filters, type: v })}
          options={types}
        />
      </div>

      <div className="mt-4 border-t border-border pt-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sort"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
          >
            <ArrowDownWideNarrow className="size-3.5" />
            Sort by
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
            className="h-9 rounded-md border border-input bg-background px-2.5 text-sm text-foreground outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <option value="relevant">Most relevant</option>
            <option value="highest">Highest relevance</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  )
}
