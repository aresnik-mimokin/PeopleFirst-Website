/**
 * Client recommendations shown on the homepage.
 * Quotes are stored in English and Spanish; the UI picks the one matching the active locale.
 * The first paragraph is shown as an excerpt, the rest appears after "Read more".
 */

export type Testimonial = {
  name: string
  role: string
  linkedinUrl?: string
  quote: { en: string; es: string }
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Diana Tlapale',
    role: 'Executive Director Americas, Amma',
    linkedinUrl: 'https://www.linkedin.com/in/diana-tlapale-z/?skipRedirect=true',
    quote: {
      en: `I had the pleasure of working closely with Carla for a year, during which she supported our HR team across multiple markets in LATAM. Carla managed the full early stages of our recruitment process including pre-selection, candidate filtering, and first interviews, for a wide range of open positions across the region.

What stood out most was how fast and reliable she was: no matter how urgent or specific the need, Carla consistently found the right candidates quickly, without ever sacrificing quality. Navigating hiring across so many different LATAM markets isn't easy, and she made it look seamless.

Beyond her skills, Carla is organized, dependable, and genuinely great to work with. I'm confident she'd bring that same excellence to any team, and I recommend her without hesitation.`,
      es: `Tuve el placer de trabajar muy de cerca con Carla durante un año, período en el que apoyó a nuestro equipo de RRHH en múltiples mercados de LATAM. Carla gestionó todas las etapas iniciales de nuestro proceso de reclutamiento, incluyendo la preselección, el filtrado de candidatos y las primeras entrevistas, para una amplia variedad de posiciones abiertas en la región.

Lo que más se destacó fue lo rápida y confiable que fue: sin importar cuán urgente o específica fuera la necesidad, Carla encontraba de forma constante a los candidatos adecuados, rápidamente y sin sacrificar nunca la calidad. Contratar en tantos mercados distintos de LATAM no es fácil, y ella lo hizo parecer sencillo.

Más allá de sus habilidades, Carla es organizada, confiable y realmente excelente para trabajar. Estoy seguro de que aportaría esa misma excelencia a cualquier equipo, y la recomiendo sin dudarlo.`,
    },
  },
  {
    name: 'Krik D Angacian',
    role: 'Founder and CEO, CPG Affiliate Partners',
    linkedinUrl: 'https://www.linkedin.com/in/krik-d-angacian-aa31771a/',
    quote: {
      en: `Carla is an incredibly talented recruiter. I've sourced a few employees with her and couldn't speak highly enough about her efforts and results.`,
      es: `Carla es una reclutadora increíblemente talentosa. He incorporado a algunos empleados con ella y no puedo hablar lo suficientemente bien de su esfuerzo y de sus resultados.`,
    },
  },
  {
    name: 'Marcus Araujo',
    role: 'Global AI Manager, dLocal',
    linkedinUrl: 'https://www.linkedin.com/in/marcus-mvsa/',
    quote: {
      en: `I worked closely with Carla over the past year and a half, and I'm in a rare position to speak to her work from two angles: first as a candidate she recruited, and then as her day-to-day recruiting partner once I joined as AI Engineering Manager.

As an interviewer, Carla brought structure and clarity to the entire process. She was consistently available and direct about which opportunities best matched my interests and what the company could realistically offer. The entire process took less than a month, and by the end of it I landed a role that was considerably better than what I had initially imagined.

Once I came on board, Carla became the talent acquisition partner for my teams in AI Engineering. She was instrumental in helping me scale the team from 15 to 40 people in three months, and she helped me think through the tradeoff between internal hires and staff augmentation. When we later moved to a decentralized organizational design, she helped me redefine the search parameters for highly strategic AI roles, a genuinely complex task given the high demand and limited hiring precedent for these profiles. Together we hired across multiple regions, spanning LATAM and Europe.

Carla is an exceptional recruiting partner. She understands the real needs of a team within its organizational design, its key KPIs, and she truly invests in understanding the technical nuances outside her own comfort zone, which is precisely what gives her a real competitive edge. Together we restructured several parts of the process, preserving interview standards while using transcripts, structured voting, and actual team needs to scale interviewing and route candidates to the teams that best fit their profile and long-term vision.

Beyond hiring, we also worked out how to minimize early turnover to nearly zero. The different tactics we put in place helped us build teams that, within a year, generated over 25,000 hours saved through AI-driven automation.

She is highly results-oriented, skilled at resolving conflict, and without question one of the best HR professionals I have ever worked with.`,
      es: `Trabajé de cerca con Carla durante el último año y medio, y me encuentro en una posición poco común para hablar de su trabajo desde dos ángulos: primero como candidato al que ella reclutó, y luego como su socio de reclutamiento día a día, una vez que me incorporé como AI Engineering Manager.

Como entrevistador, Carla aportó estructura y claridad a todo el proceso. Estuvo disponible de forma constante y fue directa sobre qué oportunidades encajaban mejor con mis intereses y qué podía ofrecer realmente la empresa. Todo el proceso tomó menos de un mes, y al final conseguí un puesto considerablemente mejor de lo que había imaginado al principio.

Una vez que me incorporé, Carla pasó a ser la partner de talent acquisition de mis equipos de AI Engineering. Fue clave para ayudarme a escalar el equipo de 15 a 40 personas en tres meses, y me ayudó a pensar el equilibrio entre contrataciones internas y staff augmentation. Cuando después pasamos a un diseño organizacional descentralizado, me ayudó a redefinir los parámetros de búsqueda para roles de IA altamente estratégicos, una tarea genuinamente compleja dada la alta demanda y los pocos antecedentes de contratación para estos perfiles. Juntos contratamos en varias regiones, entre LATAM y Europa.

Carla es un partner de reclutamiento excepcional. Entiende las necesidades reales de un equipo dentro de su diseño organizacional y sus KPIs clave, e invierte de verdad en comprender los matices técnicos fuera de su zona de confort, lo que justamente le da una ventaja competitiva real. Juntos reestructuramos varias partes del proceso, manteniendo los estándares de entrevista y utilizando transcripciones, votación estructurada y las necesidades reales de cada equipo para escalar las entrevistas y derivar a los candidatos a los equipos que mejor encajan con su perfil y su visión a largo plazo.

Más allá de la contratación, también trabajamos juntos para reducir la rotación temprana a casi cero. Las distintas tácticas que implementamos nos ayudaron a construir equipos que, en un año, generaron más de 25.000 horas ahorradas mediante automatización impulsada por IA.

Es muy orientada a resultados, hábil para resolver conflictos y, sin duda, una de las mejores profesionales de RRHH con las que he trabajado.`,
    },
  },
  {
    name: 'Alan Resnik',
    role: 'Founder and CRO, Appgrade',
    linkedinUrl: 'https://www.linkedin.com/in/alan-resnik/en/',
    quote: {
      en: `Carla is a very proactive and professional person. She gets involved well beyond recruiting. Working with her is a pleasure, and it's 100% a guarantee of results!`,
      es: `Carla es una persona muy proactiva y profesional. Se involucra más allá del recruiting. Trabajar con ella da gusto y es 100% garantía de resultados.`,
    },
  },
]
