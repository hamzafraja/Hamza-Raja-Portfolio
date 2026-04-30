import { Analytics } from "@vercel/analytics/react"
import { NavHeader } from "./components/ui/nav-header"
import { Hero } from "./components/ui/animated-hero"
import { LogosSlider } from "./components/logos-slider"
import { Problem } from "./components/problem"
import { Solution } from "./components/solution"
import { Services } from "./components/services"
import { About } from "./components/about"
import { Portfolio } from "./components/portfolio"
import { CaseStudies } from "./components/case-studies"
import { TestimonialsSection } from "./components/ui/testimonials-section"
import { Contact } from "./components/contact"
import { MinimalFooter } from "./components/ui/minimal-footer"

function App() {
  return (
    <>
      <NavHeader />
      <main className="min-h-screen bg-background">
        <Hero />
        <LogosSlider />
        <Problem />
        <Solution />
        <Services />
        <About />
        <Portfolio />
        <LogosSlider />
        <CaseStudies />
        <TestimonialsSection />
        <Contact />
      </main>
      <MinimalFooter />
      <Analytics />
    </>
  )
}

export default App
