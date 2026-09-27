```tsx
import type { Metadata } from 'next'
import { RequirementInput } from '@/components/requirement-input'
import { Disclaimer, TrustLine } from '@/components/disclaimer'
import { Badge } from '@/components/ui/badge'
import { PROCESS_STEPS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Find Applicable Indian Standards',
  description:
    'Describe your procurement requirement and discover potentially relevant Indian Standards with evidence-based explanations.',
}

export default function RecommendPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Page Header */}
        <header className="mx-auto max-w-3xl text-center">
          <Badge variant="brand" className="mb-5">
            AI-assisted recommendation
          </Badge>

          <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Find the right Indian Standards for your requirement
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
            Describe what you need to procure in simple language. The system analyses your
            requirement and identifies potentially relevant Indian Standards with supporting
            evidence.
          </p>

          <TrustLine className="mt-6" />
        </header>

        {/* Requirement Input */}
        <section
          aria-labelledby="requirement-input-heading"
          className="mx-auto mt-10 max-w-4xl"
        >
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <div className="mb-6">
              <h2
                id="requirement-input-heading"
                className="text-xl font-semibold tracking-tight"
              >
                Enter your procurement requirement
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Include important details such as product type, technical specifications,
                materials, performance requirements, or intended use.
              </p>
            </div>

            <RequirementInput />
          </div>
        </section>

        {/* Disclaimer */}
        <div className="mx-auto mt-6 max-w-4xl">
          <Disclaimer variant="compact" />
        </div>

        {/* Process */}
        <section className="mx-auto mt-14 max-w-5xl border-t border-border pt-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              What happens next
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              From requirement to recommendation
            </h2>

            <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Your requirement passes through a transparent process before the
              recommendations are presented for review.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {PROCESS_STEPS.slice(1, 4).map((step) => (
              <li
                key={step.id}
                className="rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                  {step.id}
                </span>

                <h3 className="mt-4 text-sm font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  )
}
```
