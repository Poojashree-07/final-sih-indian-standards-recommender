import { NextResponse } from 'next/server'
import { getGroqClient } from '@/lib/groq'

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

Extract only information that is visibly supported by the image, such as:
- product name
- material
- application
- dimensions
- technical specifications
- standards/codes printed on the image
- relevant keywords

Do not invent missing information.

Return a concise natural-language procurement requirement that can be used to search an Indian Standards dataset.

If the image does not contain enough useful information, clearly say so.
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

    const extractedRequirement =
      completion.choices[0]?.message?.content?.trim() || ''

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