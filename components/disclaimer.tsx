import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const DISCLAIMER_TEXT =
  'Recommendations are AI-assisted and based on available retrieved information. They do not constitute legal, regulatory, certification, or final procurement advice. Final applicability and compliance decisions must be verified by the responsible technical / procurement authority.'

export function Disclaimer({
  className,
  variant = 'default',
}: {
  className?: string
  variant?: 'default' | 'compact'
}) {
  return (
    <aside
      role="note"
      aria-label="Important recommendation disclaimer"
      className={cn(
        'flex gap-3 rounded-lg border border-warning/40 bg-warning/10 p-4',
        variant === 'compact' && 'p-3',
        className,
      )}
    >
      <Info className="mt-0.5 size-4 shrink-0 text-warning-foreground" aria-hidden />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-warning-foreground">
          Important: AI-assisted recommendations require human verification
        </p>
        <p
          className={cn(
            'text-sm leading-relaxed text-warning-foreground/90',
            variant === 'compact' && 'text-xs',
          )}
        >
          {DISCLAIMER_TEXT}
        </p>
      </div>
    </aside>
  )
}

/** Small single-line trust marker used under the hero and page headers. */
export function TrustLine({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs font-medium text-muted-foreground',
        className,
      )}
    >
      <span>AI-assisted recommendation</span>
      <span aria-hidden className="text-border">•</span>
      <span>Evidence-based retrieval</span>
      <span aria-hidden className="text-border">•</span>
      <span>Human review required</span>
    </p>
  )
}
