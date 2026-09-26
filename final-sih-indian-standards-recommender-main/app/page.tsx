import { Hero } from '@/components/home/hero'
import { ProblemComparison } from '@/components/home/problem-comparison'
import { FeaturesGrid } from '@/components/home/features-grid'
import { ProcessSteps } from '@/components/process-steps'
import { SectionHeading } from '@/components/section-heading'
import { CtaBand } from '@/components/cta-band'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemComparison />
      <FeaturesGrid />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="From requirement to reviewed recommendation in six steps"
          description="A transparent flow that always ends with human verification — the system assists the decision, it does not make it."
          className="mb-10"
        />
        <ProcessSteps />
      </section>

      <CtaBand />
    </>
  )
}
