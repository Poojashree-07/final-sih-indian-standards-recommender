import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { ExplorerClient } from '@/components/standards/explorer-client'

export const metadata: Metadata = {
  title: 'Standards Explorer',
  description:
    'Browse the prototype knowledge base of Indian Standards used by the recommendation engine.',
}

export default function StandardsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-8">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Knowledge base
          </p>
          <Badge variant="warning">Prototype Knowledge Base</Badge>
        </div>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl text-balance">
          Indian Standards Explorer
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
          Search and browse the standards currently indexed by the recommendation engine. All codes
          shown are fictional placeholders created for this prototype and are not real BIS
          standards.
        </p>
      </header>

      <ExplorerClient />
    </main>
  )
}
