import { NextResponse } from 'next/server'
import { extractText } from 'unpdf'

export const runtime = 'nodejs'

const MAX_PDF_SIZE = 10 * 1024 * 1024 // 10 MB

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('pdf')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: 'Please upload a PDF file.' },
        { status: 400 },
      )
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are supported.' },
        { status: 400 },
      )
    }

    if (file.size > MAX_PDF_SIZE) {
      return NextResponse.json(
        { error: 'PDF size must be 10 MB or smaller.' },
        { status: 400 },
      )
    }

    const buffer = await file.arrayBuffer()
    const { text } = await extractText(new Uint8Array(buffer), {
      mergePages: true,
    })

    const requirement = text.trim()

    if (!requirement) {
      return NextResponse.json(
        {
          error:
            'No readable text was found in this PDF. Please upload a text-based PDF.',
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      requirement,
      filename: file.name,
    })
  } catch (error) {
    console.error('PDF extraction error:', error)

    return NextResponse.json(
      {
        error: 'Unable to extract text from the uploaded PDF.',
      },
      { status: 500 },
    )
  }
}