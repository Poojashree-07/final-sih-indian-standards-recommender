import { getGroqClient } from '@/lib/groq'

export async function rewriteExplanation(
  code: string,
  title: string,
  templatedReason: string,
  webSummary?: string,
): Promise<string> {
  const groq = getGroqClient()

  const completion = await groq.chat.completions.create({
    model: 'openai/gpt-oss-20b',
    messages: [
      {
        role: 'user',
        content: `
Rewrite the following keyword-match explanation into a natural, confident, 
one-paragraph explanation (2-3 sentences) a domain expert would give a 
procurement officer for why "${code} — ${title}" was recommended.

Facts to base the explanation on (do not add anything beyond these facts):
"${templatedReason}"
${webSummary ? `\nAdditional verified context: "${webSummary}"` : ''}

Keep the meaning identical — just make it read naturally instead of like a 
list of matched keywords. End with a brief note that this is a relevance 
assessment, not a compliance determination. Plain text, no markdown.
`,
      },
    ],
    reasoning_effort: 'low',
     max_completion_tokens: 400,
  })
  console.log('RAW Groq response for explanation:', JSON.stringify(completion.choices[0]?.message, null, 2))

  return completion.choices[0]?.message?.content?.trim() || ''
}