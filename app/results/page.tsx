```tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Loader2 } from 'lucide-react'
import { ResultsClient } from '@/components/results/results-client'

export const metadata: Metadata = {
  title: 'Recommendations | Indian Standards',
  description:
    'Review AI-assisted Indian Standards recommendations for your procurement requirement.',
}

function ResultsFallback() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-md flex-col items-center rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="size-6 animate-spin text-primary" />
          </div>

          <h1 className="mt-5 text-xl font-semibold tracking-tight">
            Loading recommendations
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Please wait while we prepare your Indian Standards recommendations.
          </p>
        </div>
      </div>
    </main>
  )
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Suspense fallback={<ResultsFallback />}>
        <ResultsClient />
      </Suspense>
    </main>
  )
}
```
