# Blog — Guía de uso y configuración

El sitio de PeopleFirst tiene un blog con dos partes:

1. **La parte pública** — la sección "Blog" en la home, el listado en `/blog` y
   cada nota en `/blog/<slug>`. Ya funciona: lee las notas que viven en el repo
   (`content/posts/`) y las publica automáticamente en cada deploy.
2. **La plataforma de escritura** — **Keystatic**, el CMS que ya viene integrado
   en `/keystatic`. Ahí una persona entra, se loguea con GitHub, escribe la nota
   y la publica. Al guardar, Keystatic hace un commit al repo → Netlify
   redeploya → la nota aparece en la web.

---

## 1. Cómo se escribe una nota (flujo de Carla)

1. Entrar a **`https://wearepeoplefirst.com/keystatic`**.
2. Hacer clic en **"Log in with GitHub"** y autorizar.
3. Ir a **Blog Posts → +** (nueva entrada) y completar. **Cada nota es
   bilingüe**: se cargan los campos en inglés y en español, y el sitio muestra
   la versión del idioma que el visitante tenga elegido (el botón de idioma).
   Si un idioma se deja vacío, se muestra el otro como respaldo.
   - **Title (English)** — título en inglés (define la URL, ej. `/blog/mi-nota`).
   - **Título (Español)** — título en español.
   - **Published date** — fecha de publicación.
   - **Author** — autor (por defecto Carla Costantini).
   - **Excerpt (English)** / **Extracto (Español)** — resumen corto (1–2 frases)
     que se ve en las tarjetas, en cada idioma.
   - **Cover image** — imagen de portada (opcional; si no hay, se usa un
     degradado). Se guarda en `public/images/blog/`.
   - **Tags** — etiquetas (opcional).
   - **Draft** — si está tildado, la nota **no** se ve en el sitio (borrador).
   - **Content — English (Markdown)** / **Contenido — Español (Markdown)** — el
     cuerpo de la nota en cada idioma, escrito en **Markdown** (ver el
     mini-machete abajo).
4. **Save** (o **Create**). Keystatic commitea al repo y Netlify redeploya solo.
   En 1–3 minutos la nota está online.

### Mini-machete de Markdown (para el cuerpo)

```
## Título de sección        → subtítulo grande
### Subtítulo                → subtítulo más chico
**texto en negrita**         → negrita
*texto en cursiva*           → cursiva
- item                        → lista con viñetas (una por línea)
1. item                       → lista numerada
> Una cita                    → cita destacada
[texto del link](https://…)  → enlace
---                           → línea divisoria
```

> **Nota sobre bilingüe:** cada nota vive en **una sola entrada** con los dos
> idiomas. Para que aparezca traducida en ambos, hay que completar los campos
> de inglés **y** de español. Si solo se completa uno, la nota igual se ve (usa
> ese idioma como respaldo en ambos toggles). El cuerpo se escribe en Markdown
> (no es un editor tipo Word); si preferís un editor visual, avisá y lo vemos.

> Para **editar** una nota existente: `/keystatic` → Blog Posts → elegir la nota
> → editar → Save. Para **despublicar** sin borrar: tildar **Draft**. Para
> **borrar**: botón de eliminar dentro de la nota.

---

## 2. Cómo encender el modo GitHub (una sola vez)

El login con GitHub necesita una **GitHub App** y unas **variables de entorno**.
Mientras no estén cargadas, `/keystatic` funciona en "modo local" (solo para
probar en una compu, sin login). Estos pasos lo dejan andando en producción.

### Paso 1 — Generar un secreto

En cualquier terminal:

```bash
openssl rand -hex 32
```

Guardá ese valor: es el `KEYSTATIC_SECRET`.

### Paso 2 — Crear la GitHub App

1. Ir a **https://github.com/settings/apps** → **New GitHub App**.
2. Completar:
   - **GitHub App name**: `PeopleFirst CMS` (o el que quieras).
   - **Homepage URL**: `https://wearepeoplefirst.com`
   - **Callback URL**:
     `https://wearepeoplefirst.com/api/keystatic/github/oauth/callback`
   - Tildar **"Request user authorization (OAuth) during installation"**.
   - **Webhook**: destildar "Active" (no hace falta).
   - **Permissions → Repository**:
     - **Contents**: Read & write
     - **Pull requests**: Read & write
     - **Metadata**: Read-only (viene por defecto)
   - **Where can this GitHub App be installed?**: "Only on this account".
3. **Create GitHub App**.
4. En la página de la app, anotar el **Client ID**, y **Generate a new client
   secret** → anotar el **Client secret**.
5. En el menú lateral **Install App** → instalarla en el repo
   `aresnik-mimokin/PeopleFirst-Website`.

### Paso 3 — Cargar las variables en Netlify

En Netlify: **Site settings → Environment variables → Add**, y agregar:

| Variable | Valor |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | el Client ID de la app |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | el Client secret de la app |
| `KEYSTATIC_SECRET` | el random del Paso 1 |
| `KEYSTATIC_GITHUB_REPO_OWNER` | `aresnik-mimokin` |
| `KEYSTATIC_GITHUB_REPO_NAME` | `PeopleFirst-Website` |

### Paso 4 — Redeploy

Disparar un nuevo deploy en Netlify (o pushear cualquier cambio). Listo:
`/keystatic` ahora pide login con GitHub y publica al repo.

> **Quién puede escribir:** cualquier persona con acceso de escritura al repo en
> GitHub. Para que Carla pueda publicar, su usuario de GitHub tiene que estar
> como **colaborador** del repo `PeopleFirst-Website` (Settings → Collaborators).

---

## 3. Cómo funciona por dentro (para devs)

- **Config del CMS**: `keystatic.config.ts` → `collections.posts`. El storage es
  `github` cuando existen las env vars de arriba; si no, cae a `local`.
- **Formato de las notas**: archivos `content/posts/<slug>.yaml` con todos los
  campos, incluidos los dos cuerpos (`content` en inglés y `contentEs` en
  español) como texto Markdown. Es bilingüe en una sola entrada.
- **Lectura**: `lib/posts.ts` usa el reader de Keystatic
  (`@keystatic/core/reader`) para traer las notas publicadas (excluye borradores,
  ordena por fecha desc).
- **Selección de idioma**: `lib/blog-i18n.ts` elige título/extracto/cuerpo según
  el idioma activo, con respaldo al otro idioma si falta.
- **Render del cuerpo**: `components/blog/PostBody.tsx` renderiza el Markdown con
  `react-markdown` del lado del cliente, para que cambie al togglear el idioma.
- **Rutas**: `app/blog/page.tsx` (listado) y `app/blog/[slug]/page.tsx` (nota,
  con `generateStaticParams` + metadata SEO). El sitemap (`app/sitemap.ts`)
  incluye automáticamente todas las notas.

Para desarrollar localmente: `npm run dev` y entrar a `http://localhost:3000/blog`
o `http://localhost:3000/keystatic` (modo local, escribe archivos en el repo).
