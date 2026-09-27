```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { ProcessSteps } from '@/components/process-steps'
import { ArchitectureDiagram } from '@/components/architecture-diagram'
import { Disclaimer } from '@/components/disclaimer'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'How It Works | Indian Standards',
  description:
    'Understand how the AI-assisted recommendation engine processes procurement requirements and presents potentially relevant Indian Standards.',
}

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Page Header */}
        <header className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center">
            <Badge variant="brand" className="gap-2 px-3 py-1.5">
              <Workflow className="size-3.5" />
              Architecture
            </Badge>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            How the recommendation engine works
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
            The system combines requirement understanding, semantic retrieval,
            and retrieval-augmented generation to identify potentially relevant
            Indian Standards using retrieved evidence.
          </p>
        </header>

        {/* User Process */}
        <section className="mt-16">
          <SectionHeading
            eyebrow="User process"
            title="From requirement to recommendation"
            description="Follow the six-step journey from entering a procurement requirement to reviewing potentially relevant standards."
            className="mb-10"
          />

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <ProcessSteps />
          </div>
        </section>

        {/* Technical Architecture */}
        <section className="mt-16 border-t border-border pt-16">
          <SectionHeading
            eyebrow="Technical architecture"
            title="The recommendation pipeline"
            description="Data moves through multiple stages. Retrieval happens before generation, and the language model works with retrieved evidence."
            className="mb-10"
          />

          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
            <ArchitectureDiagram />
          </div>
        </section>

        {/* Accuracy and Safety */}
        <section className="mt-16 border-t border-border pt-16">
          <SectionHeading
            eyebrow="Accuracy & safety"
            title="Designed to assist, not to decide"
            description="Recommendations are intended to support human review rather than replace professional or official verification."
            className="mb-8"
          />

          <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-start">
            <Disclaimer />

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-7">
              <p className="text-sm font-semibold">
                Language we use — and avoid
              </p>

              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-success">
                    We say
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    <li>Potentially relevant</li>
                    <li>Recommended</li>
                    <li>High relevance</li>
                    <li>Based on retrieved evidence</li>
                    <li>Requires verification</li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-destructive">
                    We avoid
                  </p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                    <li>This standard definitely applies</li>
                    <li>100% compliant</li>
                    <li>Certified</li>
                    <li>Government approved by AI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 flex justify-center">
          <Link
            href="/recommend"
            className={cn(
              buttonVariants(),
              'h-11 px-6 text-base shadow-sm',
            )}
          >
            Try it with your requirement
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </main>
  )
}
```
