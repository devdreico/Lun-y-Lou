import { Hero } from '../components/home/Hero'
import { CategoriesSection } from '../components/home/CategoriesSection'
import { FeaturedSection, PerksSection } from '../components/home/FeaturedSection'
import { CtaBanner } from '../components/home/CtaBanner'
import { SITE } from '../lib/constants'
import { useSeo } from '../lib/seo'

export function HomePage() {
  useSeo({
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    path: '/',
  })

  return (
    <>
      <Hero />
      <PerksSection />
      <CategoriesSection />
      <FeaturedSection />
      <CtaBanner />
    </>
  )
}
