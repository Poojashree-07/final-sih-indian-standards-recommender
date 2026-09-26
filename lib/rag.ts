import { getGroqClient } from '@/lib/groq'

export type RetrievedEvidence = {
  source: string
  content: string
  url: string
}

const MAX_EVIDENCE = 3

export async function retrieveEvidence(
  code: string,
): Promise<RetrievedEvidence[]> {
  const groq = getGroqClient()

  const completion = await groq.chat.completions.create({
    model: 'groq/compound',
    messages: [
      {
        role: 'user',
        content: `
Find reliable public web information about this exact Indian Standard:

${code}

Prioritize official BIS and Indian government sources.

Extract ONLY information supported by the retrieved web sources.

Check only these fields:
- title
- scope
- application
- material
- dimensions
- performance requirements
- testing requirements
- marking requirements

Do not invent technical values.

For information that cannot be verified, say:
"Not verified from the available web sources."

Return a concise factual summary.
`,
      },
    ],
  })

  const text = completion.choices[0]?.message?.content?.trim() || ''
  const executedTools = completion.choices[0]?.message?.executed_tools || []

  const evidence: RetrievedEvidence[] = []

  for (const tool of executedTools) {
    const results = tool.search_results?.results || []
    for (const result of results) {
      if (!result.url) continue
      evidence.push({
        source: result.title || 'Web source',
        content: text,
        url: result.url,
      })
      if (evidence.length >= MAX_EVIDENCE) break
    }
    if (evidence.length >= MAX_EVIDENCE) break
  }

  return Array.from(
    new Map(evidence.map((item) => [item.url, item])).values(),
  )
}