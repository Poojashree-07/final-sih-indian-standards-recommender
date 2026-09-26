'use client'

import { useState } from 'react'
import { ChevronDown, MessageSquareText } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ResultsSummary({
  query,
  count,
}: {
  query: string
  count: number
}) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground">
        <span className="font-mono text-2xl font-semibold text-foreground">{count}</span>{' '}
        potentially relevant {count === 1 ? 'standard' : 'standards'} found
      </p>

      <div className="mt-4 rounded-lg border border-border bg-card">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center gap-3 px-4 py-3 text-left"
        >
          <MessageSquareText className="size-4 shrink-0 text-muted-foreground" />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Your requirement
            </span>
            <span
              className={cn(
                'mt-0.5 block text-sm text-foreground',
                !open && 'truncate',
              )}
            >
              {query}
            </span>
          </span>
          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-muted-foreground transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>
      </div>
    </div>
  )
}
