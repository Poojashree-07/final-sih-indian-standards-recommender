'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FileQuestion, AlertTriangle, Loader2, SearchX } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Disclaimer } from '@/components/disclaimer'
import { EmptyState } from '@/components/empty-state'
import { StandardCard } from '@/components/results/standard-card'
import { ResultsSummary } from '@/components/results/results-summary'
import {
  ResultsControls,
  ALL,
  type ResultFilters,
  type SortKey,
} from '@/components/results/results-controls'
import { fetchRecommendations, RecommendationError } from '@/lib/api'

import { getStandardById } from '@/lib/mock-data'
import { CATEGORIES, MATERIALS, APPLICATIONS, STANDARD_TYPES } from '@/lib/mock-data'
import type { Recommendation } from '@/lib/types'

type Status = 'idle' | 'loading' | 'ready' | 'error' | 'no-query'

export function ResultsClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const [status, setStatus] = useState<Status>('idle')
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const [filters, setFilters] = useState<ResultFilters>({
    category: ALL,
    material: ALL,
    application: ALL,
    type: ALL,
  })
  const [sort, setSort] = useState<SortKey>('relevant')

  useEffect(() => {
    if (!query) {
      setStatus('no-query')
      return
    }

    // Fast path: use the result cached by the /recommend processing flow.
        setStatus('loading')

    const controller = new AbortController()
    setStatus('loading')
    fetchRecommendations(query, controller.signal)
      .then((res) => {
        setRecommendations(res.recommendations)
        setStatus('ready')
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === 'AbortError') return
        setErrorMessage(
          err instanceof RecommendationError
            ? err.message
            : 'Something went wrong while fetching recommendations.',
        )
        setStatus('error')
      })

    return () => controller.abort()
  }, [query])

  const visible = useMemo(() => {
    const filtered = recommendations.filter((rec) => {
      const std = getStandardById(rec.standardId)
      if (!std) return true
      if (filters.category !== ALL && std.category !== filters.category) return false
      if (filters.material !== ALL && std.material !== filters.material) return false
      if (filters.application !== ALL && std.application !== filters.application) return false
      if (filters.type !== ALL && std.type !== filters.type) return false
      return true
    })

    const sorted = [...filtered]
    if (sort === 'alphabetical') {
      sorted.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      // Both "most relevant" and "highest relevance" order by score for the MVP.
      sorted.sort((a, b) => b.relevanceScore - a.relevanceScore)
    }
    return sorted
  }, [recommendations, filters, sort])

  if (status === 'no-query') {
    return (
      <EmptyState
        icon={<FileQuestion className="size-6" />}
        title="No requirement provided"
        description="Start by describing what you need to procure. We'll identify potentially relevant Indian Standards."
        action={
          <Link href="/recommend" className={cn(buttonVariants())}>
            Describe a requirement
          </Link>
        }
      />
    )
  }

  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-16 text-center">
        <Loader2 className="size-6 animate-spin text-primary" />
        <p className="mt-4 text-sm font-medium">Retrieving recommendations…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <EmptyState
        icon={<AlertTriangle className="size-6 text-warning-foreground" />}
        title="Could not load recommendations"
        description={errorMessage}
        action={
          <Link href="/recommend" className={cn(buttonVariants())}>
            Try again
          </Link>
        }
      />
    )
  }

  return (
  <div className="space-y-6">
    <div className="flex items-center justify-between gap-4">
      <ResultsSummary query={query} count={visible.length} />

      <Link
        href="/recommend"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        Search Again
      </Link>
    </div>

    <Disclaimer />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ResultsControls
            filters={filters}
            onFilterChange={setFilters}
            sort={sort}
            onSortChange={setSort}
            categories={CATEGORIES}
            materials={MATERIALS}
            applications={APPLICATIONS}
            types={STANDARD_TYPES}
          />
        </aside>

        <div className="min-w-0 space-y-4">
          {visible.length === 0 ? (
            <EmptyState
              icon={<SearchX className="size-6" />}
              title="No relevant standards found"
              description="Try adding more details about the product, application, material, dimensions, or performance requirements — or relax the active filters."
              action={
                <Link href="/recommend" className={cn(buttonVariants({ variant: 'outline' }))}>
                  Refine requirement
                </Link>
              }
            />
          ) : (
            visible.map((rec, i) => (
              <StandardCard key={rec.standardId} recommendation={rec} rank={i + 1} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
