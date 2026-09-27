```tsx
'use client'

import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, GitCompare } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/status-badge'
import { getStandardById } from '@/lib/recommend-engine'

function ComparePageContent() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [ids, setIds] = useState<string[]>([])

  useEffect(() => {
    const urlIds =
      searchParams.get('ids')?.split(',').filter(Boolean) ?? []

    const saved = sessionStorage.getItem('compareStandards')
    const savedIds: string[] = saved ? JSON.parse(saved) : []

    const combined = Array.from(new Set([...savedIds, ...urlIds]))

    setIds(combined)
    sessionStorage.setItem('compareStandards', JSON.stringify(combined))
  }, [searchParams])

  const standards = ids
    .map((id) => getStandardById(id))
    .filter(
      (standard): standard is NonNullable<typeof standard> =>
        Boolean(standard),
    )

  const backHref = query
    ? `/results?q=${encodeURIComponent(query)}`
    : '/recommend'

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to recommendations
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
              <GitCompare className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Standards comparison
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                Compare Indian Standards
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Compare available standard information side by side. The comparison
            uses only information available in the current standards dataset;
            missing technical information is not inferred.
          </p>
        </header>

        {standards.length < 2 ? (
          <Card className="mt-10 overflow-hidden">
            <div className="flex flex-col items-center px-6 py-12 text-center">
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <GitCompare className="size-6 text-primary" />
              </div>

              <h2 className="mt-5 text-lg font-semibold">
                Select at least 2 standards
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Return to your recommendations and select another standard
                using the Compare option.
              </p>

              <Link
                href={backHref}
                className={cn(buttonVariants(), 'mt-6')}
              >
                <ArrowLeft className="size-4" />
                Back to recommendations
              </Link>
            </div>
          </Card>
        ) : (
          <>
            <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[950px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      <th className="w-48 p-5 text-left font-semibold">
                        Comparison field
                      </th>

                      {standards.map((standard) => (
                        <th
                          key={standard.id}
                          className="min-w-[280px] p-5 text-left align-top"
                        >
                          <div className="font-mono text-sm font-bold text-primary">
                            {standard.code}
                          </div>

                          <div className="mt-2 font-semibold leading-snug">
                            {standard.title}
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <StatusBadge status={standard.status} />

                            <Badge variant="outline">
                              {standard.type}
                            </Badge>
                          </div>

                          <Link
                            href={`/standards/${standard.id}`}
                            className={cn(
                              buttonVariants({
                                variant: 'outline',
                                size: 'sm',
                              }),
                              'mt-4',
                            )}
                          >
                            View details
                            <ArrowUpRight className="size-4" />
                          </Link>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    <ComparisonRow
                      label="Code"
                      standards={standards}
                      getValue={(s) => s.code}
                    />

                    <ComparisonRow
                      label="Title"
                      standards={standards}
                      getValue={(s) => s.title}
                    />

                    <ComparisonRow
                      label="Category"
                      standards={standards}
                      getValue={(s) => s.category}
                    />

                    <ComparisonRow
                      label="Application / Domain"
                      standards={standards}
                      getValue={(s) => s.application}
                    />

                    <ComparisonRow
                      label="Status"
                      standards={standards}
                      getValue={(s) => s.status}
                    />

                    <ComparisonRow
                      label="Year"
                      standards={standards}
                      getValue={(s) => s.date || 'Not available'}
                    />

                    <ComparisonRow
                      label="Material"
                      standards={standards}
                      getValue={(s) =>
                        s.material || 'Not available in the current dataset.'
                      }
                    />

                    <ComparisonRow
                      label="Dimensions"
                      standards={standards}
                      getValue={(s) =>
                        s.technicalRequirements.dimensions ||
                        'Not available in the current dataset.'
                      }
                    />

                    <ComparisonRow
                      label="Performance"
                      standards={standards}
                      getValue={(s) =>
                        s.technicalRequirements.performance ||
                        'Not available in the current dataset.'
                      }
                    />

                    <ComparisonRow
                      label="Testing"
                      standards={standards}
                      getValue={(s) =>
                        s.technicalRequirements.testing ||
                        'Not available in the current dataset.'
                      }
                    />

                    <ComparisonRow
                      label="Marking"
                      standards={standards}
                      getValue={(s) =>
                        s.technicalRequirements.marking ||
                        'Not available in the current dataset.'
                      }
                    />

                    <ComparisonRow
                      label="Evidence"
                      standards={standards}
                      getValue={(s) =>
                        s.evidenceTrace.matchedConcepts.length > 0
                          ? `Matched concepts: ${s.evidenceTrace.matchedConcepts.join(', ')}`
                          : 'No recommendation-specific evidence available.'
                      }
                    />

                    <ComparisonRow
                      label="Scope"
                      standards={standards}
                      getValue={(s) =>
                        s.scope || 'Not available in the current dataset.'
                      }
                    />
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
              <p className="text-sm font-semibold">
                Verification note
              </p>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This comparison does not determine compliance or legal
                applicability. The current dataset contains standard metadata
                and does not provide full standard clauses or technical
                specifications for verification.
              </p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

function ComparisonRow({
  label,
  standards,
  getValue,
}: {
  label: string
  standards: NonNullable<ReturnType<typeof getStandardById>>[]
  getValue: (
    standard: NonNullable<ReturnType<typeof getStandardById>>,
  ) => string
}) {
  return (
    <tr className="border-b border-border last:border-b-0">
      <th className="bg-muted/20 p-4 text-left align-top font-semibold">
        {label}
      </th>

      {standards.map((standard) => (
        <td
          key={standard.id}
          className="p-4 align-top leading-relaxed"
        >
          {getValue(standard)}
        </td>
      ))}
    </tr>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={null}>
      <ComparePageContent />
    </Suspense>
  )
}
```
