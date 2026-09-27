```tsx
import type { Metadata } from 'next'
import { BookOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ExplorerClient } from '@/components/standards/explorer-client'

export const metadata: Metadata = {
  title: 'Standards Explorer | Indian Standards',
  description:
    'Browse and search the Indian Standards available in the prototype knowledge base.',
}

export default function StandardsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        {/* Page Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
              <BookOpen className="size-3.5" />
              Knowledge base
            </div>

            <Badge variant="warning">Prototype Knowledge Base</Badge>
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Indian Standards Explorer
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground text-pretty sm:text-base">
            Search and browse the standards currently indexed by the
            recommendation engine. Explore available standard information in
            one place.
          </p>
        </header>

        {/* Explorer */}
        <section className="mx-auto mt-10 max-w-6xl">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-semibold tracking-tight">
                Browse available standards
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                Search the prototype knowledge base to find standards and
                review their available information.
              </p>
            </div>

            <ExplorerClient />
          </div>
        </section>

        {/* Prototype Notice */}
        <div className="mx-auto mt-6 max-w-6xl rounded-xl border border-border bg-muted/30 px-5 py-4">
          <p className="text-xs leading-5 text-muted-foreground">
            <span className="font-semibold text-foreground">
              Prototype notice:
            </span>{' '}
            The codes and standard information shown here are fictional
            placeholders created for this prototype and are not real BIS
            standards.
          </p>
        </div>
      </div>
    </main>
  )
}
```
