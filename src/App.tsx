import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/ui/Navbar"
import Hero from "@/components/ui/hero"
import AboutSection from "@/components/ui/AboutSection"
import ScheduleSection from "@/components/ui/ScheduleSection"
import GallerySection from "@/components/ui/GallerySection"
import ContactSection from "@/components/ui/ContactSection"
import Footer from "@/components/ui/Footer"

function PublicSite() {
  return (
    <div className="relative min-h-screen w-full bg-[#E8E4DD] text-[#1A1A1A] selection:bg-[#A3C19C] selection:text-[#1A1A1A]">
      {/* Accessibility: Skip to Content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-[#1A1A1A] focus:px-4 focus:py-2 focus:text-xs focus:font-bold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Fixed Navigation Bar */}
      <Navbar />

      {/* Main Page Content Flow */}
      <main id="main-content" className="w-full">
        <Hero />
        <AboutSection />
        <ScheduleSection />
        <GallerySection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <PublicSite />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}


