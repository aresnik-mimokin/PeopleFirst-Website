import { config, fields, singleton, collection } from '@keystatic/core'

export default config({
  // In production the CMS uses GitHub storage (login + commit to the repo).
  // The gate is NODE_ENV because it is inlined into the client bundle — the
  // admin UI needs to know it is in GitHub mode to show the login. The OAuth
  // secrets (CLIENT_ID / CLIENT_SECRET / KEYSTATIC_SECRET) are read only by the
  // server-side API route, never exposed to the browser. Local dev uses the
  // local filesystem so you can edit content without GitHub.
  storage:
    process.env.NODE_ENV === 'production'
      ? {
          kind: 'github',
          repo: {
            owner: process.env.KEYSTATIC_GITHUB_REPO_OWNER ?? 'aresnik-mimokin',
            name: process.env.KEYSTATIC_GITHUB_REPO_NAME ?? 'PeopleFirst-Website',
          },
        }
      : { kind: 'local' },

  ui: {
    brand: {
      name: 'PeopleFirst CMS',
    },
  },

  singletons: {
    siteContent: singleton({
      label: 'Site Content',
      path: 'content/site/',
      schema: {
        // ─── SEO ────────────────────────────────────────────────
        seo: fields.object({
          siteTitle: fields.text({ label: 'Site Title', defaultValue: 'PeopleFirst Agency' }),
          siteDescription: fields.text({
            label: 'Site Description',
            multiline: true,
            defaultValue:
              'Recruiting firm specializing in IT, Data & AI talent for high-growth tech companies in LATAM, USA & Europe.',
          }),
          ogImage: fields.image({
            label: 'OG Image',
            directory: 'public/images',
            publicPath: '/images',
          }),
        }),

        // ─── NAV ─────────────────────────────────────────────────
        nav: fields.object({
          bookCallUrl: fields.url({
            label: 'Book a Call URL (Calendly)',
            defaultValue: 'https://calendly.com/carla-peoplefirst',
          }),
          linkedinUrl: fields.url({
            label: 'LinkedIn URL',
            defaultValue: 'https://linkedin.com/in/carlacostantini',
          }),
        }),

        // ─── HERO ────────────────────────────────────────────────
        hero: fields.object({
          headline: fields.text({
            label: 'Headline',
            defaultValue: 'Scaling Engineering & AI Teams',
          }),
          headlineAccent: fields.text({
            label: 'Headline Accent',
            defaultValue: 'in LATAM, USA & Europe',
          }),
          subheadline: fields.text({
            label: 'Subheadline',
            multiline: true,
            defaultValue:
              'We connect the fastest-growing tech companies with exceptional engineering and AI talent — precisely, efficiently, and at velocity.',
          }),
          ctaLabel: fields.text({ label: 'CTA Button Label', defaultValue: 'Book a Call' }),
          ctaUrl: fields.url({
            label: 'CTA URL',
            defaultValue: 'https://calendly.com/carla-peoplefirst',
          }),
        }),

        // ─── PROBLEM ─────────────────────────────────────────────
        problem: fields.object({
          title: fields.text({
            label: 'Section Title',
            defaultValue: 'The Friction in Scaling High-Impact Teams',
          }),
          subtitle: fields.text({
            label: 'Section Subtitle',
            multiline: true,
            defaultValue:
              'Growing tech companies face three consistent bottlenecks when building engineering teams.',
          }),
          card1Title: fields.text({
            label: 'Card 1 Title',
            defaultValue: 'Limited Talent Availability',
          }),
          card1Description: fields.text({
            label: 'Card 1 Description',
            multiline: true,
            defaultValue:
              "Top-tier AI and engineering talent is rare — and heavily competed for. The candidates you need aren't browsing job boards.",
          }),
          card2Title: fields.text({
            label: 'Card 2 Title',
            defaultValue: 'Misaligned Technical Depth',
          }),
          card2Description: fields.text({
            label: 'Card 2 Description',
            multiline: true,
            defaultValue:
              "Generic recruiters can't evaluate technical fit. You spend weeks interviewing the wrong profiles, burning your team's time and momentum.",
          }),
          card3Title: fields.text({ label: 'Card 3 Title', defaultValue: 'Cost of Slow Velocity' }),
          card3Description: fields.text({
            label: 'Card 3 Description',
            multiline: true,
            defaultValue:
              'Every week without the right hire delays product, slows growth, and puts mounting pressure on the rest of your team.',
          }),
        }),

        // ─── SPECIALIZATIONS ─────────────────────────────────────
        specializations: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: 'What We Recruit For' }),
          col1Title: fields.text({ label: 'Column 1 Title', defaultValue: 'AI & Data' }),
          col1Roles: fields.text({
            label: 'Column 1 Roles (one per line)',
            multiline: true,
            defaultValue:
              'ML Engineers\nData Scientists\nAI Researchers\nData Engineers\nAnalytics Engineers\nLLM Engineers',
          }),
          col2Title: fields.text({ label: 'Column 2 Title', defaultValue: 'Engineering' }),
          col2Roles: fields.text({
            label: 'Column 2 Roles (one per line)',
            multiline: true,
            defaultValue:
              'Backend Engineers\nFull Stack Engineers\nMobile Engineers (iOS/Android)\nDevOps / SRE Engineers\nFrontend Engineers\nSoftware Architects',
          }),
          col3Title: fields.text({ label: 'Column 3 Title', defaultValue: 'Platform & Backend' }),
          col3Roles: fields.text({
            label: 'Column 3 Roles (one per line)',
            multiline: true,
            defaultValue:
              'Platform Engineers\nInfrastructure Architects\nCloud Engineers\nBackend Leads\nTech Leads\nEngineering Managers',
          }),
        }),

        // ─── ABOUT ───────────────────────────────────────────────
        about: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: 'Founder-Led & Deeply Embedded' }),
          subtitle: fields.text({
            label: 'Section Subtitle',
            defaultValue: 'Every search is led personally by Carla.',
          }),
          bio: fields.document({
            label: 'Carla Bio',
            formatting: true,
          }),
          photo: fields.image({
            label: 'Carla Photo',
            directory: 'public/images',
            publicPath: '/images',
          }),
          credential1: fields.text({
            label: 'Credential 1',
            defaultValue: '7+ years sourcing engineering & AI talent across LATAM, USA and Europe',
          }),
          credential2: fields.text({
            label: 'Credential 2',
            defaultValue: 'Direct networks in LATAM, USA, and European tech ecosystems',
          }),
          credential3: fields.text({
            label: 'Credential 3',
            defaultValue:
              'Placed engineers and data leaders at Series A to unicorn-stage companies',
          }),
          credential4: fields.text({
            label: 'Credential 4',
            defaultValue: 'Every search is founder-led — no handoffs, no junior sourcers',
          }),
        }),

        // ─── PROCESS ─────────────────────────────────────────────
        process: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: 'How We Work' }),
          step1Title: fields.text({
            label: 'Step 1 Title',
            defaultValue: 'Hiring Manager Alignment',
          }),
          step1Description: fields.text({
            label: 'Step 1 Description',
            multiline: true,
            defaultValue:
              'We go deep on role scope, team dynamics, and culture fit before sourcing a single candidate.',
          }),
          step2Title: fields.text({ label: 'Step 2 Title', defaultValue: 'Proactive Market Hunt' }),
          step2Description: fields.text({
            label: 'Step 2 Description',
            multiline: true,
            defaultValue:
              "We don't post and pray. We map the market, identify passive candidates, and craft personalized outreach.",
          }),
          step3Title: fields.text({
            label: 'Step 3 Title',
            defaultValue: 'Attracting the Best Talent',
          }),
          step3Description: fields.text({
            label: 'Step 3 Description',
            multiline: true,
            defaultValue:
              "We sell your company's vision and product — not just the job. Top engineers choose PeopleFirst because we tell your story right.",
          }),
        }),

        // ─── GLOBAL REACH ────────────────────────────────────────
        globalReach: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: 'Global Reach, Regional Depth' }),
          latamTitle: fields.text({ label: 'LATAM Panel Title', defaultValue: 'Latin America' }),
          latamCountries: fields.text({
            label: 'LATAM Countries',
            defaultValue: 'Argentina · Colombia · Mexico · Brazil · Chile · Peru',
          }),
          latamDescription: fields.text({
            label: 'LATAM Description',
            multiline: true,
            defaultValue:
              "Deep candidate networks and regional market knowledge across Latin America's most vibrant tech hubs.",
          }),
          europeTitle: fields.text({ label: 'Europe Panel Title', defaultValue: 'Europe & USA' }),
          europeCountries: fields.text({
            label: 'Europe & USA Countries',
            defaultValue: 'Spain · Portugal · Germany · Netherlands · UK · USA',
          }),
          europeDescription: fields.text({
            label: 'Europe & USA Description',
            multiline: true,
            defaultValue:
              'Access to North American and European talent with timezone alignment and strong remote collaboration norms.',
          }),
        }),

        // ─── CLIENTS ─────────────────────────────────────────────
        clients: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: 'Trusted by Fast-Moving Teams' }),
          subtitle: fields.text({
            label: 'Section Subtitle',
            defaultValue: "Companies that move fast trust PeopleFirst to find the talent that keeps them ahead.",
          }),
          clientList: fields.text({
            label: 'Client Names (one per line)',
            multiline: true,
            defaultValue:
              'Hotel Engine\ndLocal\nJoy\nStay AI\nCargo PartnersX\nDeepcell\nAmma',
          }),
        }),

        // ─── CONTACT ─────────────────────────────────────────────
        contact: fields.object({
          title: fields.text({ label: 'Section Title', defaultValue: "Let's Talk Talent" }),
          subtitle: fields.text({
            label: 'Section Subtitle',
            multiline: true,
            defaultValue:
              "Tell us about the role you're hiring for. We'll get back to you within one business day.",
          }),
          email: fields.text({ label: 'Contact Email', defaultValue: 'carla@wearepeoplefirst.com' }),
          phone: fields.text({ label: 'Contact Phone', defaultValue: '+54 9 11 XXXX-XXXX' }),
          linkedinUrl: fields.url({
            label: 'LinkedIn URL',
            defaultValue: 'https://linkedin.com/in/carlacostantini',
          }),
        }),
      },
    }),
  },

  collections: {
    posts: collection({
      label: 'Blog Posts',
      path: 'content/posts/*',
      slugField: 'title',
      columns: ['title', 'publishedDate'],
      schema: {
        // Each post is bilingual: fill the English and Spanish fields and the
        // site shows the version matching the reader's selected language. If a
        // language is left empty, the other language is shown as a fallback.
        title: fields.slug({
          name: { label: 'Title (English)' },
          slug: {
            label: 'URL slug',
            description: 'The path segment for this post, e.g. /blog/your-slug',
          },
        }),
        titleEs: fields.text({ label: 'Título (Español)' }),
        publishedDate: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        author: fields.text({ label: 'Author', defaultValue: 'Carla Costantini' }),
        excerpt: fields.text({
          label: 'Excerpt (English)',
          description: 'Short summary shown in cards and previews (1–2 sentences).',
          multiline: true,
        }),
        excerptEs: fields.text({
          label: 'Extracto (Español)',
          description: 'Resumen corto para las tarjetas y vistas previas (1–2 frases).',
          multiline: true,
        }),
        coverImage: fields.image({
          label: 'Cover image',
          directory: 'public/images/blog',
          publicPath: '/images/blog',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value ?? 'Tag',
        }),
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Draft posts are hidden from the live site.',
          defaultValue: false,
        }),
        content: fields.text({
          label: 'Content — English (Markdown)',
          description:
            'The article body in English. Supports Markdown: ## Heading, **bold**, *italic*, [link](url), - lists, > quotes.',
          multiline: true,
        }),
        contentEs: fields.text({
          label: 'Contenido — Español (Markdown)',
          description:
            'El cuerpo del artículo en español. Soporta Markdown: ## Título, **negrita**, *cursiva*, [enlace](url), - listas, > citas.',
          multiline: true,
        }),
      },
    }),
  },
})
