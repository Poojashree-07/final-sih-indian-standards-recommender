```tsx id="f7k2qm"
import Link from 'next/link'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { Disclaimer } from '@/components/disclaimer'

const FOOTER_LINKS = [
  { href: '/recommend', label: 'Recommend' },
  { href: '/standards', label: 'Standards Explorer' },
  { href: '/how-it-works', label: 'How It Works' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Disclaimer className="mb-10" />

        <div className="border-t border-border pt-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="max-w-md">
              <Link
                href="/"
                className="group inline-flex items-center gap-3"
                aria-label="StandardsIQ home"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
                  <ShieldCheck className="size-5" />
                </span>

                <span className="leading-tight">
                  <span className="block text-sm font-bold">
                    StandardsIQ
                  </span>

                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Standards Intelligence
                  </span>
                </span>
              </Link>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                AI-assisted Indian Standards recommendation engine designed
                to help users discover potentially relevant standards for
                procurement requirements.
              </p>
            </div>

            {/* Navigation */}
            <nav
              className="flex flex-col gap-3"
              aria-label="Footer navigation"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Explore
              </p>

              <div className="flex flex-col gap-2.5">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Prototype Notice */}
          <div className="mt-10 border-t border-border pt-6">
            <p className="text-xs leading-5 text-muted-foreground">
              <span className="font-semibold text-foreground">
                Smart India Hackathon prototype.
              </span>{' '}
              All IS codes shown are fictional placeholders and do not
              represent real Bureau of Indian Standards publications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

Then push:

```bash id="b7v1xn"
git add components/site-footer.tsx
```

```bash id="f2k8rm"
git commit -m "Polish footer frontend"
```

```bash id="q5d3tp"
git push origin frontend
```

Run them **one at a time**.
