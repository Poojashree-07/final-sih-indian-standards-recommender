import { Check, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const PROCESSING_PHASES = [
  'Understanding requirement...',
  'Searching standards...',
  'Ranking candidates...',
] as const

export function ProcessingState({ activeIndex }: { activeIndex: number }) {
  return (
    <div
      className="rounded-xl border border-border bg-card p-6"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm font-semibold">Analyzing your requirement</p>
      <ul className="mt-4 space-y-3">
        {PROCESSING_PHASES.map((phase, i) => {
          const done = i < activeIndex
          const active = i === activeIndex
          return (
            <li key={phase} className="flex items-center gap-3">
              <span
                className={cn(
                  'flex size-6 items-center justify-center rounded-full border transition-colors',
                  done && 'border-success bg-success/15 text-success',
                  active && 'border-brand bg-brand/15 text-brand',
                  !done && !active && 'border-border text-muted-foreground',
                )}
              >
                {done ? (
                  <Check className="size-3.5" />
                ) : active ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <span className="size-1.5 rounded-full bg-current" />
                )}
              </span>
              <span
                className={cn(
                  'text-sm',
                  done && 'text-muted-foreground line-through',
                  active && 'font-medium text-foreground',
                  !done && !active && 'text-muted-foreground',
                )}
              >
                {phase}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
