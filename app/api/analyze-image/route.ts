import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured.' },
        { status: 500 },
      )
    }

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

    const model = genAI.getGenerativeModel({
      model: 'gemini-3.5-flash-lite',
    })

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

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
      prompt,
    ])

    const response = result.response
    const extractedRequirement = response.text().trim()

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
              : 'Unknown Gemini error',
        },
        { status: 500 },
      )
    }
}