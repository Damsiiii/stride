"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Runs", href: "#runs" },
    { label: "Tips & Form", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ]

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#E8E4DD]/90 backdrop-blur-md shadow-[0_1px_10px_rgba(26,26,26,0.06)]"
          : "bg-[#E8E4DD] shadow-[0_1px_0_rgba(26,26,26,0.1)]"
      }`}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Left: Clean Text Logo */}
        <a
          href="#"
          className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3C19C] rounded-sm transition-opacity hover:opacity-70"
        >
          <span className="text-[15px] md:text-[17px] font-semibold tracking-[0.08em] uppercase text-[#1A1A1A]">
            thestride
          </span>
          <span className="text-[15px] md:text-[17px] font-light tracking-[0.08em] uppercase text-[#1A1A1A]/60">
            club
          </span>
        </a>

        {/* Center / Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleLinkClick(link.href)
              }}
              className="group relative py-1 text-[13px] font-medium tracking-[0.04em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors duration-300"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#1A1A1A] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right: CTA + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#join"
            onClick={(e) => {
              e.preventDefault()
              handleLinkClick("#join")
            }}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white hover:bg-[#333] active:scale-95 px-6 py-2.5 text-[12px] font-semibold tracking-[0.06em] uppercase transition-all duration-300 cursor-pointer"
          >
            <span>Join Us</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#1A1A1A]/10 active:scale-90 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 z-40 flex flex-col bg-[#E8E4DD] px-8 py-12 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className="group flex items-center justify-between py-5 text-3xl font-light tracking-tight text-[#1A1A1A] transition-colors hover:text-[#A3C19C] border-b border-[#1A1A1A]/10"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#A3C19C]" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.25 }}
              className="mt-auto pt-8"
            >
              <a
                href="#join"
                onClick={(e) => {
                  e.preventDefault()
                  handleLinkClick("#join")
                }}
                className="flex items-center justify-center gap-2 rounded-full bg-[#1A1A1A] py-4 text-[13px] font-semibold tracking-[0.08em] text-white uppercase active:scale-[0.98] transition-transform cursor-pointer"
              >
                <span>Join the Club</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <p className="mt-6 text-center text-[11px] tracking-wider text-[#1A1A1A]/40">
                Kurunegala, Sri Lanka · Est. 2023
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
