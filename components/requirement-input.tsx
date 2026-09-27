'use client'

import { FormEvent, useState } from 'react'

type RequirementInputProps = {
  onSubmit?: (requirement: string) => void
  onAnalyze?: (requirement: string) => void
  initialValue?: string
  defaultValue?: string
  disabled?: boolean
  placeholder?: string
  className?: string
}

const EXAMPLE_REQUIREMENT =
  'Need 12 mm Fe 500D reinforcement bars for RCC construction with high strength and corrosion resistance.'

export function RequirementInput({
  onSubmit,
  onAnalyze,
  initialValue,
  defaultValue,
  disabled = false,
  placeholder = 'Describe your procurement requirement in natural language...',
  className = '',
}: RequirementInputProps) {
  const [requirement, setRequirement] = useState(
    initialValue ?? defaultValue ?? '',
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const value = requirement.trim()

    if (!value || disabled) {
      return
    }

    onSubmit?.(value)
    onAnalyze?.(value)
  }

  const handleExample = () => {
    setRequirement(EXAMPLE_REQUIREMENT)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-4 ${className}`}
    >
      <div className="space-y-2">
        <label
          htmlFor="procurement-requirement"
          className="text-sm font-medium"
        >
          Procurement requirement
        </label>

        <textarea
          id="procurement-requirement"
          value={requirement}
          onChange={(event) => setRequirement(event.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          rows={7}
          className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleExample}
          disabled={disabled}
          className="text-left text-sm font-medium text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          Use example requirement
        </button>

        <button
          type="submit"
          disabled={disabled || !requirement.trim()}
          className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Analyze Requirement
        </button>
      </div>

      <p className="text-xs leading-5 text-gray-500">
        Describe the product, material, grade, dimensions, application,
        performance requirements, testing requirements, and other technical
        properties when available.
      </p>
    </form>
  )
}