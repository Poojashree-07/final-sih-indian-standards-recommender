import type { RecommendResponse } from '@/lib/types'

/**
 * Client-side API abstraction.
 * -------------------------------------------------------------------------
 * The UI never talks to a data source directly — it calls these functions.
 * Today they hit the local Next.js mock route (`/api/recommend`). When the
 * Python FastAPI backend is ready, point `NEXT_PUBLIC_API_URL` at it; the
 * request/response contract is unchanged.
 */

/** Base URL for the future FastAPI backend. Empty string => same-origin Next route. */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

function endpoint(path: string): string {
  if (!API_BASE_URL) return path
  return `${API_BASE_URL.replace(/\/$/, '')}${path}`
}

export class RecommendationError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
  ) {
    super(message)
    this.name = 'RecommendationError'
  }
}

export async function fetchRecommendations(
  requirement: string,
  signal?: AbortSignal,
): Promise<RecommendResponse> {
  const trimmed = requirement.trim()
  if (!trimmed) {
    throw new RecommendationError('Please describe your procurement requirement.', 400)
  }

  let res: Response
  try {
    res = await fetch(endpoint('/api/recommend'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requirement: trimmed }),
      signal,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') throw err
    throw new RecommendationError(
      'Could not reach the recommendation service. Check your connection and try again.',
    )
  }

  if (!res.ok) {
    throw new RecommendationError(
      'The recommendation service returned an error. Please try again.',
      res.status,
    )
  }

  return (await res.json()) as RecommendResponse
}
