import type { LucideIcon } from 'lucide-react'
import {
  MessageSquareText,
  ScanSearch,
  Layers,
  ListOrdered,
  FileCheck2,
  Quote,
  Braces,
  Database,
  Binary,
  Sparkles,
  ClipboardCheck,
  Search,
} from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: MessageSquareText,
    title: 'Natural Language Input',
    description:
      'Describe what you need in plain language — no need to know IS codes, clauses, or catalog numbers in advance.',
  },
  {
    icon: ScanSearch,
    title: 'Requirement Understanding',
    description:
      'The system extracts the product, application, material, dimensions, and performance signals from your text.',
  },
  {
    icon: Search,
    title: 'Semantic Search',
    description:
      'Requirement concepts are matched against standard sections by meaning, not just keyword overlap.',
  },
  {
    icon: ListOrdered,
    title: 'Intelligent Ranking',
    description:
      'Candidate standards are ordered by a relevance score so the most likely matches surface first.',
  },
  {
    icon: FileCheck2,
    title: 'Relevant Requirement Extraction',
    description:
      'For each candidate, the relevant technical requirements and sections are pulled out and grouped.',
  },
  {
    icon: Quote,
    title: 'Evidence-Based Explanation',
    description:
      'Every recommendation is explained from retrieved evidence — the system cites sections rather than inventing facts.',
  },
]

export interface ProcessStep {
  id: string
  title: string
  description: string
}

/** Six-step user-facing process shown on Home + How It Works. */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '01',
    title: 'Describe Requirement',
    description: 'The user enters a procurement requirement in natural language.',
  },
  {
    id: '02',
    title: 'Understand',
    description:
      'The system identifies product, application, material, dimensions, performance and other signals.',
  },
  {
    id: '03',
    title: 'Retrieve',
    description: 'Semantic search finds the standard sections most relevant to those signals.',
  },
  {
    id: '04',
    title: 'Rank',
    description: 'Candidate standards are ranked according to relevance to the requirement.',
  },
  {
    id: '05',
    title: 'Explain',
    description: 'The system explains why each standard appears relevant, citing evidence.',
  },
  {
    id: '06',
    title: 'Review',
    description: 'The user verifies the recommendation before using it in procurement.',
  },
]

export interface PipelineStage {
  icon: LucideIcon
  label: string
  detail: string
  group: 'Input' | 'NLP Layer' | 'Retrieval Layer' | 'Recommendation Layer' | 'RAG Layer' | 'Output'
}

/** Technical RAG pipeline shown on How It Works. */
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    icon: MessageSquareText,
    label: 'User Requirement',
    detail: 'Natural-language procurement requirement submitted by the user.',
    group: 'Input',
  },
  {
    icon: ScanSearch,
    label: 'Requirement Understanding',
    detail: 'Extract product, application, material, dimensions, performance, environment, testing needs.',
    group: 'NLP Layer',
  },
  {
    icon: Binary,
    label: 'Query Embedding',
    detail: 'The structured requirement is encoded into a dense vector representation.',
    group: 'Retrieval Layer',
  },
  {
    icon: Search,
    label: 'Semantic Search',
    detail: 'The query vector is compared against indexed standard-section vectors.',
    group: 'Retrieval Layer',
  },
  {
    icon: Database,
    label: 'Vector Database',
    detail: 'Standard sections are stored as embeddings for fast top-K similarity retrieval.',
    group: 'Retrieval Layer',
  },
  {
    icon: Layers,
    label: 'Candidate Standards',
    detail: 'Top-K relevant chunks are grouped back into candidate standards.',
    group: 'Recommendation Layer',
  },
  {
    icon: ListOrdered,
    label: 'Ranking',
    detail: 'Candidates are scored and ordered by relevance to the requirement.',
    group: 'Recommendation Layer',
  },
  {
    icon: FileCheck2,
    label: 'Relevant Section Retrieval',
    detail: 'The specific supporting sections for each candidate are collected as evidence.',
    group: 'RAG Layer',
  },
  {
    icon: Sparkles,
    label: 'LLM Explanation / Extraction',
    detail: 'A language model explains relevance and extracts requirements strictly from retrieved evidence.',
    group: 'RAG Layer',
  },
  {
    icon: ClipboardCheck,
    label: 'Recommendation',
    detail: 'Recommended IS codes, relevance, rationale, requirements and evidence are returned.',
    group: 'Output',
  },
]

export interface NlpSignal {
  label: string
}

export const NLP_SIGNALS: NlpSignal[] = [
  { label: 'Product' },
  { label: 'Application' },
  { label: 'Material' },
  { label: 'Dimensions' },
  { label: 'Performance' },
  { label: 'Environment' },
  { label: 'Testing needs' },
]

export const EXAMPLE_REQUIREMENTS: string[] = [
  'Structural steel for building construction',
  'PVC pipes for water supply',
  'Electrical cables for industrial use',
  'Cement for construction',
  'Laboratory equipment',
]

export { Braces }
