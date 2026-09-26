import { ArrowDown, FileText, Quote, Layers, ListChecks, MessageSquareText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { EvidenceTrace } from '@/lib/types'

interface ChainNode {
  icon: typeof FileText
  label: string
  render: (t: EvidenceTrace) => React.ReactNode
}

const CHAIN: ChainNode[] = [
  {
    icon: MessageSquareText,
    label: 'User Requirement',
    render: (t) => <p className="text-sm">{t.requirementSignal}</p>,
  },
  {
    icon: Layers,
    label: 'Matched Concepts',
    render: (t) => (
      <ul className="flex flex-wrap gap-1.5">
        {t.matchedConcepts.map((c) => (
          <li key={c}>
            <Badge variant="secondary">{c}</Badge>
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: FileText,
    label: 'Candidate Standard — Scope',
    render: (t) => <p className="text-sm leading-relaxed">{t.standardScope}</p>,
  },
  {
    icon: Quote,
    label: 'Supporting Sections',
    render: (t) => (
      <ul className="space-y-1">
        {t.supportingSections.map((s) => (
          <li key={s} className="text-sm text-muted-foreground">
            {s}
          </li>
        ))}
      </ul>
    ),
  },
  {
    icon: ListChecks,
    label: 'Extracted Requirements',
    render: (t) => (
      <ul className="space-y-1">
        {t.extractedRequirements.map((r) => (
          <li key={r} className="flex items-start gap-2 text-sm">
            <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
            {r}
          </li>
        ))}
      </ul>
    ),
  },
]

export function EvidencePanel({ trace }: { trace: EvidenceTrace }) {
  return (
    <div className="rounded-lg border border-border bg-muted/40 p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">Evidence &amp; traceability</p>
        <Badge variant="success">Evidence available</Badge>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
        Recommendation → Standard → Section → Supporting Evidence. Explanations are generated from
        the retrieved evidence below rather than invented.
      </p>

      <ol className="space-y-0">
        {CHAIN.map((node, i) => (
          <li key={node.label}>
            <div className="rounded-lg border border-border bg-background p-3.5">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <node.icon className="size-3.5 text-brand" />
                {node.label}
              </p>
              <div className="mt-2">{node.render(trace)}</div>
            </div>
            {i < CHAIN.length - 1 && (
              <div className="flex justify-center py-1.5" aria-hidden>
                <ArrowDown className="size-4 text-muted-foreground" />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
