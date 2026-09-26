import {
  CheckCircle2,
  AlertTriangle,
  SearchCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { RequirementGapAnalysis } from '@/lib/types'

export function RequirementGapAnalysisPanel({
  gap,
}: {
  gap: RequirementGapAnalysis
}) {
  if (!gap.items || gap.items.length === 0) {
    return null
  }

  return (
    <div className="mt-5 rounded-lg border border-border bg-background p-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Requirement Gap Analysis
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          Shows whether the requested information is represented in the
          available standard data. This is not a compliance check.
        </p>
      </div>

      <div className="mt-4 space-y-3">
        {gap.items.map((item, index) => {
          const isAvailable = item.status === 'available'
          const isUnavailable = item.status === 'unavailable'
          const isVerification =
            item.status === 'needs-verification'

          return (
            <div
              key={`${item.field}-${item.requestedValue}-${index}`}
              className="rounded-md border border-border p-3"
            >
              <div className="flex items-start gap-3">
                {isAvailable && (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-green-600" />
                )}

                {isUnavailable && (
                  <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
                )}

                {isVerification && (
                  <SearchCheck className="mt-0.5 size-5 shrink-0 text-blue-600" />
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">
                      {item.field}
                    </p>

                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[11px] font-medium',
                        isAvailable &&
                          'bg-green-100 text-green-700',
                        isUnavailable &&
                          'bg-amber-100 text-amber-700',
                        isVerification &&
                          'bg-blue-100 text-blue-700',
                      )}
                    >
                      {isAvailable && 'Available'}
                      {isUnavailable && 'Not available'}
                      {isVerification &&
                        'Needs verification'}
                    </span>
                  </div>

                  <p className="mt-1 text-sm">
                    Requested:{' '}
                    <span className="font-medium">
                      {item.requestedValue}
                    </span>
                  </p>

                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.explanation}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}