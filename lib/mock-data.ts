import type { Standard } from '@/lib/types'

/**
 * CENTRALIZED MOCK KNOWLEDGE BASE
 * -------------------------------------------------------------------------
 * Every IS code below is a FICTIONAL placeholder created for this prototype.
 * They are prefixed with "IS DEMO" specifically so they are NOT mistaken for
 * real Bureau of Indian Standards (BIS) codes.
 *
 * Replace this file (and the `/api/recommend` route) with data returned from
 * the real Python FastAPI + semantic search + vector database backend later.
 */

export const CATEGORIES = [
  'Structural & Construction',
  'Water & Fluid Systems',
  'Electrical & Cables',
  'Cement & Concrete',
  'Laboratory & Instrumentation',
  'Safety Equipment',
] as const

export const MATERIALS = [
  'Steel',
  'PVC / Polymer',
  'Copper / Aluminium',
  'Cement / Concrete',
  'Composite / Glass',
  'Mixed',
] as const

export const APPLICATIONS = [
  'Building Construction',
  'Water Supply',
  'Industrial',
  'Infrastructure',
  'Testing / Calibration',
  'Personal Protection',
] as const

export const STANDARD_TYPES = [
  'Product',
  'Method / Test',
  'Specification',
  'Code of Practice',
  'Terminology',
] as const

export const MOCK_STANDARDS: Standard[] = [
  {
    id: 'ss-structural-steel',
    code: 'IS DEMO 4021',
    title: 'Structural Steel Sections for Load-Bearing Construction — Example Standard',
    category: 'Structural & Construction',
    type: 'Specification',
    status: 'active',
    version: 'Rev. 3',
    date: 'Prototype data · v2024.1',
    scope:
      'Specifies illustrative requirements for hot-rolled structural steel sections intended for load-bearing members in building and infrastructure projects, including chemical composition, mechanical properties, and dimensional tolerances.',
    applicableAreas: ['Buildings', 'Bridges', 'Industrial frames', 'Load-bearing members'],
    material: 'Steel',
    application: 'Building Construction',
    relevanceScore: 0.94,
    whyRecommended:
      'The requirement mentions structural steel for load-bearing construction. This candidate standard is associated with structural steel products and the relevant mechanical and dimensional requirements for such applications.',
    sections: [
      {
        title: 'Section 1 — Scope',
        content: 'Defines the product family and intended structural applications.',
        evidence:
          'Covers hot-rolled sections used as primary load-bearing members in building frames.',
      },
      {
        title: 'Section 4 — Mechanical Requirements',
        content: 'Yield strength, tensile strength, and elongation classes.',
        evidence:
          'Minimum yield strength grades are specified for high-strength structural applications.',
      },
      {
        title: 'Section 6 — Dimensional Tolerances',
        content: 'Permissible variation in section depth, width, and thickness.',
        evidence:
          'Tolerances are defined to ensure fit-up and predictable load behaviour on site.',
      },
    ],
    technicalRequirements: {
      material: 'Carbon / low-alloy structural steel, illustrative grade classes E250–E410.',
      dimensions: 'Standard I, H, channel and angle sections with defined tolerance bands.',
      performance: 'High strength suitable for load-bearing and seismic-aware design.',
      mechanicalProperties: 'Yield ≥ 250 MPa (illustrative), defined elongation and impact values.',
      testing: 'Tensile, bend, and impact testing per sample lot.',
      marking: 'Section identification, grade, heat number, and manufacturer mark.',
    },
    testingRequirements: [
      'Tensile test per heat / lot',
      'Bend test for ductility',
      'Charpy impact test (where specified)',
      'Dimensional verification against tolerance table',
    ],
    markingRequirements: [
      'Grade designation',
      'Heat / cast number',
      'Manufacturer identification',
      'Section size reference',
    ],
    relatedStandardIds: ['cement-concrete', 'safety-ppe'],
    evidenceTrace: {
      requirementSignal: 'Structural steel for load-bearing use',
      matchedConcepts: ['structural steel', 'load-bearing', 'high strength', 'building construction'],
      standardScope: 'Hot-rolled structural steel sections for primary members.',
      supportingSections: ['Section 1 — Scope', 'Section 4 — Mechanical Requirements'],
      extractedRequirements: [
        'Minimum yield strength grade',
        'Dimensional tolerance band',
        'Tensile & impact acceptance criteria',
      ],
    },
  },
  {
    id: 'pvc-water-pipes',
    code: 'IS DEMO 7188',
    title: 'Unplasticised PVC Pipes for Potable Water Supply — Example Standard',
    category: 'Water & Fluid Systems',
    type: 'Product',
    status: 'active',
    version: 'Rev. 2',
    date: 'Prototype data · v2024.1',
    scope:
      'Illustrative specification for rigid unplasticised PVC (uPVC) pipes used in cold potable water distribution, covering pressure classes, dimensions, and hydrostatic performance.',
    applicableAreas: ['Water supply', 'Distribution networks', 'Plumbing risers'],
    material: 'PVC / Polymer',
    application: 'Water Supply',
    relevanceScore: 0.91,
    whyRecommended:
      'The requirement references PVC piping for water supply. This candidate standard is associated with uPVC pressure pipes and their hydrostatic and dimensional requirements.',
    sections: [
      {
        title: 'Section 2 — Pressure Classes',
        content: 'Defines nominal pressure ratings and wall thickness series.',
        evidence: 'Pressure classes map wall thickness to a rated working pressure.',
      },
      {
        title: 'Section 5 — Hydrostatic Performance',
        content: 'Long-term and short-term hydrostatic strength requirements.',
        evidence: 'Pipes must sustain defined internal pressure without failure.',
      },
    ],
    technicalRequirements: {
      material: 'Unplasticised PVC compound suitable for potable water contact.',
      dimensions: 'Nominal diameters with pressure-class-dependent wall thickness.',
      performance: 'Rated working pressure with hydrostatic strength margins.',
      testing: 'Hydrostatic pressure, sustained pressure, and dimensional checks.',
      marking: 'Nominal diameter, pressure class, material, and batch code.',
    },
    testingRequirements: [
      'Short-term hydrostatic pressure test',
      'Sustained pressure test',
      'Dimensional and ovality checks',
      'Effect on water quality (illustrative)',
    ],
    markingRequirements: [
      'Nominal diameter',
      'Pressure class',
      'Material designation',
      'Batch / date code',
    ],
    relatedStandardIds: ['electrical-cable', 'lab-equipment'],
    evidenceTrace: {
      requirementSignal: 'PVC pipes for water supply',
      matchedConcepts: ['PVC', 'uPVC', 'potable water', 'pressure pipe'],
      standardScope: 'Rigid uPVC pressure pipes for cold potable water.',
      supportingSections: ['Section 2 — Pressure Classes', 'Section 5 — Hydrostatic Performance'],
      extractedRequirements: [
        'Pressure class selection',
        'Wall thickness series',
        'Hydrostatic acceptance criteria',
      ],
    },
  },
  {
    id: 'electrical-cable',
    code: 'IS DEMO 3390',
    title: 'PVC-Insulated Electrical Cables for Industrial Use — Example Standard',
    category: 'Electrical & Cables',
    type: 'Product',
    status: 'active',
    version: 'Rev. 4',
    date: 'Prototype data · v2024.1',
    scope:
      'Illustrative specification for PVC-insulated power cables with copper or aluminium conductors for fixed industrial installations, covering conductor sizing, insulation, and electrical performance.',
    applicableAreas: ['Industrial plants', 'Power distribution', 'Fixed wiring'],
    material: 'Copper / Aluminium',
    application: 'Industrial',
    relevanceScore: 0.89,
    whyRecommended:
      'The requirement references electrical cables for industrial use. This candidate standard is associated with PVC-insulated power cables and their conductor and insulation requirements.',
    sections: [
      {
        title: 'Section 3 — Conductor Requirements',
        content: 'Conductor material, class, and cross-sectional area ranges.',
        evidence: 'Conductor size is matched to rated current-carrying capacity.',
      },
      {
        title: 'Section 7 — Insulation & Voltage Grade',
        content: 'Insulation thickness and rated voltage classes.',
        evidence: 'Insulation is specified for defined voltage grades and temperature.',
      },
    ],
    technicalRequirements: {
      material: 'Annealed copper or aluminium conductor with PVC insulation.',
      dimensions: 'Nominal conductor cross-sections with insulation thickness bands.',
      performance: 'Rated voltage grade and current-carrying capacity.',
      testing: 'Conductor resistance, insulation resistance, and high-voltage tests.',
      marking: 'Conductor size, voltage grade, cores, and manufacturer.',
    },
    testingRequirements: [
      'Conductor resistance test',
      'Insulation resistance test',
      'High-voltage (dielectric) test',
      'Insulation thickness verification',
    ],
    markingRequirements: [
      'Conductor cross-section',
      'Number of cores',
      'Voltage grade',
      'Manufacturer identification',
    ],
    relatedStandardIds: ['pvc-water-pipes', 'safety-ppe'],
    evidenceTrace: {
      requirementSignal: 'Electrical cables for industrial use',
      matchedConcepts: ['electrical cable', 'PVC insulation', 'industrial', 'power distribution'],
      standardScope: 'PVC-insulated power cables for fixed industrial installations.',
      supportingSections: ['Section 3 — Conductor Requirements', 'Section 7 — Insulation & Voltage Grade'],
      extractedRequirements: [
        'Conductor cross-section',
        'Rated voltage grade',
        'Insulation resistance criteria',
      ],
    },
  },
  {
    id: 'cement-concrete',
    code: 'IS DEMO 1290',
    title: 'Ordinary Portland Cement for Construction — Example Standard',
    category: 'Cement & Concrete',
    type: 'Product',
    status: 'active',
    version: 'Rev. 5',
    date: 'Prototype data · v2024.1',
    scope:
      'Illustrative specification for ordinary Portland cement grades used in general construction, covering chemical composition, fineness, setting time, and compressive strength.',
    applicableAreas: ['Concrete works', 'Masonry', 'General construction'],
    material: 'Cement / Concrete',
    application: 'Building Construction',
    relevanceScore: 0.86,
    whyRecommended:
      'The requirement references cement for construction. This candidate standard is associated with ordinary Portland cement and its strength and setting requirements.',
    sections: [
      {
        title: 'Section 2 — Composition',
        content: 'Permissible chemical composition and additives.',
        evidence: 'Chemical limits ensure consistent hydration behaviour.',
      },
      {
        title: 'Section 5 — Compressive Strength',
        content: 'Minimum strength at defined curing ages.',
        evidence: 'Grade designation corresponds to 28-day compressive strength.',
      },
    ],
    technicalRequirements: {
      material: 'Clinker-based ordinary Portland cement with permitted additions.',
      dimensions: 'Fineness (specific surface) within a defined range.',
      performance: 'Grade-based 28-day compressive strength targets.',
      testing: 'Fineness, setting time, soundness, and strength tests.',
      marking: 'Grade, week/date of packing, and manufacturer.',
    },
    testingRequirements: [
      'Fineness test',
      'Initial & final setting time',
      'Soundness test',
      'Compressive strength at 3/7/28 days',
    ],
    markingRequirements: ['Cement grade', 'Packing date', 'Net weight', 'Manufacturer identification'],
    relatedStandardIds: ['ss-structural-steel'],
    evidenceTrace: {
      requirementSignal: 'Cement for construction',
      matchedConcepts: ['cement', 'Portland', 'construction', 'compressive strength'],
      standardScope: 'Ordinary Portland cement for general construction.',
      supportingSections: ['Section 2 — Composition', 'Section 5 — Compressive Strength'],
      extractedRequirements: ['Cement grade', 'Setting time window', '28-day strength target'],
    },
  },
  {
    id: 'lab-equipment',
    code: 'IS DEMO 9542',
    title: 'General Requirements for Laboratory Glassware & Instruments — Example Standard',
    category: 'Laboratory & Instrumentation',
    type: 'Specification',
    status: 'under-review',
    version: 'Rev. 1',
    date: 'Prototype data · v2024.1',
    scope:
      'Illustrative general requirements for volumetric laboratory glassware and basic measurement instruments, covering accuracy classes, materials, and calibration.',
    applicableAreas: ['Testing laboratories', 'Calibration', 'Quality control'],
    material: 'Composite / Glass',
    application: 'Testing / Calibration',
    relevanceScore: 0.78,
    whyRecommended:
      'The requirement references laboratory equipment. This candidate standard is associated with laboratory glassware and instrument accuracy and calibration requirements.',
    sections: [
      {
        title: 'Section 3 — Accuracy Classes',
        content: 'Tolerance classes for volumetric measurement.',
        evidence: 'Accuracy class defines permissible measurement error.',
      },
      {
        title: 'Section 6 — Calibration',
        content: 'Calibration and traceability requirements.',
        evidence: 'Instruments require documented calibration traceability.',
      },
    ],
    technicalRequirements: {
      material: 'Borosilicate glass and corrosion-resistant components.',
      dimensions: 'Nominal capacity with accuracy-class tolerances.',
      performance: 'Defined measurement accuracy and repeatability.',
      testing: 'Volumetric verification and calibration checks.',
      marking: 'Capacity, accuracy class, reference temperature, and maker.',
    },
    testingRequirements: [
      'Volumetric accuracy verification',
      'Thermal shock resistance (illustrative)',
      'Calibration traceability check',
    ],
    markingRequirements: ['Nominal capacity', 'Accuracy class', 'Reference temperature', 'Manufacturer'],
    relatedStandardIds: ['pvc-water-pipes'],
    evidenceTrace: {
      requirementSignal: 'Laboratory equipment / instrumentation',
      matchedConcepts: ['laboratory', 'glassware', 'calibration', 'accuracy'],
      standardScope: 'Volumetric laboratory glassware and basic instruments.',
      supportingSections: ['Section 3 — Accuracy Classes', 'Section 6 — Calibration'],
      extractedRequirements: ['Accuracy class', 'Calibration traceability', 'Material suitability'],
    },
  },
  {
    id: 'safety-ppe',
    code: 'IS DEMO 6607',
    title: 'Industrial Safety Helmets & Personal Protective Equipment — Example Standard',
    category: 'Safety Equipment',
    type: 'Product',
    status: 'active',
    version: 'Rev. 2',
    date: 'Prototype data · v2024.1',
    scope:
      'Illustrative specification for industrial safety helmets and related personal protective equipment, covering impact resistance, materials, and marking.',
    applicableAreas: ['Construction sites', 'Industrial plants', 'Worker safety'],
    material: 'Composite / Glass',
    application: 'Personal Protection',
    relevanceScore: 0.74,
    whyRecommended:
      'The requirement references worker safety / protective equipment. This candidate standard is associated with industrial safety helmets and their impact-resistance requirements.',
    sections: [
      {
        title: 'Section 4 — Impact Resistance',
        content: 'Shock absorption and penetration resistance requirements.',
        evidence: 'Helmets must limit transmitted force under defined impact.',
      },
    ],
    technicalRequirements: {
      material: 'Impact-resistant thermoplastic or composite shell.',
      dimensions: 'Size range with adjustable harness.',
      performance: 'Shock absorption and penetration resistance thresholds.',
      testing: 'Impact, penetration, and flammability tests.',
      marking: 'Standard reference, size, date of manufacture, and maker.',
    },
    testingRequirements: [
      'Shock absorption test',
      'Penetration resistance test',
      'Flammability test',
    ],
    markingRequirements: ['Size range', 'Date of manufacture', 'Manufacturer', 'Standard reference'],
    relatedStandardIds: ['ss-structural-steel', 'electrical-cable'],
    evidenceTrace: {
      requirementSignal: 'Worker safety / protective equipment',
      matchedConcepts: ['safety helmet', 'PPE', 'impact resistance', 'worker safety'],
      standardScope: 'Industrial safety helmets and personal protective equipment.',
      supportingSections: ['Section 4 — Impact Resistance'],
      extractedRequirements: ['Impact resistance threshold', 'Penetration resistance', 'Marking'],
    },
  },
]

export function getStandardById(id: string): Standard | undefined {
  return MOCK_STANDARDS.find((s) => s.id === id)
}
