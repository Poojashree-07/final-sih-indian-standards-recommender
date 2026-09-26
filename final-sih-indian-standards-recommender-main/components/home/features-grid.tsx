import { Card } from '@/components/ui/card'
import { SectionHeading } from '@/components/section-heading'
import { FEATURES } from '@/lib/content'

export function FeaturesGrid() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <SectionHeading
          eyebrow="Capabilities"
          title="A retrieval pipeline built for procurement accuracy"
          description="Each stage is designed to keep recommendations grounded in retrieved standard sections rather than free-form generation."
          className="mb-10"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="p-6 transition-colors hover:border-brand/40">
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-muted text-brand">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
