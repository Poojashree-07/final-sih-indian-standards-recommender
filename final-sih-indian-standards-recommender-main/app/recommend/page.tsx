import type { Metadata } from 'next'
import { RequirementInput } from '@/components/requirement-input'
import { Disclaimer, TrustLine } from '@/components/disclaimer'
import { Badge } from '@/components/ui/badge'
import { PROCESS_STEPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Find Applicable Standards',
  description:
    'Describe your procurement requirement in natural language to receive potentially relevant Indian Standards with evidence-based explanations.',
}

export default function RecommendPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <Badge variant="brand" className="mb-4">
          Recommendation engine
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          Describe what you need to procure
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          The engine reads your requirement, retrieves related standard sections, and returns a
          ranked list of potentially relevant Indian Standards with supporting evidence.
        </p>
        <TrustLine className="mt-6" />
      </header>

      <div className="mt-10">
        <RequirementInput />
      </div>

      <div className="mt-6">
        <Disclaimer variant="compact" />
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <p className="text-sm font-semibold">What happens after you search</p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-3">
          {PROCESS_STEPS.slice(1, 4).map((step) => (
            <li key={step.id} className="rounded-lg border border-border bg-card p-4">
              <span className="font-mono text-xs font-semibold text-brand">{step.id}</span>
              <p className="mt-1 text-sm font-medium">{step.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
