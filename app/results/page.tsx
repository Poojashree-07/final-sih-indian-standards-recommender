import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Loader2 } from 'lucide-react'
import { ResultsClient } from '@/components/results/results-client'

export const metadata: Metadata = {
  title: 'Recommendations',
  description:
    'AI-assisted recommendations of potentially relevant Indian Standards for your procurement requirement.',
}

function ResultsFallback() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card px-6 py-16 text-center">
      <Loader2 className="size-6 animate-spin text-primary" />
      <p className="mt-4 text-sm font-medium">Loading results…</p>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          Recommendation results
        </p>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl text-balance">
          Recommended Indian Standards
        </h1>
      </header>

      <Suspense fallback={<ResultsFallback />}>
        <ResultsClient />
      </Suspense>
    </main>
  )
}
