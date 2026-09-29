import { getGroqClient } from '@/lib/groq'

export type RetrievedEvidence = {
  source: string
  content: string
  url: string
}

export type TechnicalDetails = {
  material?: string
  dimensions?: string
  performance?: string
  testing?: string
  marking?: string
}

export type RagResult = {
  evidence: RetrievedEvidence[]
  technicalDetails: TechnicalDetails
}

type TavilyResult = {
  title: string
  url: string
  content: string
}

async function searchTavily(query: string): Promise<TavilyResult[]> {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query,
      max_results: 3,
      search_depth: 'basic',
    }),
  })

  if (!response.ok) {
    throw new Error(`Tavily search failed: ${response.status}`)
  }

  const data = await response.json()
  return data.results || []
}

export async function retrieveEvidence(code: string): Promise<RagResult> {
  const results = await searchTavily(`${code} Indian Standard BIS specification`)

  if (results.length === 0) {
    return { evidence: [], technicalDetails: {} }
  }

  const groq = getGroqClient()

  const sourcesText = results
    .map((r, i) => `Source ${i + 1} (${r.title}): ${r.content}`)
    .join('\n\n')

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-120b',
    messages: [
      {
        role: 'user',
        content: `
You are given real web search results about an Indian Standard (${code}).

${sourcesText}

Using ONLY the information in these sources, respond with a valid JSON object 
in exactly this shape, no markdown, no extra text:

{
  "summary": "2-3 sentence factual summary of scope/application/material, or empty string if nothing useful found",
  "material": "material mentioned in sources, or null if not mentioned",
  "dimensions": "dimensions/sizes mentioned in sources, or null if not mentioned",
  "performance": "performance/strength requirements mentioned in sources, or null if not mentioned",
  "testing": "testing methods mentioned in sources, or null if not mentioned",
  "marking": "marking requirements mentioned in sources, or null if not mentioned"
}

Do not invent any value not explicitly present in the sources. Use null 
for anything not clearly stated.
`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  const raw = completion.choices[0]?.message?.content?.trim() || '{}'

  let parsed: {
    summary?: string
    material?: string | null
    dimensions?: string | null
    performance?: string | null
    testing?: string | null
    marking?: string | null
  } = {}

  try {
    parsed = JSON.parse(raw)
  } catch {
    parsed = {}
  }

  const summary = parsed.summary?.trim() || ''

  const evidence: RetrievedEvidence[] = summary
    ? [
        {
          source: results[0]?.title || 'Web source',
          content: summary,
          url: results[0]?.url || '',
        },
      ]
    : []

  const technicalDetails: TechnicalDetails = {}
  if (parsed.material) technicalDetails.material = parsed.material
  if (parsed.dimensions) technicalDetails.dimensions = parsed.dimensions
  if (parsed.performance) technicalDetails.performance = parsed.performance
  if (parsed.testing) technicalDetails.testing = parsed.testing
  if (parsed.marking) technicalDetails.marking = parsed.marking

  return { evidence, technicalDetails }
}