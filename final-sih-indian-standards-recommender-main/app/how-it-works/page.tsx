import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { SectionHeading } from '@/components/section-heading'
import { ProcessSteps } from '@/components/process-steps'
import { ArchitectureDiagram } from '@/components/architecture-diagram'
import { Disclaimer } from '@/components/disclaimer'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'How the AI-assisted recommendation engine turns a natural-language procurement requirement into ranked, evidence-backed Indian Standards.',
}

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-3xl text-center">
        <Badge variant="brand" className="mb-4">
          Architecture
        </Badge>
        <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          How the recommendation engine works
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground text-pretty">
          The engine combines requirement understanding, semantic retrieval, and
          retrieval-augmented generation (RAG) so that every recommendation is grounded in
          retrieved standard sections — not invented by a language model.
        </p>
      </header>

      <section className="mt-16">
        <SectionHeading
          eyebrow="Overview"
          title="The six-step user process"
          className="mb-8"
        />
        <ProcessSteps />
      </section>

      <section className="mt-16 border-t border-border pt-16">
        <SectionHeading
          eyebrow="RAG pipeline"
          title="The technical flow, layer by layer"
          description="Data moves top to bottom. Retrieval happens before generation, and the language model only sees evidence that was actually retrieved."
          className="mb-10"
        />
        <ArchitectureDiagram />
      </section>

      <section className="mt-16 border-t border-border pt-16">
        <SectionHeading
          eyebrow="Accuracy & safety"
          title="Designed to assist, not to decide"
          className="mb-6"
        />
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <Disclaimer />
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold">Language we use — and avoid</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-success">
                  We say
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
                  <li>Potentially relevant</li>
                  <li>Recommended</li>
                  <li>High relevance</li>
                  <li>Based on retrieved evidence</li>
                  <li>Requires verification</li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-destructive">
                  We avoid
                </p>
                <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
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

      <div className="mt-16 flex justify-center">
        <Link href="/recommend" className={cn(buttonVariants(), 'h-11 px-6 text-base')}>
          Try it with your requirement
          <ArrowRight />
        </Link>
      </div>
    </div>
  )
}
