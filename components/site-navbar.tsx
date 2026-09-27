```tsx id="l9wq2a"
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  Menu,
  X,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/recommend', label: 'Recommend' },
  { href: '/standards', label: 'Standards' },
  { href: '/how-it-works', label: 'How It Works' },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label="StandardsIQ home"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <ShieldCheck className="size-5" />
          </span>

          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-tight">
              StandardsIQ
            </span>

            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Standards Intelligence
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="ml-4 hidden items-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? 'page' : undefined}
              className={cn(
                'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                isActive(link.href)
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />

          <Link
            href="/recommend"
            className={cn(
              buttonVariants(),
              'hidden h-9 rounded-lg px-4 shadow-sm sm:inline-flex',
            )}
          >
            Find Applicable Standards
            <ArrowRight className="size-4" />
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-border/80 bg-background/95 shadow-sm md:hidden">
          <nav
            className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-3 text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/recommend"
              className={cn(
                buttonVariants(),
                'mt-3 h-10 rounded-lg shadow-sm',
              )}
            >
              Find Applicable Standards
              <ArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
```

After saving, push this component:

```bash id="4a2cxq"
git add components/site-navbar.tsx
```

```bash id="j1m5pw"
git commit -m "Polish navigation bar frontend"
```

```bash id="z8v3nd"
git push origin frontend
```

Run each command **separately**.
