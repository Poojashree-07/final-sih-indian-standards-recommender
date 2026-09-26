import { Card } from '@/components/ui/card'
import { PROCESS_STEPS } from '@/lib/content'

export function ProcessSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {PROCESS_STEPS.map((step) => (
        <Card key={step.id} className="relative p-6">
          <span
            aria-hidden
            className="font-mono text-sm font-semibold text-brand"
          >
            {step.id}
          </span>
          <h3 className="mt-2 text-base font-semibold">{step.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {step.description}
          </p>
        </Card>
      ))}
    </div>
  )
}
