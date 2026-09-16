import { ArrowDown } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PIPELINE_STAGES, NLP_SIGNALS, type PipelineStage } from '@/lib/content'

const GROUP_ORDER: PipelineStage['group'][] = [
  'Input',
  'NLP Layer',
  'Retrieval Layer',
  'Recommendation Layer',
  'RAG Layer',
  'Output',
]

const GROUP_TONE: Record<PipelineStage['group'], string> = {
  Input: 'border-l-brand',
  'NLP Layer': 'border-l-chart-2',
  'Retrieval Layer': 'border-l-chart-5',
  'Recommendation Layer': 'border-l-chart-4',
  'RAG Layer': 'border-l-brand',
  Output: 'border-l-success',
}

/** Vertical, layer-grouped pipeline used on the How It Works page. */
export function ArchitectureDiagram() {
  return (
    <div className="mx-auto max-w-3xl">
      {GROUP_ORDER.map((group, groupIndex) => {
        const stages = PIPELINE_STAGES.filter((s) => s.group === group)
        return (
          <div key={group}>
            <div className="mb-3 flex items-center gap-3">
              <Badge variant="outline" className="font-mono">
                {group}
              </Badge>
              <span aria-hidden className="h-px flex-1 bg-border" />
            </div>

            <div className="space-y-3">
              {stages.map((stage) => (
                <Card
                  key={stage.label}
                  className={`flex items-start gap-4 border-l-4 p-4 ${GROUP_TONE[group]}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
                    <stage.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{stage.label}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {stage.detail}
                    </p>

                    {stage.label === 'Requirement Understanding' && (
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {NLP_SIGNALS.map((signal) => (
                          <li key={signal.label}>
                            <Badge variant="secondary">{signal.label}</Badge>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {groupIndex < GROUP_ORDER.length - 1 && (
              <div className="flex justify-center py-3" aria-hidden>
                <ArrowDown className="size-5 text-muted-foreground" />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
