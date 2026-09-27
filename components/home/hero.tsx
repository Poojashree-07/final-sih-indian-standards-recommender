```tsx id="v5n8qx"
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustLine } from '@/components/disclaimer'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Background */}
      <div
        aria-hidden
        className="absolute inset-0 grid-blueprint opacity-[0.3]"
      />

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-muted/60 via-brand-muted/20 to-transparent"
      />

      <div
        aria-hidden
        className="absolute left-1/2 top-24 size-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Badge */}
          <Badge
            variant="brand"
            className="mb-6 rounded-full px-4 py-1.5 shadow-sm"
          >
            <Sparkles className="size-3.5" />
            Procurement standards intelligence
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Find the Right Indian Standards for Your Procurement Requirements
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-3xl text-base leading-7 text-muted-foreground text-pretty sm:text-lg">
            Describe what you need in natural language. Our AI-assisted
            recommendation engine identifies potentially relevant Indian
            Standards and highlights the technical requirements that matter.
          </p>

          {/* Actions */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/recommend"
              className={cn(
                buttonVariants(),
                'h-11 rounded-lg px-6 text-base shadow-sm',
              )}
            >
              Find Applicable Standards
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/how-it-works"
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'h-11 rounded-lg px-6 text-base',
              )}
            >
              How It Works
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-success" />
              Evidence-backed recommendations
            </span>

            <span className="hidden h-3.5 w-px bg-border sm:block" />

            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5 text-success" />
              Human verification required
            </span>
          </div>

          <TrustLine className="mt-5" />
        </div>
      </div>
    </section>
  )
}
```

Then push it:

```bash id="6k3mvp"
git add components/home/hero.tsx
```

```bash id="3r8nqw"
git commit -m "Improve homepage hero frontend"
```

```bash id="9t4zlx"
git push origin frontend
```

Run **one command at a time**.
