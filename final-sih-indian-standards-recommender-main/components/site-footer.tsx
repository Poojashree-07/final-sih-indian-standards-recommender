import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { Disclaimer } from '@/components/disclaimer'

const FOOTER_LINKS = [
  { href: '/recommend', label: 'Recommend' },
  { href: '/standards', label: 'Standards Explorer' },
  { href: '/how-it-works', label: 'How It Works' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Disclaimer className="mb-8" />

        <div className="flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">StandardsIQ</p>
              <p className="text-xs text-muted-foreground">
                AI-assisted Indian Standards recommendation engine · Prototype
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Footer">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Smart India Hackathon prototype. All IS codes shown are fictional placeholders and do
          not represent real Bureau of Indian Standards publications.
        </p>
      </div>
    </footer>
  )
}
