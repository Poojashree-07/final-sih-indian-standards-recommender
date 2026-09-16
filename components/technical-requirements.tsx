import {
  Boxes,
  Ruler,
  Gauge,
  Activity,
  FlaskConical,
  Tag,
  type LucideIcon,
} from 'lucide-react'
import type { TechnicalRequirements as TechRequirements } from '@/lib/types'

interface Row {
  key: keyof TechRequirements
  label: string
  icon: LucideIcon
}

const ROWS: Row[] = [
  { key: 'material', label: 'Material', icon: Boxes },
  { key: 'dimensions', label: 'Dimensions', icon: Ruler },
  { key: 'mechanicalProperties', label: 'Mechanical Properties', icon: Activity },
  { key: 'performance', label: 'Performance', icon: Gauge },
  { key: 'testing', label: 'Testing', icon: FlaskConical },
  { key: 'marking', label: 'Marking', icon: Tag },
]

export function TechnicalRequirements({
  requirements,
  columns = 2,
}: {
  requirements: TechRequirements
  columns?: 1 | 2 | 3
}) {
  const gridClass =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : columns === 2
        ? 'sm:grid-cols-2'
        : ''

  return (
    <dl className={`grid gap-3 ${gridClass}`}>
      {ROWS.map((row) => {
        const value = requirements[row.key]
        if (!value) return null
        return (
          <div
            key={row.key}
            className="rounded-lg border border-border bg-background p-3.5"
          >
            <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <row.icon className="size-3.5 text-brand" />
              {row.label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed">{value}</dd>
          </div>
        )
      })}
    </dl>
  )
}
