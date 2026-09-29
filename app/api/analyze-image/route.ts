import { NextResponse } from 'next/server'
import { getGroqClient } from '@/lib/groq'

function sanitizeRequirement(text: string): string {
  const cleaned = text
    .replace(/[*_#`]/g, '')
    .replace(/^\s*[-•]\s*/gm, '')
    .replace(/\n{2,}/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim()

  // Try to pull out just the "Procurement Requirement" sentence if present
  const match = cleaned.match(
    /procurement requirement:?\s*(.*?)(?:\s*(note|missing info|missing information):|$)/i,
  )

  if (match && match[1] && match[1].trim().length > 10) {
    return match[1].trim()
  }

  return cleaned
}
export async function POST(request: Request) {
  try {
    const groq = getGroqClient()

    const formData = await request.formData()
    const image = formData.get('image')

    if (!(image instanceof File)) {
      return NextResponse.json(
        { error: 'Please provide an image.' },
        { status: 400 },
      )
    }

    if (!image.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'The uploaded file must be an image.' },
        { status: 400 },
      )
    }

    const buffer = Buffer.from(await image.arrayBuffer())
    const base64Image = buffer.toString('base64')
    const dataUrl = `data:${image.type};base64,${base64Image}`

    const prompt = `
You are assisting an Indian Standards recommendation system.

Analyze the uploaded procurement/product/specification image.

Extract only information visibly supported by the image: product name, 
material, application, dimensions, technical specifications, standards/codes 
printed on the image, and relevant keywords. Do not invent missing information.

Respond with ONLY a single short paragraph (2-3 sentences maximum) written in 
plain search-query language, as if a procurement officer typed it into a 
search box. 

Do NOT use markdown formatting, headers, bullet points, bold text, or 
asterisks. Do NOT explain your reasoning or list "extracted information" 
and "missing information" sections. Just the plain requirement sentence(s), 
nothing else.

If the image does not contain enough useful information, respond with exactly: 
"The image did not contain enough visible detail to extract a procurement requirement."
`
    const completion = await groq.chat.completions.create({
        model: 'qwen/qwen3.8-27b',

      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: dataUrl } },
          ],
        },
      ],
    })

   const extractedRequirement = sanitizeRequirement(
  completion.choices[0]?.message?.content || '',
)

    return NextResponse.json({
      requirement: extractedRequirement,
    })
  } catch (error) {
    console.error('Image analysis error:', error)

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Unknown Groq error',
      },
      { status: 500 },
    )
  }
}