import type { RecommendResponse } from '@/lib/types'

/**
 * Tiny sessionStorage cache so the staged processing animation on /recommend
 * can hand a result set straight to /results without a second fetch/spinner.
 * /results still works on a cold load (deep link with ?q=) by fetching itself.
 */

const KEY = 'standardsiq:last-result'

export function cacheResult(result: RecommendResponse): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(KEY, JSON.stringify(result))
  } catch {
    // Ignore storage errors (private mode / quota).
  }
}

export function readCachedResult(query: string): RecommendResponse | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as RecommendResponse
    if (parsed.query.trim() === query.trim()) return parsed
    return null
  } catch {
    return null
  }
}
