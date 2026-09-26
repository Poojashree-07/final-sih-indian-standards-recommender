import { Badge } from '@/components/ui/badge'
import type { StandardStatus } from '@/lib/types'

const STATUS_MAP: Record<
  StandardStatus,
  { label: string; variant: 'success' | 'warning' | 'muted' | 'outline' }
> = {
  active: { label: 'Active', variant: 'success' },
  draft: { label: 'Draft', variant: 'muted' },
  'under-review': { label: 'Under Review', variant: 'warning' },
  superseded: { label: 'Superseded', variant: 'outline' },
}

export function StatusBadge({ status }: { status: StandardStatus }) {
  const { label, variant } = STATUS_MAP[status]
  return <Badge variant={variant}>{label}</Badge>
}
