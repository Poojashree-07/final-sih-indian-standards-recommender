import type {
  Recommendation,
  RequirementAnalysis,
  RequirementGapAnalysis,
  Standard,
} from '@/lib/types'

import standardsData from '@/standards.json'
import foodStandardsData from '@/food-standards.json'

type ExcelStandard = {
  id: string
  code: string
  part: string | null
  year: number | null
  title: string
  category: string
  status: string
  domain: string
}

type FoodStandard = {
  Code: string
  Title: string
  Scope: string
  Material: string
  Grade: string
  Dimensions: string
  Performance: string
  'Mechanical Properties': string
  Testing: string
  Sampling: string
  'Acceptance Criteria': string
  Marking: string
  Application: string
  'Evidence / Section': string
}

function toStandard(item: ExcelStandard): Standard {
  const status = item.status.toLowerCase()

  return {
    id: item.id,
    code: item.code,
    title: item.title,
    category: item.category,
    type: 'Specification',
    status:
      status === 'current'
        ? 'active'
        : status === 'draft'
          ? 'draft'
          : status === 'under-review'
            ? 'under-review'
            : 'superseded',
    version: item.part ? `Part ${item.part}` : 'Current',
    date: item.year ? String(item.year) : 'Not specified',
    scope: item.title,
    applicableAreas: [item.domain],
    material: item.category,
    application: item.domain,
    relevanceScore: 0,
    whyRecommended: '',
    sections: [],
    technicalRequirements: {
      material: 'Not available in the current dataset.',
      dimensions: 'Not available in the current dataset.',
      performance: 'Not available in the current dataset.',
      testing: 'Not available in the current dataset.',
      marking: 'Not available in the current dataset.',
    },
    testingRequirements: [],
    markingRequirements: [],
    relatedStandardIds: [],
    evidenceTrace: {
      requirementSignal: '',
      matchedConcepts: [],
      standardScope: item.title,
      supportingSections: [],
      extractedRequirements: [],
    },
  }
}

function toFoodStandard(item: FoodStandard): Standard {
  return {
    id: item.Code.toLowerCase().replace(/\s+/g, '-').replace(/:/g, ''),
    code: item.Code,
    title: item.Title,
    category: item.Application || 'Food',
    type: 'Specification',
    status: 'active',
    version: 'Current',
    date: 'Not specified',
    scope: item.Scope || item.Title,
    applicableAreas: [item.Application || 'Food'],
    material: item.Material || 'Not specified',
    application: item.Application || 'Food',
    relevanceScore: 0,
    whyRecommended: '',
    sections: [],
    technicalRequirements: {
      material:
        item.Material || 'Available in detailed food dataset.',
      dimensions:
        item.Dimensions || 'Not specified.',
      performance:
        [
          item.Performance,
          item['Mechanical Properties'],
        ]
          .filter(Boolean)
          .join(' ') || 'Not specified.',
      testing:
        item.Testing || 'Not specified.',
      marking:
        item.Marking || 'Not specified.',
    },
    testingRequirements: item.Testing
      ? [item.Testing]
      : [],
    markingRequirements: item.Marking
      ? [item.Marking]
      : [],
    relatedStandardIds: [],
    evidenceTrace: {
      requirementSignal: '',
      matchedConcepts: [],
      standardScope: item.Scope || item.Title,
      supportingSections:
        item['Evidence / Section']
          ? [item['Evidence / Section']]
          : [],
      extractedRequirements: [],
    },
  }
}

const GENERAL_STANDARDS: Standard[] = (
  standardsData as ExcelStandard[]
).map(toStandard)

const FOOD_STANDARDS: Standard[] = (
  foodStandardsData as FoodStandard[]
).map(toFoodStandard)

const STANDARDS: Standard[] = [
  ...GENERAL_STANDARDS,
  ...FOOD_STANDARDS,
]

const STOP_WORDS = new Set([
  'the',
  'a',
  'an',
  'for',
  'and',
  'or',
  'of',
  'to',
  'in',
  'on',
  'with',
  'we',
  'need',
  'needs',
  'require',
  'required',
  'requirement',
  'requirements',
  'our',
  'is',
  'are',
  'be',
  'that',
  'this',
  'these',
  'those',
  'suitable',
  'used',
  'use',
  'using',
  'high',
  'low',
  'minimum',
  'maximum',
  'project',
  'application',
  'applications',
  'please',
  'provide',
  'providing',
  'must',
  'should',
])

const MATERIAL_TERMS = [
  'steel',
  'stainless steel',
  'carbon steel',
  'alloy steel',
  'concrete',
  'cement',
  'aluminium',
  'aluminum',
  'copper',
  'brass',
  'iron',
  'cast iron',
  'plastic',
  'pvc',
  'upvc',
  'polyethylene',
  'polypropylene',
  'rubber',
  'glass',
  'wood',
  'timber',
  'ceramic',
  'brick',
  'mortar',
]

const APPLICATION_TERMS = [
  'construction',
  'building',
  'reinforced concrete',
  'water supply',
  'potable water',
  'drainage',
  'irrigation',
  'road',
  'bridge',
  'railway',
  'electrical',
  'plumbing',
  'structural',
  'industrial',
  'agricultural',
  'sewage',
  'pipeline',
]

const TESTING_TERMS = [
  'test',
  'testing',
  'tested',
  'test method',
  'inspection',
  'sampling',
  'sample',
]

const MARKING_TERMS = [
  'marking',
  'marked',
  'label',
  'labelling',
  'labeling',
]

const PERFORMANCE_TERMS = [
  'performance',
  'strength',
  'elongation',
  'durability',
  'resistant',
  'resistance',
  'load',
  'pressure',
  'temperature',
  'impact',
  'hardness',
  'tensile',
  'yield',
  'flexural',
  'compressive',
]

const DIMENSION_TERMS = [
  'dimension',
  'dimensions',
  'diameter',
  'length',
  'width',
  'thickness',
  'height',
  'size',
  'nominal',
  'mm',
  'cm',
  'metre',
  'meter',
]

export function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9\s.-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokenize(value: string): string[] {
  return Array.from(
    new Set(
      normalize(value)
        .replace(/-/g, ' ')
        .split(/\s+/)
        .filter(
          (token) =>
            token.length > 2 &&
            !STOP_WORDS.has(token),
        ),
    ),
  )
}

function containsAny(
  text: string,
  terms: string[],
): string[] {
  const normalizedText = normalize(text)

  return terms.filter((term) =>
    normalizedText.includes(normalize(term)),
  )
}

function firstMatchingPhrase(
  requirement: string,
  terms: string[],
): string {
  const normalizedRequirement = normalize(requirement)

  const match = terms.find((term) =>
    normalizedRequirement.includes(normalize(term)),
  )

  return match ?? ''
}

/**
 * Extract structured information only from words actually
 * present in the user's requirement.
 *
 * Numerical performance values are preserved exactly from
 * the user's input and are NOT invented by the system.
 */
function extractRequirement(
  requirement: string,
): RequirementAnalysis {
  const normalizedRequirement = normalize(requirement)

  const productTerms = [
    'reinforcement bars',
    'reinforcing bars',
    'deformed steel bars',
    'steel reinforcement bars',
    'reinforcement steel',
    'steel bars',
    'concrete reinforcement',
    'reinforcing steel',
    'pipes',
    'pipe',
    'cement',
    'concrete',
    'bricks',
    'brick',
    'bolts',
    'nuts',
    'wires',
    'wire',
    'cables',
    'cable',
    'valves',
    'valve',
    'doors',
    'windows',
    'tiles',
    'transformer',
    'switchgear',
  ]

  const product = firstMatchingPhrase(
    normalizedRequirement,
    productTerms,
  )

  const material = firstMatchingPhrase(
    normalizedRequirement,
    MATERIAL_TERMS,
  )

  const application = firstMatchingPhrase(
    normalizedRequirement,
    APPLICATION_TERMS,
  )

  const gradeMatch = requirement.match(
    /\b(?:fe\s*[-]?\s*\d+[a-z]?|m\s*[-]?\s*\d+|grade\s+[a-z0-9-]+)\b/gi,
  )

  const grade = gradeMatch
    ? Array.from(
        new Set(
          gradeMatch.map((value) =>
            value.trim(),
          ),
        ),
      ).join(', ')
    : ''

  const dimensionMatches = requirement.match(
    /\b\d+(?:\.\d+)?\s*(?:mm|cm|m|metre|meter|inch|inches)\b/gi,
  )

  const dimensions = dimensionMatches
    ? Array.from(
        new Set(
          dimensionMatches.map((value) =>
            value.trim(),
          ),
        ),
      ).join(', ')
    : containsAny(
          normalizedRequirement,
          DIMENSION_TERMS,
        ).length > 0
      ? containsAny(
          normalizedRequirement,
          DIMENSION_TERMS,
        ).join(', ')
      : ''

  /**
   * Extract complete numerical performance expressions.
   *
   * Examples:
   * "tensile strength of at least 500 MPa"
   * "yield strength of at least 300 MPa"
   * "elongation minimum 20%"
   * "pressure >= 10 MPa"
   */
  const numericalPerformanceMatches =
    requirement.match(
      /\b(?:tensile\s+strength|yield\s+strength|compressive\s+strength|flexural\s+strength|impact\s+strength|strength|elongation|durability|pressure|temperature|hardness|load)\s*(?:of\s*)?(?:at\s+least|at\s+most|minimum|maximum|min(?:imum)?|max(?:imum)?|>=|<=|>|<|greater\s+than\s+or\s+equal\s+to|less\s+than\s+or\s+equal\s+to)?\s*\d+(?:\.\d+)?\s*(?:mpa|gpa|kpa|pa|%|°c|c|kn|n|kg|kgf|mhz|hz)\b/gi,
    ) ?? []

  const genericPerformanceTerms = containsAny(
    normalizedRequirement,
    PERFORMANCE_TERMS,
  )

  const performance =
    numericalPerformanceMatches.length > 0
      ? Array.from(
          new Set(
            numericalPerformanceMatches.map(
              (value) => value.trim(),
            ),
          ),
        ).join(', ')
      : Array.from(
          new Set(genericPerformanceTerms),
        ).join(', ')

  const testing = containsAny(
    normalizedRequirement,
    TESTING_TERMS,
  ).join(', ')

  const marking = containsAny(
    normalizedRequirement,
    MARKING_TERMS,
  ).join(', ')

  const specialTerms = containsAny(
    normalizedRequirement,
    [
      'seismic',
      'fire resistant',
      'corrosion resistant',
      'weather resistant',
      'eco friendly',
      'environmental',
      'potable',
      'food grade',
    ],
  )

  const specialRequirements = Array.from(
    new Set(specialTerms),
  ).join(', ')

  const knownFieldTerms = [
    product,
    material,
    application,
    grade,
    dimensions,
    performance,
    testing,
    marking,
    specialRequirements,
    ...numericalPerformanceMatches,
    'at least',
    'at most',
    'minimum',
    'maximum',
    'greater than or equal to',
    'less than or equal to',
  ]
    .filter(Boolean)
    .join(' ')

  const knownTokens = new Set(
    tokenize(knownFieldTerms),
  )

  const otherTechnicalProperties = tokenize(
    requirement,
  )
    .filter(
      (token) => !knownTokens.has(token),
    )
    .join(', ')

  return {
    product,
    material,
    application,
    grade,
    dimensions,
    performance,
    testing,
    marking,
    specialRequirements,
    otherTechnicalProperties,
    keywords: tokenize(requirement),
  }
}

function exactCodeMatch(
  requirement: string,
  standard: Standard,
): boolean {
  const requirementNormalized =
    normalize(requirement)

  const codeNormalized =
    normalize(standard.code)

  if (!codeNormalized) {
    return false
  }

  return (
    requirementNormalized.includes(
      codeNormalized,
    ) ||
    requirementNormalized.includes(
      codeNormalized.replace(/\s+/g, ''),
    )
  )
}

function scoreStandard(
  requirement: string,
  analysis: RequirementAnalysis,
  standard: Standard,
  semanticScore?: number,
): {
  score: number
  matchedConcepts: string[]
  matchedSignals: string[]
} {
  const title = normalize(standard.title)
  const category = normalize(standard.category)
  const domain = normalize(standard.application)
  const code = normalize(standard.code)

  const detailedMetadata = normalize(
    [
      standard.title,
      standard.scope,
      standard.material,
      standard.application,
      standard.testingRequirements.join(' '),
      standard.markingRequirements.join(' '),
      JSON.stringify(
        standard.technicalRequirements,
      ),
    ].join(' '),
  )

  const requirementTokens = analysis.keywords

  let points = 0
  let possiblePoints = 0

  const matchedConcepts: string[] = []
  const matchedSignals: string[] = []

  const normalizedRequirement =
    normalize(requirement)

  const exactPhraseMatches = [
    'packaged drinking water',
    'packaged water',
    'drinking water',
    'natural mineral water',
    'food hygiene',
    'food safety',
  ].filter(
    (phrase) =>
      normalizedRequirement.includes(phrase) &&
      detailedMetadata.includes(phrase),
  )

  if (exactPhraseMatches.length > 0) {
    points += exactPhraseMatches.length * 20
    possiblePoints += exactPhraseMatches.length * 20

    for (const phrase of exactPhraseMatches) {
      matchedConcepts.push(phrase)

      if (
        !matchedSignals.includes(
          'Specific phrase match',
        )
      ) {
        matchedSignals.push(
          'Specific phrase match',
        )
      }
    }
  }

  if (
    exactCodeMatch(
      requirement,
      standard,
    )
  ) {
    points += 40
    possiblePoints += 40

    matchedConcepts.push(standard.code)
    matchedSignals.push('Exact IS code match')
  }

  let titleMatches = 0

  for (const token of requirementTokens) {
    if (title.includes(token)) {
      titleMatches += 1
      matchedConcepts.push(token)
    }
  }

  const titlePossible = Math.max(
    requirementTokens.length * 3,
    1,
  )

  points += Math.min(
    titleMatches * 3,
    titlePossible,
  )

  possiblePoints += titlePossible

  if (titleMatches > 0) {
    matchedSignals.push(
      `Title match (${titleMatches} keyword${
        titleMatches === 1 ? '' : 's'
      })`,
    )
  }

  const queryWords = normalizedRequirement
    .split(/\s+/)
    .filter((word) => word.length >= 3)

  const phraseMatches = new Set<string>()

  for (
    let i = 0;
    i < queryWords.length - 1;
    i++
  ) {
    const phrase =
      `${queryWords[i]} ${queryWords[i + 1]}`

    if (
      title.includes(phrase) ||
      detailedMetadata.includes(phrase)
    ) {
      phraseMatches.add(phrase)
    }
  }

  if (phraseMatches.size > 0) {
    const phrasePoints = Math.min(
      phraseMatches.size * 6,
      24,
    )

    points += phrasePoints
    possiblePoints += 24

    for (const phrase of phraseMatches) {
      if (!matchedConcepts.includes(phrase)) {
        matchedConcepts.push(phrase)
      }
    }

    matchedSignals.push(
      `Specific phrase match (${phraseMatches.size})`,
    )
  } else {
    possiblePoints += 24
  }

  if (
    analysis.product &&
    (
      title.includes(
        normalize(analysis.product),
      ) ||
      detailedMetadata.includes(
        normalize(analysis.product),
      ) ||
      category.includes(
        normalize(analysis.product),
      )
    )
  ) {
    points += 20
    possiblePoints += 20

    matchedConcepts.push(
      analysis.product,
    )

    matchedSignals.push('Product match')
  } else {
    possiblePoints += 20
  }

  if (
    analysis.material &&
    (
      title.includes(
        normalize(analysis.material),
      ) ||
      detailedMetadata.includes(
        normalize(analysis.material),
      ) ||
      category.includes(
        normalize(analysis.material),
      ) ||
      domain.includes(
        normalize(analysis.material),
      )
    )
  ) {
    points += 15
    possiblePoints += 15

    matchedConcepts.push(
      analysis.material,
    )

    matchedSignals.push('Material match')
  } else {
    possiblePoints += 15
  }

  if (
    analysis.application &&
    (
      title.includes(
        normalize(analysis.application),
      ) ||
      domain.includes(
        normalize(analysis.application),
      )
    )
  ) {
    points += 15
    possiblePoints += 15

    matchedConcepts.push(
      analysis.application,
    )

    matchedSignals.push(
      'Application/domain match',
    )
  } else {
    possiblePoints += 15
  }

  const technicalTerms = [
    ...containsAny(
      requirement,
      PERFORMANCE_TERMS,
    ),
    ...containsAny(
      requirement,
      DIMENSION_TERMS,
    ),
    ...containsAny(
      requirement,
      TESTING_TERMS,
    ),
    ...containsAny(
      requirement,
      MARKING_TERMS,
    ),
    ...containsAny(
      requirement,
      [
        'seismic',
        'resistant',
        'durability',
        'strength',
        'reinforcement',
      ],
    ),
  ]

  const uniqueTechnicalTerms =
    Array.from(
      new Set(technicalTerms),
    )

  for (const term of uniqueTechnicalTerms) {
    const normalizedTerm =
      normalize(term)

    if (
      title.includes(normalizedTerm) ||
      detailedMetadata.includes(
        normalizedTerm,
      ) ||
      category.includes(normalizedTerm) ||
      domain.includes(normalizedTerm)
    ) {
      points += 2
      matchedConcepts.push(term)

      if (
        !matchedSignals.includes(
          'Technical-term match',
        )
      ) {
        matchedSignals.push(
          'Technical-term match',
        )
      }
    }
  }

  possiblePoints += Math.max(
    uniqueTechnicalTerms.length * 2,
    1,
  )

  let contextualMatches = 0

  for (const token of requirementTokens) {
    if (
      title.includes(token) ||
      detailedMetadata.includes(token) ||
      category.includes(token) ||
      domain.includes(token) ||
      code.includes(token)
    ) {
      contextualMatches += 1

      if (!matchedConcepts.includes(token)) {
        matchedConcepts.push(token)
      }
    }
  }

  points += Math.min(
    contextualMatches * 1,
    10,
  )

  possiblePoints += 10

  const baseScore =
    possiblePoints > 0
      ? Math.min(
          points / possiblePoints,
          1,
        )
      : 0

  let finalScore = baseScore

  if (typeof semanticScore === 'number') {
    const normalizedSemanticScore =
      Math.max(
        0,
        Math.min(
          semanticScore,
          1,
        ),
      )

    finalScore =
      normalizedSemanticScore * 0.85 +
      baseScore * 0.15

    if (
      !matchedSignals.includes(
        'Semantic similarity match',
      )
    ) {
      matchedSignals.push(
        'Semantic similarity match',
      )
    }
  }

  return {
    score: Number(
      finalScore.toFixed(2),
    ),
    matchedConcepts: Array.from(
      new Set(matchedConcepts),
    ),
    matchedSignals: Array.from(
      new Set(matchedSignals),
    ),
  }
}

function createRequirementGap(
  analysis: RequirementAnalysis,
  standard: Standard,
): RequirementGapAnalysis {
  const searchableMetadata = normalize(
    [
      standard.code,
      standard.title,
      standard.category,
      standard.application,
      standard.material,
      ...standard.applicableAreas,
      standard.scope,
      standard.technicalRequirements.material,
      standard.technicalRequirements.dimensions,
      standard.technicalRequirements.performance,
      standard.technicalRequirements.testing,
      standard.technicalRequirements.marking,
      ...standard.testingRequirements,
      ...standard.markingRequirements,
    ].join(' '),
  )

  const verified: string[] = []
  const unavailable: string[] = []
  const needsVerification: string[] = []

  const metadataContainsValue = (
    value: string,
  ): boolean => {
    const normalizedValue =
      normalize(value)

    if (!normalizedValue) {
      return false
    }

    if (
      searchableMetadata.includes(
        normalizedValue,
      )
    ) {
      return true
    }

    const tokens = tokenize(value)

    if (tokens.length === 0) {
      return false
    }

    const matchedTokens =
      tokens.filter((token) =>
        searchableMetadata.includes(
          token,
        ),
      )

    return matchedTokens.length > 0
  }

  const addAvailable = (
    field: string,
    value: string,
  ) => {
    if (!value) return

    verified.push(
      `${field}: "${value}" is reflected in the available standard metadata.`,
    )
  }

  const addUnavailable = (
    field: string,
    value: string,
  ) => {
    if (!value) return

    unavailable.push(
      `${field}: "${value}" could not be verified from the available source.`,
    )
  }

  const addNeedsVerification = (
    field: string,
    value: string,
  ) => {
    if (!value) return

    needsVerification.push(
      `${field}: "${value}" requires verification against the detailed applicable IS standard.`,
    )
  }

  if (analysis.product) {
    if (
      metadataContainsValue(
        analysis.product,
      )
    ) {
      addAvailable(
        'Product',
        analysis.product,
      )
    } else {
      addUnavailable(
        'Product',
        analysis.product,
      )
    }
  }

  if (analysis.material) {
    if (
      metadataContainsValue(
        analysis.material,
      )
    ) {
      addAvailable(
        'Material',
        analysis.material,
      )
    } else {
      addUnavailable(
        'Material',
        analysis.material,
      )
    }
  }

  if (analysis.application) {
    if (
      metadataContainsValue(
        analysis.application,
      )
    ) {
      addAvailable(
        'Application',
        analysis.application,
      )
    } else {
      addUnavailable(
        'Application',
        analysis.application,
      )
    }
  }

  if (analysis.grade) {
    if (
      metadataContainsValue(
        analysis.grade,
      )
    ) {
      addNeedsVerification(
        'Grade',
        analysis.grade,
      )
    } else {
      addUnavailable(
        'Grade',
        analysis.grade,
      )
    }
  }

  if (analysis.dimensions) {
    if (
      metadataContainsValue(
        analysis.dimensions,
      )
    ) {
      addNeedsVerification(
        'Dimensions',
        analysis.dimensions,
      )
    } else {
      addUnavailable(
        'Dimensions',
        analysis.dimensions,
      )
    }
  }

  if (analysis.performance) {
    addNeedsVerification(
      'Performance',
      analysis.performance,
    )
  }

  if (analysis.testing) {
    if (
      metadataContainsValue(
        analysis.testing,
      ) ||
      standard.testingRequirements.length > 0
    ) {
      addNeedsVerification(
        'Testing',
        analysis.testing,
      )
    } else {
      addUnavailable(
        'Testing',
        analysis.testing,
      )
    }
  }

  if (analysis.marking) {
    if (
      metadataContainsValue(
        analysis.marking,
      ) ||
      standard.markingRequirements.length > 0
    ) {
      addNeedsVerification(
        'Marking',
        analysis.marking,
      )
    } else {
      addUnavailable(
        'Marking',
        analysis.marking,
      )
    }
  }

  if (analysis.specialRequirements) {
    if (
      metadataContainsValue(
        analysis.specialRequirements,
      )
    ) {
      addNeedsVerification(
        'Special requirements',
        analysis.specialRequirements,
      )
    } else {
      addUnavailable(
        'Special requirements',
        analysis.specialRequirements,
      )
    }
  }

  if (analysis.otherTechnicalProperties) {
    addNeedsVerification(
      'Other technical properties',
      analysis.otherTechnicalProperties,
    )
  }

  return {
    verified: Array.from(
      new Set(verified),
    ),
    unavailable: Array.from(
      new Set(unavailable),
    ),
    needsVerification: Array.from(
      new Set(needsVerification),
    ),
  } as RequirementGapAnalysis
}

function buildExplanation(
  analysis: RequirementAnalysis,
  standard: Standard,
  matchedConcepts: string[],
  matchedSignals: string[],
): string {
  const reasons: string[] = []

  if (
    matchedSignals.includes(
      'Exact IS code match',
    )
  ) {
    reasons.push(
      `the requested IS code matches ${standard.code}`,
    )
  }

  if (analysis.product) {
    const product =
      normalize(analysis.product)

    if (
      normalize(standard.title).includes(
        product,
      ) ||
      normalize(standard.category).includes(
        product,
      )
    ) {
      reasons.push(
        `the product concept "${analysis.product}" appears in the available metadata`,
      )
    }
  }

  if (analysis.material) {
    const material =
      normalize(analysis.material)

    if (
      normalize(standard.title).includes(
        material,
      ) ||
      normalize(standard.category).includes(
        material,
      ) ||
      normalize(
        standard.application,
      ).includes(material)
    ) {
      reasons.push(
        `the material concept "${analysis.material}" appears in the available metadata`,
      )
    }
  }

  if (analysis.application) {
    const application =
      normalize(analysis.application)

    if (
      normalize(standard.title).includes(
        application,
      ) ||
      normalize(
        standard.application,
      ).includes(application)
    ) {
      reasons.push(
        `the application/domain concept "${analysis.application}" matches the available metadata`,
      )
    }
  }

  if (matchedConcepts.length > 0) {
    const concepts =
      matchedConcepts
        .slice(0, 8)
        .join(', ')

    reasons.push(
      `additional matching terms include: ${concepts}`,
    )
  }

  if (reasons.length === 0) {
    return `This standard was selected because its available title, category, or domain metadata has the strongest overall match to the supplied requirement.`
  }

  return `Recommended because ${reasons.join('; ')}. This is a relevance assessment based on available metadata, not a compliance determination.`
}

function toRecommendation(
  standard: Standard,
  score: number,
  matchedConcepts: string[],
  matchedSignals: string[],
  analysis: RequirementAnalysis,
): Recommendation {
  const gap =
    createRequirementGap(
      analysis,
      standard,
    )

  const explanation =
    buildExplanation(
      analysis,
      standard,
      matchedConcepts,
      matchedSignals,
    )

  return {
    standardId: standard.id,
    code: standard.code,
    title: standard.title,
    relevanceScore: score,
    whyRecommended: explanation,
    relevantSections: [],
    technicalRequirements:
      standard.technicalRequirements,
    requirementAnalysis: analysis,
    requirementGap: gap,
    evidence: {
      requirementSignal:
        matchedSignals.length > 0
          ? matchedSignals.join('; ')
          : 'Metadata relevance match',
      matchedConcepts,
      standardScope: standard.scope,
      supportingSections: [],
      extractedRequirements:
        gap.verified,
    },
  }
}

export function rankStandards(
  requirement: string,
  semanticScores?: Map<
    string,
    number
  >,
): Recommendation[] {
  const cleanRequirement =
    requirement.trim()

  if (!cleanRequirement) {
    return []
  }

  const analysis =
    extractRequirement(
      cleanRequirement,
    )

  const scored = STANDARDS.map(
    (standard) => {
      const semanticScore =
        semanticScores?.get(
          normalize(
            standard.code,
          ),
        )

      const result =
        scoreStandard(
          cleanRequirement,
          analysis,
          standard,
          semanticScore,
        )

      return {
        standard,
        score: result.score,
        matchedConcepts:
          result.matchedConcepts,
        matchedSignals:
          result.matchedSignals,
      }
    },
  )

  scored.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }

    const aCurrent =
      a.standard.status === 'active'
        ? 1
        : 0

    const bCurrent =
      b.standard.status === 'active'
        ? 1
        : 0

    return bCurrent - aCurrent
  })

  return scored
    .filter(
      (item) => item.score > 0,
    )
    .slice(0, 5)
    .map(
      ({
        standard,
        score,
        matchedConcepts,
        matchedSignals,
      }) =>
        toRecommendation(
          standard,
          score,
          matchedConcepts,
          matchedSignals,
          analysis,
        ),
    )
}

export function searchStandards(
  query: string,
): Standard[] {
  const normalizedQuery =
    normalize(query)

  if (!normalizedQuery) {
    return []
  }

  const codeQuery =
    normalizedQuery
      .replace(/\bis\b/g, '')
      .trim()

  const exactMatches =
    STANDARDS.filter(
      (standard) => {
        const code =
          normalize(
            standard.code,
          )

        const codeWithoutIs =
          code
            .replace(/\bis\b/g, '')
            .trim()

        return (
          code === normalizedQuery ||
          codeWithoutIs ===
            codeQuery
        )
      },
    )

  if (exactMatches.length > 0) {
    return exactMatches
  }

  const tokens =
    tokenize(query)

  return STANDARDS.filter(
    (standard) => {
      const searchableText =
        normalize(
          [
            standard.code,
            standard.title,
            standard.category,
            standard.application,
          ].join(' '),
        )

      return tokens.some(
        (token) =>
          searchableText.includes(
            token,
          ),
      )
    },
  ).slice(0, 20)
}

export function searchStandardsByTitle(
  query: string,
): Standard[] {
  const tokens =
    tokenize(query)

  if (tokens.length === 0) {
    return []
  }

  const scored =
    STANDARDS.map(
      (standard) => {
        const title =
          normalize(
            standard.title,
          )

        const category =
          normalize(
            standard.category,
          )

        const domain =
          normalize(
            standard.application,
          )

        let score = 0

        for (const token of tokens) {
          if (
            title.includes(token)
          ) {
            score += 3
          }

          if (
            category.includes(token)
          ) {
            score += 2
          }

          if (
            domain.includes(token)
          ) {
            score += 1
          }
        }

        return {
          standard,
          score,
        }
      },
    )

  return scored
    .filter(
      (item) =>
        item.score > 0,
    )
    .sort(
      (a, b) =>
        b.score - a.score,
    )
    .slice(0, 20)
    .map(
      (item) =>
        item.standard,
    )
}

export function getStandardsDatasetSize(): number {
  return STANDARDS.length
}

export function getStandardById(
  id: string,
): Standard | undefined {
  return STANDARDS.find(
    (standard) =>
      standard.id === id,
  )
}