```tsx
import { ArrowUpRight } from 'lucide-react'
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border/80 bg-background p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md"
            >
              <div className="absolute right-0 top-0 h-20 w-20 rounded-full bg-brand/5 blur-2xl transition-opacity group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-muted text-brand ring-1 ring-brand/10">
                    <feature.icon className="size-5" />
                  </span>

                  <span className="font-mono text-xs font-semibold text-muted-foreground/60">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-5 flex items-center gap-1.5 text-base font-semibold">
                  {feature.title}
                  <ArrowUpRight className="size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```
