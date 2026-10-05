// Site copy (English, formal register). Canonical numbers come from the
// methods paper (single author, Oct 2026): 18 failure modes (M1–M18), η from
// −47 % (one cell of padding) to −21 % [−33, −7] (eight cells), no converged
// value. IV, V and VII are under revision: mention them only as in preparation. The thesis
// DFT+U calculations were run within the research group (GGA+U proposed and
// analysed by Jorge) — never present them as his own runs; name no one.

export const site = {
  name: "Jorge Alfredo Robles Calderón",
  short: "Jorge Robles",
  role: "Physicist — experimental materials, superconductivity and optics",
  place: "Colombia · open to remote, hybrid or relocation",
  degree: "B.Sc. Physics, Universidad Nacional de Colombia — degree conferred 5 November 2026",
  email: "georgeotjg@gmail.com",
  github: "https://github.com/georgeotjg",
  linkedin: "https://www.linkedin.com/in/jorge-alfredo-robles-calderon/",
  catalogue: "https://tecnimotos-villamil.vercel.app/",
  photo: "/img/jorge.jpg",
  cvPdf: "/cv/Jorge_Robles_CV.pdf",
  thesisPdf: "/thesis/Robles_2026_ZnMgFe2O4_thesis.pdf",
  solverRepo: "https://github.com/georgeotjg/juliaTDGL",
  orcid: "https://orcid.org/0009-0007-0557-0263",
  paperDoi: "https://doi.org/10.5281/zenodo.23163207",
  updated: "October 2026",
};

export const intro =
  "Experimental physicist working on oxide materials and on the simulation of superconductors. Author of juliaTDGL, an open-source three-dimensional two-band Ginzburg–Landau solver; currently also on first-principles nonlinear optics of Weyl semimetals.";

export const introMore =
  "Interests: vortex matter and multiband superconductivity, structure–property relations in functional oxides, and light–matter response from first principles — with measurements and simulations checked against each other.";

export const numbers = [
  { value: "18", label: "silent failure modes documented in superconductor transport simulation, each with a test" },
  { value: "~56k", label: "test assertions in the open-source solver juliaTDGL" },
  { value: "0", label: "maximum difference between the Julia solver and its Octave reference (bit for bit)" },
  { value: "0.05 %", label: "deviation of the surface-nucleation ratio H_c3/H_c2 from its exact value" },
];

export const now = [
  "Methods paper on silent failure modes in 3D two-band TDGL simulation, published as a preprint on Zenodo (October 2026), with the open-source solver juliaTDGL 1.0.",
  "The geometric diode at MgB₂-like parameters — strong screening and separated coherence lengths — with Joule heating and interband drag; next, multiband and non-equilibrium TDGL for three-dimensional nanostructures.",
  "Nonlinear optics of Weyl semimetals from first principles: a validated real-time model, and a Quantum ESPRESSO → Wannier90 chain under way.",
  "An open computational lensmeter built from a phone camera and a laptop screen (design stage).",
];

export const thesis = {
  title: "Combustion synthesis and structural and optical characterization of Zn₁₋ₓMgₓFe₂O₄ (x = 0, 0.5, 1.0), correlated with DFT calculations",
  short: "Zn₁₋ₓMgₓFe₂O₄ spinel ferrites",
  meta: "Bachelor's thesis (trabajo de grado) · Universidad Nacional de Colombia · 2026 · 152 pp · advisor D. A. Landínez Téllez",
  note: "Laboratory work: synthesis of the series by glycine-assisted combustion, and characterization by X-ray diffraction with Rietveld refinement, SEM/EDX and UV-Vis diffuse reflectance. Electronic structure: GGA+U band structures, with the treatment proposed and analysed in the thesis and the calculations run within the research group.",
  findings: [
    "Single-phase Fd3̄m solid solution across the series; Rietveld refinement tracks the lattice parameter with composition.",
    "Coherent domains of 20–26 nm (Scherrer; Williamson–Hall used only as a diagnostic). SEM grain size ~65 → ~81 nm.",
    "Direct optical gap of 1.88–1.91 eV, nearly independent of composition.",
    "GGA+U band structures place the gap in the Fe–O subsystem, which explains why replacing Zn with Mg barely moves it.",
  ],
  followUp: "Analysis of the diffraction data continues with whole-pattern simulation (GSAS-II).",
};

export const solver = {
  summary:
    "A three-dimensional, two-band time-dependent Ginzburg–Landau solver for mesoscopic superconductors under applied field and transport current, designed, written and validated independently. Two order parameters coupled by a Josephson term and a self-consistent vector potential on a staggered mesh with gauge-invariant link variables; the current is injected through its own Ampère field, and the voltage is read from the Josephson relation on the gauge-invariant phase. Released as open source.",
  versions: [
    { tag: "v13.3", what: "Octave reference implementation (hash df37e31c), the origin of the stored reference states." },
    { tag: "v14.1", what: "Julia port, bit for bit against v13.3, with an optional scalar potential by Coulomb projection." },
    { tag: "1.0", what: "juliaTDGL, public release (MIT, October 2026): optional terms for interband drag, heating, Joule dissipation and bath temperature, all off by default; a terminal menu for runs and a browser editor for 3D sample shapes." },
  ],
  validation: [
    "Bit-for-bit agreement with the stored reference states (maximum difference 0 on 32 arrays).",
    "Lowest Landau level within 1.6 % at the production mesh; surface-nucleation ratio H_c3/H_c2 within 0.05 % of 1.6946.",
    "About 56 000 test assertions, including a slow reference loop for the kernel, gauge invariance of the scalar-potential step and every optional term.",
    "Symmetry control: a sample symmetric under the mirror along the vortex motion gives zero diode efficiency — exactly in exact arithmetic, to a few parts in 10¹¹ in practice.",
  ],
};

export const paper = {
  title: "Silent failure modes in three-dimensional two-band time-dependent Ginzburg–Landau simulations of geometric superconducting diodes",
  meta: "J. A. Robles Calderón · Preprint, Zenodo, 2026 · 19 pp · doi:10.5281/zenodo.23163207",
};

export const findings = [
  {
    kicker: "Protocol",
    title: "Eighteen ways a converged simulation can report the wrong quantity",
    points: [
      "Each failure mode produces a converged, plausible number that does not measure what it is reported as, and each has a test.",
      "The central one (M1): a phase imposed uniformly on the contact links cancels in the discrete curl, so the solver integrates the zero-current problem. Self-field injection, odd in the current, and a Josephson voltmeter replace it.",
      "Others concern averaging windows that set a threshold, the memory of a current ladder, convergence floors counted in iterations, coefficients whose names mislead (M16, M17), and heat generated where injected normal current converts into supercurrent (M18).",
    ],
  },
  {
    kicker: "Two-band condensate",
    title: "What the functional allows in equilibrium",
    points: [
      "Screening measures the total stiffness of the two condensates.",
      "The functional caps the π-band upper critical field by the stiffness partition (H_c2^π/H_c2^σ ≤ ρ_σ/ρ_π), so separated coherence lengths and a bulk π band that survives vortex entry exclude each other in these samples.",
    ],
  },
  {
    kicker: "Superconducting diode",
    title: "A notched box rectifies; the sign is robust, the magnitude is bracketed",
    points: [
      "The sign survives changes of mesh, thickness and padding, and is fixed by symmetry: complex conjugation composed with the mirror maps +J onto −J.",
      "The efficiency falls from −47 % with one cell of padding (a normal metal in this formulation) to −21 % [−33, −7] with eight cells; no converged value is quoted.",
    ],
  },
];

export const figuresPaper = [
  {
    src: "/figs/paperI_diode_maps.png",
    alt: "Order-parameter maps of a notched sample at plus and minus current: dissipating and silent",
    caption: "|Ψσ|² of the notched box at J = ±0.050 J₀: vortices cross for +J (dissipating) and stay pinned for −J (silent).",
  },
  {
    src: "/figs/paperI_eta.png",
    alt: "Voltage versus current with both onsets bracketed, and diode efficiency brackets across systematics",
    caption: "Both onsets bracketed by measurement (left), and the efficiency under one verdict rule across mesh, thickness and padding (right): brackets, not a single value.",
  },
  {
    src: "/figs/paperI_mh_compare.png",
    alt: "Magnetization and vortex number versus field for two coherence-length ratios",
    caption: "Magnetization and vortex count against field for two coherence-length ratios; at R = 4 nineteen vortices enter in one field step.",
  },
  {
    src: "/figs/paperI_sym_ab.png",
    alt: "Asymmetry between plus and minus current in a symmetric sample, before and after a fix, down to machine precision",
    caption: "Symmetry test on a mirror-symmetric sample: an index-range defect made |V⁺| − |V⁻| grow with J; after the fix it sits at the machine floor.",
  },
];

export const weyl = {
  status: "Started September 2026",
  summary:
    "How do shift and injection photocurrents and second-harmonic generation in magnetic Weyl semimetals depend on the treatment of the f electrons and on the direction of the magnetization, and where does perturbation theory stop being sufficient? Guiding rule: reproduce the measured linear optical conductivity before trusting any nonlinear prediction.",
  stack: "Quantum ESPRESSO + Wannier90 + Julia for the dense-k work; Octopus real-time TDDFT as the self-consistent reference; Python for analysis and for separating shift from injection currents in j(t).",
  done: [
    "Analytic Weyl lattice model in real time (Julia): reproduces the quantized circular photogalvanic response of de Juan et al. (2017) without perturbative formulas (Tr β/β₀ = 1.014 on a 96³ grid), and shows the breakdown and Rabi-like rebound of quantization at strong fields.",
    "Octopus real-time TDDFT validated on silicon, including a symmetry null test: a zero-area pulse leaves no DC current, as inversion requires.",
    "Quantum ESPRESSO → Wannier90 chain for GaAs running, with band energies reproduced at high-symmetry points — the starting point for the shift-current benchmark.",
  ],
  next: "Shift current of GaAs against the literature, then a measured Weyl semimetal.",
};

export const optics = {
  status: "Design stage",
  title: "An open computational lensmeter",
  summary:
    "A phone camera's RAW sensor and a laptop screen measure spectacle lenses by transmission deflectometry: the camera looks at a pattern on the screen through the lens, and the pattern's distortion gives the lens prescription — sphere, cylinder and axis — with an uncertainty, aiming at the ISO tolerance of ±0.12 D, together with the full power map. The physics and mathematics sit in two pieces: an elliptic inverse problem on a masked domain, solved by conjugate gradients preconditioned with a fast cosine transform, and a thick-lens model fitted at several lens–screen distances.",
  done: [
    "Simulation: a thin-lens estimate at 5 cm is biased by 0.13–0.34 D on real spectacle lenses; a two-surface model fitted at three distances brings the bias below 0.005 D.",
    "Core inverse solver checked numerically on a curved domain (error 4 × 10⁻¹¹ in 24 preconditioned iterations).",
  ],
  next: "Characterize the sensor and the screen, validate on a synthetic lens, then measure several spectacle lenses against an optician's lensmeter.",
};

export const software = [
  {
    kicker: "Open source · Julia",
    title: "juliaTDGL — 3D two-band TDGL solver",
    body:
      "The solver of the methods paper, released under MIT: kernel threaded over planes, optional physics behind switches, checkpoint and restart, VTK export for ParaView, a guide to the physics and the numerics, and about 56 000 test assertions including bit-for-bit acceptance against reference states.",
    tags: ["Julia", "Octave/MATLAB", "Python", "ParaView", "Lean 4"],
    link: "https://github.com/georgeotjg/juliaTDGL",
  },
  {
    kicker: "Tools · JavaScript, Python",
    title: "Shape editor and run manager",
    body:
      "A browser editor for three-dimensional sample shapes that checks, while drawing, whether a shape can rectify at all, and a terminal menu that launches, follows, stops and resumes long runs and reports each critical current as a bracket.",
    tags: ["JavaScript", "HTML/CSS", "Python", "TOML"],
  },
  {
    kicker: "First principles · in progress",
    title: "Real-time Weyl model and ab initio tooling",
    body:
      "A dependency-free Julia package that propagates a Weyl lattice model in real time with checkpointing by blocks of k-points, a photocurrent extractor tested on Octopus output, and a batch runner that stops and resumes real-time TDDFT runs identically.",
    tags: ["Julia", "Octopus", "Quantum ESPRESSO", "Python"],
  },
  {
    kicker: "Full-stack web · field data",
    title: "Field data capture platform",
    body:
      "Geospatial web application: GPS-tagged forms, team authentication, an interactive map with spatial queries and a dashboard, plus an offline queue on the phone for areas without signal. Deployed and used in the field for interviews, surveys and territorial records; new questionnaires or regions are configuration, not a rewrite.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL/PostGIS", "Leaflet", "PWA"],
  },
  {
    kicker: "Data · OCR + local language model",
    title: "Metadata extraction at the National Astronomical Observatory",
    body:
      "OCR combined with a locally hosted language model to extract metadata from scanned documents, with validation that rejects malformed extractions instead of passing them on.",
    tags: ["Python", "OCR", "Ollama"],
  },
  {
    kicker: "Web · small business",
    title: "Catalogue site for a motorcycle workshop",
    body: "Responsive catalogue with quotations over WhatsApp, deployed and in use.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
    link: "https://tecnimotos-villamil.vercel.app/",
  },
];

export const practices = [
  "New versions are checked against the previous reference before they are used.",
  "Each reported effect has a control run in which it should vanish.",
  "Long simulations are checkpointed, resumable and reproducible from their recorded settings.",
];

export const cv = {
  summary:
    "Experimental physicist with independent experience in scientific software. Synthesis and characterization of spinel ferrites; an open-source three-dimensional two-band superconductor solver and a methods paper on its validation; first-principles nonlinear optics in progress; web and data applications deployed and in use.",
  seeking:
    "Areas: condensed matter physics — superconductivity, functional materials, optics. Open to funded master's or PhD positions, and to research or industry roles in scientific software, data and materials R&D.",
  experience: [
    { role: "Administrative and Technical Assistant", org: "National Astronomical Observatory, Universidad Nacional de Colombia", when: "2023–2026" },
    { role: "Extension and Technology-Transfer Assistant", org: "Department of Physics, Universidad Nacional de Colombia", when: "2024–2025" },
    { role: "Academic and Scientific Support", org: "Universidad Nacional de Colombia", when: "2022–2025" },
    { role: "Customer Operations", org: "Iké Asistencia and prior roles", when: "2018–2023" },
  ],
  education: [
    { what: "B.Sc. Physics", where: "Universidad Nacional de Colombia, Bogotá", when: "2019 – 2026", note: "Degree conferred 5 November 2026. Bachelor's thesis in experimental materials physics (grade 5.0/5.0). GPA 4.0/5.0." },
    { what: "Technical degree, Administrative Assistance", where: "SENA", when: "2019", note: "" },
  ],
  skills: [
    { area: "Computation", items: "Python (NumPy, SciPy, pandas, scikit-learn, PyTorch, Matplotlib), Julia, MATLAB/Octave, SQL, TypeScript, LaTeX, Git, Linux" },
    { area: "Numerical methods", items: "Finite differences on staggered grids, gauge-invariant discretisation, IMEX schemes, Poisson/elliptic solves, preconditioned Krylov solvers, regression and acceptance testing" },
    { area: "First principles", items: "DFT and DFT+U concepts, band-structure analysis; Quantum ESPRESSO and Octopus (real-time TDDFT), in current use" },
    { area: "Laboratory", items: "Combustion synthesis, XRD with Rietveld refinement, SEM/EDX, UV-Vis diffuse reflectance" },
    { area: "Data and cloud", items: "Data analysis and fitting pipelines in Python; SQL (PostgreSQL), Apache Spark, AWS, Metabase dashboards; containers (Docker/Podman)" },
    { area: "GIS", items: "PostGIS, spatial queries, Leaflet, GPS field data" },
    { area: "Web", items: "Next.js/TypeScript, Supabase (deployed applications)" },
    { area: "Languages", items: "Spanish (native), English (B2)" },
  ],
};
