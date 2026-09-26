'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Search, ArrowUpRight, SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/status-badge'
import { EmptyState } from '@/components/empty-state'
import { MOCK_STANDARDS, CATEGORIES } from '@/lib/mock-data'

const ALL = 'All categories'

export function ExplorerClient() {
  const [term, setTerm] = useState('')
  const [category, setCategory] = useState<string>(ALL)

  const results = useMemo(() => {
    const q = term.trim().toLowerCase()
    return MOCK_STANDARDS.filter((s) => {
      if (category !== ALL && s.category !== category) return false
      if (!q) return true
      return (
        s.title.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.scope.toLowerCase().includes(q)
      )
    })
  }, [term, category])

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by code, title, category, or scope…"
          aria-label="Search standards"
          className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2">
        {[ALL, ...CATEGORIES].map((c) => {
          const active = c === category
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                active
                  ? 'border-transparent bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-ring hover:text-foreground',
              )}
            >
              {c}
            </button>
          )
        })}
      </div>

      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{results.length}</span> of{' '}
        {MOCK_STANDARDS.length} prototype standards
      </p>

      {/* Results */}
      {results.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-6" />}
          title="No standards match your search"
          description="Try a different keyword or clear the category filter."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((s) => (
            <Link key={s.id} href={`/standards/${s.id}`} className="group block">
              <Card className="h-full p-5 transition-colors group-hover:border-ring">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
                    {s.code}
                  </span>
                  <StatusBadge status={s.status} />
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-balance">
                  {s.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {s.scope}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                  <Badge variant="outline">{s.category}</Badge>
                  <Badge variant="muted">{s.type}</Badge>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Details
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
