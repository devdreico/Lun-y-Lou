import { Hero } from '../components/home/Hero'
import { CategoriesSection } from '../components/home/CategoriesSection'
import { FeaturedSection, PerksSection } from '../components/home/FeaturedSection'
import { CtaBanner } from '../components/home/CtaBanner'

export function HomePage() {
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
