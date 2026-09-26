import { ArrowRight, Clock, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SectionHeading } from '@/components/section-heading'

const TRADITIONAL = [
  'Requirement',
  'Manual Search',
  'Read Documents',
  'Identify Standard',
  'Extract Requirements',
]

const OUR_APPROACH = [
  'Requirement',
  'AI Understanding',
  'Semantic Search',
  'Ranked Standards',
  'Relevant Requirements',
]

function FlowRow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium">
            {step}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
          )}
        </li>
      ))}
    </ol>
  )
}

export function ProblemComparison() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <SectionHeading
        eyebrow="The problem"
        title="Teams know the product. The applicable standard is harder to find."
        description="Procurement teams often know exactly what they need to buy, but not immediately which Indian Standard applies — or which technical requirements to extract from it. That lookup is slow and easy to get wrong."
        className="mb-10"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
              <Clock className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Traditional process</p>
              <Badge variant="muted" className="mt-0.5">
                Manual & time-consuming
              </Badge>
            </div>
          </div>
          <FlowRow steps={TRADITIONAL} />
        </Card>

        <Card className="border-brand/30 bg-brand-muted/30 p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-md bg-brand text-brand-foreground">
              <Zap className="size-4" />
            </span>
            <div>
              <p className="text-sm font-semibold">Our approach</p>
              <Badge variant="brand" className="mt-0.5">
                AI-assisted & evidence-based
              </Badge>
            </div>
          </div>
          <FlowRow steps={OUR_APPROACH} />
        </Card>
      </div>
    </section>
  )
}
