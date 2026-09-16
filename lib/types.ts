/**
 * Shared domain types for the Indian Standards recommendation engine.
 */

export type StandardStatus =
  | 'active'
  | 'draft'
  | 'under-review'
  | 'superseded'

export type StandardType =
  | 'Product'
  | 'Method / Test'
  | 'Terminology'
  | 'Code of Practice'
  | 'Specification'

/**
 * Structured understanding of the user's procurement requirement.
 *
 * Values must only contain information explicitly supported by the
 * user's input. The system must not invent missing values.
 */
export interface RequirementAnalysis {
  product: string
  material: string
  application: string
  grade: string
  dimensions: string
  performance: string
  testing: string
  marking: string
  specialRequirements: string
  otherTechnicalProperties: string
  keywords: string[]
}

export interface RequirementGapAnalysis {
  verified: string[]
  unavailable: string[]
}

export interface StandardSection {
  title: string
  content: string
  evidence: string
}

export interface TechnicalRequirements {
  material: string
  dimensions: string
  performance: string
  testing: string
  marking: string
  mechanicalProperties?: string
}

export interface EvidenceTrace {
  requirementSignal: string
  matchedConcepts: string[]
  standardScope: string
  supportingSections: string[]
  extractedRequirements: string[]
}

export interface Standard {
  id: string
  code: string
  title: string
  category: string
  type: StandardType
  status: StandardStatus
  version: string
  date: string
  scope: string
  applicableAreas: string[]
  material: string
  application: string
  relevanceScore: number
  whyRecommended: string
  sections: StandardSection[]
  technicalRequirements: TechnicalRequirements
  testingRequirements: string[]
  markingRequirements: string[]
  relatedStandardIds: string[]
  evidenceTrace: EvidenceTrace
}

export interface Recommendation {
  standardId: string
  code: string
  title: string
  relevanceScore: number
  whyRecommended: string
  relevantSections: StandardSection[]
  technicalRequirements: TechnicalRequirements
  evidence: EvidenceTrace

  /**
   * Structured understanding of the user's requirement.
   */
  requirementAnalysis: RequirementAnalysis

  /**
   * Explicit comparison between requested information and
   * information actually available in the dataset.
   */
  requirementGap: RequirementGapAnalysis
}

export interface RecommendResponse {
  query: string
  recommendations: Recommendation[]
}

export interface RecommendRequest {
  requirement: string
}