```tsx
import { ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react'
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

function FlowRow({
  steps,
  highlighted = false,
}: {
  steps: string[]
  highlighted?: boolean
}) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          <span
            className={
              highlighted
                ? 'rounded-lg border border-brand/20 bg-background px-3 py-1.5 text-xs font-medium shadow-sm'
                : 'rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium'
            }
          >
            {step}
          </span>

          {i < steps.length - 1 && (
            <ArrowRight
              className="size-3.5 shrink-0 text-muted-foreground"
              aria-hidden
            />
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

      <div className="grid gap-5 lg:grid-cols-2">
        <Card className="group overflow-hidden border-border/80 bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7">
          <div className="mb-6 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Clock className="size-5" />
            </span>

            <div>
              <p className="text-sm font-semibold">Traditional process</p>

              <Badge variant="muted" className="mt-1">
                Manual & time-consuming
              </Badge>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <FlowRow steps={TRADITIONAL} />
          </div>

          <p className="mt-5 text-sm leading-6 text-muted-foreground">
            Users must manually search documents, identify the relevant
            standard, and extract the requirements needed for procurement.
          </p>
        </Card>

        <Card className="group relative overflow-hidden border-brand/30 bg-brand-muted/30 p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-7">
          <div
            aria-hidden
            className="absolute right-0 top-0 size-32 rounded-full bg-brand/10 blur-3xl"
          />

          <div className="relative">
            <div className="mb-6 flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground shadow-sm">
                <Zap className="size-5" />
              </span>

              <div>
                <p className="text-sm font-semibold">Our approach</p>

                <Badge variant="brand" className="mt-1">
                  AI-assisted & evidence-based
                </Badge>
              </div>
            </div>

            <div className="rounded-xl border border-brand/20 bg-background/80 p-4">
              <FlowRow steps={OUR_APPROACH} highlighted />
            </div>

            <div className="mt-5 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-success" />
              <p>
                Requirements are interpreted, relevant standards are ranked,
                and supporting information is presented for human review.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
```
