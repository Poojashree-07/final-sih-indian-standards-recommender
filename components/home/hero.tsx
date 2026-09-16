import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustLine } from '@/components/disclaimer'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="absolute inset-0 grid-blueprint opacity-[0.35]" />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand-muted/50 to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Badge variant="brand" className="mb-6">
            <Sparkles className="size-3.5" />
            Procurement standards intelligence
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the Right Indian Standards for Your Procurement Requirements
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Describe what you need in natural language. Our AI-assisted recommendation engine
            identifies potentially relevant Indian Standards and highlights the technical
            requirements that matter.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/recommend"
              className={cn(buttonVariants(), 'h-11 px-6 text-base')}
            >
              Find Applicable Standards
              <ArrowRight />
            </Link>
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: 'outline' }), 'h-11 px-6 text-base')}
            >
              How It Works
            </Link>
          </div>

          <TrustLine className="mt-8" />
        </div>
      </div>
    </section>
  )
}
