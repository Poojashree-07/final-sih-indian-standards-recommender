import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-primary px-6 py-12 text-primary-foreground sm:px-12">
        <div aria-hidden className="absolute inset-0 grid-blueprint opacity-10" />
        <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
              Start with a requirement, not a standard number
            </h2>
            <p className="mt-3 text-base leading-relaxed text-primary-foreground/80">
              Describe your procurement need and review potentially relevant standards with their
              supporting evidence in seconds.
            </p>
          </div>
          <Link
            href="/recommend"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-11 shrink-0 px-6 text-base',
            )}
          >
            Find Applicable Standards
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  )
}
