import { GoogleGenAI } from '@google/genai'

export type RetrievedEvidence = {
  source: string
  content: string
  url: string
}

export async function retrieveEvidence(
  code: string,
): Promise<RetrievedEvidence[]> {
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured.')
  }

  const ai = new GoogleGenAI({
    apiKey,
  })

  const response = await ai.models.generateContent({
    model: 'gemini-3.6-flash',
    contents: `
Find reliable public web information about the exact Indian Standard:

${code}

Prioritize official BIS and Indian government sources.

Extract ONLY information that can be supported by the retrieved web information.

Find:
- title
- scope
- application
- material
- dimensions
- performance requirements
- testing requirements
- marking requirements

Do not invent technical values.

For anything that cannot be verified, write:
"Not verified from the available web sources."

Return a concise factual summary.
`,
    config: {
      tools: [
        {
          googleSearch: {},
        },
      ],
    },
  })

  const text = response.text || ''

  const chunks =
    response.candidates?.[0]?.groundingMetadata
      ?.groundingChunks || []

  const evidence: RetrievedEvidence[] = []

  for (const chunk of chunks) {
    const web = chunk.web

    if (!web?.uri) {
      continue
    }

    evidence.push({
      source: web.title || 'Web source',
      content: text,
      url: web.uri,
    })
  }

  return Array.from(
    new Map(
      evidence.map((item) => [item.url, item]),
    ).values(),
  )
}