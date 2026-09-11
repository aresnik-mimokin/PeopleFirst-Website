import { Fragment } from 'react'
import type { Key, ReactNode } from 'react'

/**
 * Minimal, hook-free renderer for the Keystatic document AST (Slate-based).
 * Runs safely in a Server Component during static export and is styled by the
 * surrounding `.prose-pf` container. Unknown node types fall back to their
 * children so nothing is silently dropped.
 */

type Node = Record<string, any>

function renderText(node: Node, key: Key): ReactNode {
  let el: ReactNode = node.text
  if (el === '') return null
  if (node.code) el = <code>{el}</code>
  if (node.strikethrough) el = <s>{el}</s>
  if (node.underline) el = <u>{el}</u>
  if (node.italic) el = <em>{el}</em>
  if (node.bold) el = <strong>{el}</strong>
  return <Fragment key={key}>{el}</Fragment>
}

function renderChildren(children: Node[] = []): ReactNode {
  return children.map((child, i) => renderNode(child, i))
}

function renderNode(node: Node, key: Key): ReactNode {
  if (node == null) return null
  if (typeof node.text === 'string') return renderText(node, key)

  const children = renderChildren(node.children)

  switch (node.type) {
    case 'paragraph':
      return <p key={key}>{children}</p>
    case 'heading': {
      const level = Math.min(Math.max(Number(node.level) || 2, 2), 4)
      const Tag = `h${level}` as 'h2' | 'h3' | 'h4'
      return <Tag key={key}>{children}</Tag>
    }
    case 'blockquote':
      return <blockquote key={key}>{children}</blockquote>
    case 'unordered-list':
      return <ul key={key}>{children}</ul>
    case 'ordered-list':
      return <ol key={key}>{children}</ol>
    case 'list-item':
      return <li key={key}>{children}</li>
    case 'list-item-content':
      return <Fragment key={key}>{children}</Fragment>
    case 'divider':
      return <hr key={key} />
    case 'code':
      return (
        <pre key={key}>
          <code>{children}</code>
        </pre>
      )
    case 'link': {
      const external = typeof node.href === 'string' && node.href.startsWith('http')
      return (
        <a
          key={key}
          href={node.href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {children}
        </a>
      )
    }
    case 'image': {
      const src = typeof node.src === 'string' ? node.src : node.src?.src
      // eslint-disable-next-line @next/next/no-img-element -- in-body images have arbitrary dimensions; next/image needs known width/height
      return src ? <img key={key} src={src} alt={node.alt ?? ''} title={node.title || undefined} /> : null
    }
    default:
      return <Fragment key={key}>{children}</Fragment>
  }
}

export function DocRenderer({ document }: { document: readonly Node[] }) {
  return <>{(document ?? []).map((node, i) => renderNode(node, i))}</>
}
