import type { RequirementGapAnalysis } from '@/lib/types'

type Props = {
  gap?: RequirementGapAnalysis
}

export function RequirementGapAnalysisPanel({ gap }: Props) {
  if (!gap || gap.items.length === 0) {
    return null
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">
        Requirement Gap Analysis
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Comparison between the requested requirement and information
        represented in the available standard data.
      </p>

      <div className="mt-4 space-y-3">
        {gap.items.map((item, index) => {
          const status =
            item.status === 'available'
              ? '✅ Available'
              : item.status === 'unavailable'
                ? '⚠️ Not available'
                : '🔍 Needs verification'

          return (
            <div
              key={`${item.field}-${index}`}
              className="rounded-lg border p-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{item.field}</p>
                  <p className="text-sm text-gray-600">
                    Requested: {item.requestedValue}
                  </p>
                </div>

                <span className="whitespace-nowrap text-sm font-medium">
                  {status}
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-500">
                {item.explanation}
              </p>
            </div>
          )
        })}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        This is not a compliance check. Final compliance must be verified
        against the applicable Indian Standard.
      </p>
    </div>
  )
}