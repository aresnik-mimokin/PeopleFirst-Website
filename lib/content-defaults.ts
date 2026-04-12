/**
 * Default content values used as fallbacks when Keystatic content files
 * haven't been populated yet. These match the brand copy from the brief.
 */

export const DEFAULTS = {
  seo: {
    siteTitle: 'PeopleFirst Agency — IT & AI Recruiting for Tech Scale-ups',
    siteDescription:
      'Recruiting firm specializing in IT, Data & AI talent for high-growth tech companies in LATAM, USA & Europe. Founded by Carla Costantini.',
    ogImage: '/images/og-default.jpg',
  },
  nav: {
    bookCallUrl: 'https://calendly.com/carla-peoplefirst',
    linkedinUrl: 'https://www.linkedin.com/in/carlacostantini',
  },
  hero: {
    headline: 'Scaling Engineering & AI Teams',
    headlineAccent: 'in LATAM, USA & Europe',
    subheadline:
      'We connect the fastest-growing tech companies with exceptional engineering and AI talent — precisely, efficiently, and at velocity.',
    ctaLabel: 'Book a Call',
    ctaUrl: 'https://calendly.com/carla-peoplefirst',
  },
  problem: {
    title: 'The Friction in Scaling High-Impact Teams',
    subtitle: 'Growing tech companies face three consistent bottlenecks when building engineering teams.',
    cards: [
      {
        title: 'Limited Talent Availability',
        description:
          "Top-tier AI and engineering talent is rare — and heavily competed for. The candidates you need aren't browsing job boards.",
      },
      {
        title: 'Misaligned Technical Depth',
        description:
          "Generic recruiters can't evaluate technical fit. You spend weeks interviewing the wrong profiles, burning your team's time and momentum.",
      },
      {
        title: 'Cost of Slow Velocity',
        description:
          'Every week without the right hire delays product, slows growth, and puts mounting pressure on the rest of your team.',
      },
    ],
  },
  specializations: {
    title: 'What We Recruit For',
    columns: [
      {
        title: 'AI & Data',
        icon: 'brain',
        roles: [
          'ML Engineers',
          'Data Scientists',
          'AI Researchers',
          'Data Engineers',
          'Analytics Engineers',
          'LLM Engineers',
        ],
      },
      {
        title: 'Engineering',
        icon: 'code',
        roles: [
          'Backend Engineers',
          'Full Stack Engineers',
          'Mobile Engineers (iOS/Android)',
          'DevOps / SRE Engineers',
          'Frontend Engineers',
          'Software Architects',
        ],
      },
      {
        title: 'Platform & Backend',
        icon: 'server',
        roles: [
          'Platform Engineers',
          'Infrastructure Architects',
          'Cloud Engineers',
          'Backend Leads',
          'Tech Leads',
          'Engineering Managers',
        ],
      },
    ],
  },
  about: {
    title: 'Founder-Led & Deeply Embedded',
    subtitle: 'Every search is led personally by Carla.',
    bio: 'Carla Costantini founded PeopleFirst with one goal: to bring recruiter-level precision and operator-level business context to technical hiring. With roots in the LATAM tech ecosystem and deep networks across US and European scale-ups, Carla leads every search personally — understanding not just the role, but the team, the product, and the company at the moment it matters most.',
    credentials: [
      '7+ years sourcing engineering & AI talent across LATAM, USA and Europe',
      'Direct networks in LATAM, USA, and European tech ecosystems',
      'Placed engineers and data leaders at Series A to unicorn-stage companies',
      'Every search is founder-led — no handoffs, no junior sourcers',
    ],
  },
  process: {
    title: 'How We Work',
    steps: [
      {
        number: '01',
        title: 'Hiring Manager Alignment',
        description:
          'We go deep on role scope, team dynamics, and culture fit before sourcing a single candidate.',
      },
      {
        number: '02',
        title: 'Proactive Market Hunt',
        description:
          "We don't post and pray. We map the market, identify passive candidates, and craft personalized outreach.",
      },
      {
        number: '03',
        title: 'Attracting the Best Talent',
        description:
          "We sell your company's vision and product — not just the job. Top engineers choose PeopleFirst because we tell your story right.",
      },
    ],
  },
  globalReach: {
    title: 'Global Reach, Regional Depth',
    panels: [
      {
        title: 'Latin America',
        countries: 'Argentina · Colombia · Mexico · Brazil · Chile · Peru',
        description:
          "Deep candidate networks and regional market knowledge across Latin America's most vibrant tech hubs.",
      },
      {
        title: 'Europe & USA',
        countries: 'Spain · Portugal · Germany · Netherlands · UK · USA',
        description:
          'Access to North American and European talent with timezone alignment and strong remote collaboration norms.',
      },
    ],
  },
  clients: {
    title: 'Trusted by Fast-Moving Teams',
    subtitle: 'Companies that move fast trust PeopleFirst to find the talent that keeps them ahead.',
    names: ['Hotel Engine', 'dLocal', 'Joy', 'Stay AI', 'Cargo PartnersX', 'Deepcell', 'Amma'],
  },
  pricing: {
    title: 'Simple, Aligned Pricing',
    subtitle: 'No surprises. No retainers. We succeed when you do.',
    cards: [
      {
        value: '10%',
        title: 'Placement Fee',
        description:
          'Competitive and straightforward — a percentage of first-year base salary upon successful placement.',
        highlight: true,
      },
      {
        value: '$0',
        title: 'Upfront Cost',
        description:
          "No retainer, no payment until your new hire starts. We're aligned with your success from day one.",
        highlight: false,
      },
      {
        value: '30',
        title: 'Day Guarantee',
        description:
          "If your hire doesn't work out in the first 30 days, we'll find a replacement at no additional charge.",
        highlight: false,
      },
      {
        value: '12mo',
        title: 'Relationship View',
        description:
          "We don't disappear after placement. We check in regularly and build long-term partnerships with the companies we serve.",
        highlight: false,
      },
    ],
  },
  contact: {
    title: "Let's Talk Talent",
    subtitle:
      "Tell us about the role you're hiring for. We'll get back to you within one business day.",
    email: 'carla@wearepeoplefirst.com',
    phone: '+54 9 11 XXXX-XXXX',
    linkedinUrl: 'https://www.linkedin.com/in/carlacostantini',
  },
}
