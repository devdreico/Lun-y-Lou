import { useEffect } from 'react'
import { SITE, absoluteUrl } from './constants'
import { heroSrc } from '../data/heroSlides'

/** Imagen por defecto para compartir en redes (foto editorial del hero). */
export const DEFAULT_OG_IMAGE = heroSrc(7216285, 1200)

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export interface SeoOptions {
  title: string
  description?: string
  /** Ruta relativa para canonical/og:url (ej. `/producto/mascara`). */
  path?: string
  image?: string
  noindex?: boolean
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Metatags por ruta: title, description, canonical, Open Graph,
 * Twitter Card, robots y JSON-LD (si se provee).
 */
export function useSeo({
  title,
  description = SITE.description,
  path,
  image,
  noindex = false,
  jsonLd,
}: SeoOptions) {
  const jsonLdJson = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    const pathname = path ?? window.location.pathname
    const ogImage = image ?? DEFAULT_OG_IMAGE

    document.title = title
    setMeta('name', 'description', description)
    setCanonical(absoluteUrl(pathname))

    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', absoluteUrl(pathname))
    setMeta('property', 'og:image', ogImage)
    setMeta('property', 'og:site_name', SITE.name)
    setMeta('property', 'og:type', 'website')

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImage)

    setMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

    let script: HTMLScriptElement | null = null
    if (jsonLdJson) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'route-jsonld'
      script.textContent = jsonLdJson
      document.head.appendChild(script)
    }
    return () => {
      script?.remove()
    }
  }, [title, description, path, image, noindex, jsonLdJson])
}

/** JSON-LD de migas de pan. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
