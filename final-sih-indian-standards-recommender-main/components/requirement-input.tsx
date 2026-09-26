'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  Eraser,
  Lightbulb,
  AlertCircle,
  ImagePlus,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { EXAMPLE_REQUIREMENTS } from '@/lib/content'
import { fetchRecommendations, RecommendationError } from '@/lib/api'
import { cacheResult } from '@/lib/query-store'
import { ProcessingState, PROCESSING_PHASES } from '@/components/processing-state'

const MAX_CHARS = 600
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10 MB

const PLACEHOLDER =
  'Example: We need structural steel sections for a building project, with high strength requirements and suitable dimensions for load-bearing applications.'

export function RequirementInput() {
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')
  const [phase, setPhase] = useState(-1)
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const submitting = phase >= 0
  const remaining = MAX_CHARS - value.length

  function applyExample(example: string) {
    setValue(example)
    setError(null)
    textareaRef.current?.focus()
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]

    if (!file) return

    setError(null)

    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError('Image size must be 10 MB or smaller.')
      return
    }

    setImage(file)

    const previewUrl = URL.createObjectURL(file)
    setImagePreview(previewUrl)
  }

  function removeImage() {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImage(null)
    setImagePreview(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

    async function handleSubmit() {
    let requirement = value.trim()

    if (!requirement && !image) {
      setError(
        'Please describe your procurement requirement or upload an image.',
      )
      textareaRef.current?.focus()
      return
    }

    setError(null)
    setPhase(0)

    const timers: ReturnType<typeof setTimeout>[] = []

    timers.push(setTimeout(() => setPhase(1), 550))
    timers.push(setTimeout(() => setPhase(2), 1100))

    try {
      // If an image was selected, send it to Gemini first.
      if (image) {
        const formData = new FormData()
        formData.append('image', image)

        const imageResponse = await fetch('/api/analyze-image', {
          method: 'POST',
          body: formData,
        })

        const imageData = await imageResponse.json()

        if (!imageResponse.ok) {
          throw new Error(
            imageData.error || 'Unable to analyze the uploaded image.',
          )
        }

        const extractedRequirement = imageData.requirement?.trim()

        if (!extractedRequirement) {
          throw new Error(
            'The image did not contain enough information to identify a procurement requirement.',
          )
        }

        // If the user also typed text, combine both.
        requirement = requirement
          ? `${requirement}. ${extractedRequirement}`
          : extractedRequirement
      }

      const [result] = await Promise.all([
        fetchRecommendations(requirement),
        new Promise((r) => setTimeout(r, 1500)),
      ])

      timers.forEach(clearTimeout)

      cacheResult(result)

      router.push(`/results?q=${encodeURIComponent(requirement)}`)
    } catch (err) {
      timers.forEach(clearTimeout)
      setPhase(-1)

      setError(
        err instanceof RecommendationError
          ? err.message
          : err instanceof Error
            ? err.message
            : 'Something went wrong while searching. Please try again.',
      )
    }
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (
      (e.metaKey || e.ctrlKey) &&
      e.key === 'Enter' &&
      !e.nativeEvent.isComposing &&
      e.keyCode !== 229
    ) {
      e.preventDefault()
      void handleSubmit()
    }
  }

  if (submitting) {
    const clamped = Math.min(phase, PROCESSING_PHASES.length - 1)

    return <ProcessingState activeIndex={clamped} />
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <label htmlFor="requirement" className="text-base font-semibold">
        Describe Your Procurement Requirement
      </label>

      <p className="mt-1 text-sm text-muted-foreground">
        Include the product, application, material, dimensions, and any
        performance needs for the best matches.
      </p>

      {/* Text requirement */}
      <div className="mt-4">
        <textarea
          id="requirement"
          ref={textareaRef}
          value={value}
          maxLength={MAX_CHARS}
          onChange={(e) => {
            setValue(e.target.value)

            if (error) {
              setError(null)
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER}
          rows={5}
          aria-describedby="char-counter requirement-hint"
          aria-invalid={Boolean(error)}
          className={cn(
            'w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed shadow-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/40',
            error &&
              'border-destructive focus-visible:border-destructive focus-visible:ring-destructive/25',
          )}
        />

        <div className="mt-2 flex items-center justify-between gap-2">
          <span
            id="char-counter"
            className="text-xs text-muted-foreground tabular-nums"
          >
            {value.length} / {MAX_CHARS} characters
          </span>

          {value.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setValue('')
                setError(null)
                textareaRef.current?.focus()
              }}
              data-icon="inline-start"
            >
              <Eraser />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Image upload */}
      <div className="mt-5">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border" />

          <span className="text-xs font-medium text-muted-foreground">
            OR
          </span>

          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="mt-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="requirement-image"
          />

          {!image ? (
            <label
              htmlFor="requirement-image"
              className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-6 py-7 text-center transition-colors hover:border-brand/50 hover:bg-brand-muted/20"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ImagePlus className="size-5" />
              </div>

              <p className="mt-3 text-sm font-semibold">
                Upload a product or specification image
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                JPG, PNG, WEBP · Maximum 10 MB
              </p>

              <Badge variant="outline" className="mt-3">
                AI image analysis coming next
              </Badge>
            </label>
          ) : (
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <div className="flex items-start gap-3">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Selected procurement requirement"
                    className="size-20 rounded-md border border-border object-cover"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {image.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {(image.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  <Badge variant="outline" className="mt-2">
                    Image selected
                  </Badge>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={removeImage}
                  aria-label="Remove image"
                >
                  <X />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <p
          className="mt-3 flex items-center gap-2 text-sm text-destructive"
          role="alert"
        >
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </p>
      )}

      {/* Examples */}
      <div className="mt-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          <Lightbulb className="size-3.5" />
          Try an example
        </p>

        <ul className="mt-2 flex flex-wrap gap-2">
          {EXAMPLE_REQUIREMENTS.map((example) => (
            <li key={example}>
              <button
                type="button"
                onClick={() => applyExample(example)}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-brand/50 hover:bg-brand-muted/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40"
              >
                {example}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Button
          onClick={handleSubmit}
          className="h-11 px-6 text-base"
          data-icon="inline-end"
        >
          Find Applicable Standards
          <ArrowRight />
        </Button>

        <span className="text-xs text-muted-foreground">
          Press{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Ctrl
          </kbd>{' '}
          +{' '}
          <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
            Enter
          </kbd>{' '}
          to search
        </span>
      </div>
    </div>
  )
}