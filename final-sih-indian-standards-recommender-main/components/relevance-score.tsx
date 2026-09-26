import { cn } from '@/lib/utils'

function toPercent(score: number): number {
  return Math.round(score * 100)
}

function band(score: number): { label: string; tone: string } {
  if (score >= 0.85) return { label: 'High relevance', tone: 'text-success' }
  if (score >= 0.7) return { label: 'Moderate relevance', tone: 'text-brand' }
  return { label: 'Lower relevance', tone: 'text-muted-foreground' }
}

export function RelevanceScore({
  score,
  showBar = true,
  size = 'default',
  className,
}: {
  score: number
  showBar?: boolean
  size?: 'sm' | 'default'
  className?: string
}) {
  const percent = toPercent(score)
  const { label, tone } = band(score)

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={cn(
            'font-mono font-semibold tabular-nums',
            size === 'sm' ? 'text-lg' : 'text-2xl',
          )}
        >
          {percent}
          <span className="text-sm font-medium text-muted-foreground">%</span>
        </span>
        <span className={cn('text-xs font-medium', tone)}>{label}</span>
      </div>
      {showBar && (
        <div
          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Relevance score ${percent} percent`}
        >
          <div
            className="h-full rounded-full bg-brand transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      )}
      <p className="mt-1 text-[11px] text-muted-foreground">
        Relevance score — not a compliance score
      </p>
    </div>
  )
}
