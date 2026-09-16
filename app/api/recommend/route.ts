import { NextResponse } from 'next/server'
import axios from 'axios'
import {
  normalize,
  rankStandards,
} from '@/lib/recommend-engine'
import { retrieveEvidence } from '@/lib/rag'
import type { RecommendResponse } from '@/lib/types'

export async function POST(request: Request) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body.' },
      { status: 400 },
    )
  }

  const requirement =
    typeof body === 'object' &&
    body !== null &&
    'requirement' in body
      ? String(
          (body as { requirement: unknown }).requirement ?? '',
        )
      : ''

  if (!requirement.trim()) {
    return NextResponse.json(
      {
        error: 'A non-empty `requirement` is required.',
      },
      { status: 400 },
    )
  }

  // Get semantic scores from the Python API
  let semanticScores:
    | Map<string, number>
    | undefined

  try {
    const semanticResponse = await axios.post(
      'http://127.0.0.1:5000/semantic-search',
      {
        query: requirement.trim(),
      },
    )

    semanticScores = new Map<string, number>()

    for (
      const result of semanticResponse.data.results as Array<{
        code: string
        score: number
      }>
    ) {
      const key = normalize(result.code)
      const existingScore = semanticScores.get(key)

      if (
        existingScore === undefined ||
        result.score > existingScore
      ) {
        semanticScores.set(
          key,
          result.score,
        )
      }
    }

    console.log(
      'Semantic scores loaded:',
      semanticScores.size,
    )
  } catch (error) {
    console.error(
      'Semantic search API connection failed:',
      error,
    )
  }

  // Get recommendations from the dataset
  const recommendations = rankStandards(
    requirement,
    semanticScores,
  )

  // Retrieve web evidence one recommendation at a time
  const recommendationsWithWebEvidence = []

  for (const recommendation of recommendations) {
    try {
      const webEvidence = await retrieveEvidence(
        recommendation.code,
      )

      if (webEvidence.length === 0) {
        recommendationsWithWebEvidence.push(
          recommendation,
        )
        continue
      }

      const webSections = webEvidence.map((item) => ({
        title: item.source,
        content: item.content,
        evidence: item.url,
      }))

      recommendationsWithWebEvidence.push({
        ...recommendation,

        relevantSections: [
          ...recommendation.relevantSections,
          ...webSections,
        ],

        evidence: {
          ...recommendation.evidence,

          supportingSections: [
            ...recommendation.evidence.supportingSections,
            ...webEvidence.map(
              (item) => item.url,
            ),
          ],

          extractedRequirements: [
            ...recommendation.evidence.extractedRequirements,
            ...webEvidence.map(
              (item) => item.content,
            ),
          ],
        },
      })
    } catch (error) {
      console.error(
        `Web retrieval failed for ${recommendation.code}:`,
        error,
      )

      recommendationsWithWebEvidence.push(
        recommendation,
      )
    }
  }

  const response: RecommendResponse = {
    query: requirement.trim(),
    recommendations:
      recommendationsWithWebEvidence,
  }

  return NextResponse.json(response)
}