"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, X, ChevronLeft, ChevronRight, BookOpen, ArrowUpRight, Sparkles } from "lucide-react"

export interface GalleryItem {
  _id?: string
  src: string
  alt: string
  caption: string
  location: string
  aspect: string
  tip?: string
  guideQuote?: string
}

const FALLBACK_ITEMS: GalleryItem[] = [
  {
    src: `/images/gallery/sensory-running.jpg`,
    alt: "Runner on a scenic natural trail taking a mindful stride",
    caption: "A Sensory Journey",
    location: "Mindful Running",
    aspect: "aspect-[3/4]",
    tip: "Engage all your senses—tune into foot strike rhythm, terrain texture, and steady breathing to run with total presence.",
    guideQuote: "Running is a holistic experience that engages all your senses. Feel the varied textures of the earth beneath your feet, from forest trails to city sidewalks, and tune into the rhythmic symphony of your breath.",
  },
  {
    src: `/images/gallery/walk-run-intervals.jpg`,
    alt: "Runner enjoying early morning run-walk intervals in sunrise light",
    caption: "Walk Before You Run",
    location: "Pacing & Adaptation",
    aspect: "aspect-[4/3]",
    tip: "Start with brisk walking, then introduce intervals: 1 minute gentle jogging followed by 2 minutes walking.",
    guideQuote: "Starting slow reduces injury risk and allows muscles, joints, and cardiovascular capacity to adapt progressively. Walk-run intervals build endurance steadily while keeping every session enjoyable.",
  },
  {
    src: `/images/gallery/talk-test-pace.jpg`,
    alt: "Runners pacing comfortably side-by-side in natural conversation",
    caption: "The 'Talk Test'",
    location: "Aerobic Base",
    aspect: "aspect-square",
    tip: "You should be able to hold a full conversation while running. If you are gasping, ease your speed into an aerobic rhythm.",
    guideQuote: "Every runner has a unique pace where they feel comfortable. The 'Talk Test' ensures you are running at an aerobic pace—sustainable, comfortable, and foundational for building long-term stamina.",
  },
  {
    src: `/images/gallery/posture-form.jpg`,
    alt: "Athletic runner demonstrating tall posture and relaxed arm carriage",
    caption: "Run Tall & Relaxed",
    location: "Form & Biomechanics",
    aspect: "aspect-[3/4]",
    tip: "Keep shoulders soft, gaze forward, arms swinging at 90°, and land lightly under your center of gravity.",
    guideQuote: "Body awareness is key: maintain upright posture without stiffness, relax your shoulders away from your ears, and avoid overstriding by keeping your cadence quick and light.",
  },
  {
    src: `/images/gallery/ten-percent-rule.jpg`,
    alt: "Running shoes on pavement prepared for a disciplined training progression",
    caption: "The 10% Rule",
    location: "Injury Prevention",
    aspect: "aspect-[4/3]",
    tip: "Never increase weekly distance or training volume by more than 10% to protect tendons and connective tissue.",
    guideQuote: "A widely accepted guideline in running: increase weekly distance by no more than 10%. Disciplined, gradual progression avoids overuse injuries and allows your body to adapt sustainably.",
  },
  {
    src: `/images/gallery/active-recovery.jpg`,
    alt: "Runner doing restorative mobility and mindful stretching after a run",
    caption: "Rest Is Part of Training",
    location: "Rest & Recovery",
    aspect: "aspect-square",
    tip: "Differentiate healthy fatigue from sharp warning pain. Balance runs with active recovery, mobility, and deep sleep.",
    guideQuote: "Rest days allow muscles to rebuild and grow stronger. Incorporate active recovery like gentle walking and stretching, and remember that adequate sleep and nutrition are true pillars of recovery.",
  },
]

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/gallery`)
        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            setItems(data)
            setLoading(false)
            return
          }
        }
        setItems(FALLBACK_ITEMS)
      } catch {
        setItems(FALLBACK_ITEMS)
      } finally {
        setLoading(false)
      }
    }
    fetchGallery()
  }, [])

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItemIndex === null) return
      if (e.key === "Escape") {
        setSelectedItemIndex(null)
      } else if (e.key === "ArrowLeft") {
        setSelectedItemIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : items.length - 1))
      } else if (e.key === "ArrowRight") {
        setSelectedItemIndex((prev) => (prev !== null && prev < items.length - 1 ? prev + 1 : 0))
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItemIndex, items.length])

  const activeItem = selectedItemIndex !== null ? items[selectedItemIndex] : null

  return (
    <section id="gallery" className="relative w-full bg-[#E8E4DD] py-24 md:py-36">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-[#6B8F63] animate-pulse" />
              <p className="text-[11px] tracking-[0.25em] text-[#1A1A1A]/50 uppercase font-semibold">
                Beginner Running & Form Guide
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
              Run Smarter: Sensory & Form
            </h2>
            <p className="mt-4 text-[14px] sm:text-[15px] text-[#1A1A1A]/65 font-light leading-[1.7]">
              Essential principles to discover your sustainable pace, run injury-free, and enjoy every mile—grounded in holistic insights from the <span className="font-medium text-[#1A1A1A]">Oax Sport Beginner&apos;s Running Guide</span>.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
            <a
              href="https://oaxsport.org/beginners-running-guide/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#1A1A1A]/20 bg-white/70 px-4 py-2.5 text-[12px] font-medium text-[#1A1A1A] shadow-xs backdrop-blur-sm transition-all hover:bg-[#1A1A1A] hover:text-white group"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#6B8F63] group-hover:text-white transition-colors" />
              <span>Full Oax Sport Guide</span>
              <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
            </a>
            <p className="text-[11px] text-[#1A1A1A]/40 uppercase tracking-widest">
              Click any photo to explore tips
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px w-full bg-[#1A1A1A]/15 mb-10" />

        {/* Photo Grid — Asymmetric Magazine Layout */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5 min-h-[400px]">
          {loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="aspect-[4/3] bg-[#1A1A1A]/5 rounded-xl animate-pulse mb-5 break-inside-avoid" />
            ))
          ) : (
            items.map((item, idx) => (
              <motion.div
                key={item._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                onClick={() => setSelectedItemIndex(idx)}
                className="group relative break-inside-avoid overflow-hidden rounded-xl bg-[#1A1A1A] cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Image */}
                <div className={`${item.aspect} overflow-hidden relative`}>
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04] filter contrast-[1.02] saturate-[0.95]"
                  />

                  {/* Gradient Overlay for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-300" />

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] tracking-wider uppercase font-semibold text-white/90 backdrop-blur-md border border-white/10">
                      <Sparkles className="h-2.5 w-2.5 text-[#A3C19C]" />
                      {item.location}
                    </span>
                  </div>

                  {/* Bottom Content Layer */}
                  <div className="absolute inset-x-0 bottom-0 p-5 z-10 flex flex-col justify-end">
                    <h3 className="font-[family-name:var(--font-serif)] text-white text-xl sm:text-2xl leading-tight tracking-tight drop-shadow-xs">
                      {item.caption}
                    </h3>

                    {/* Tip preview */}
                    <p className="mt-2 text-[12px] sm:text-[13px] text-white/80 font-light leading-relaxed line-clamp-2 drop-shadow-xs">
                      {item.tip || item.alt}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-[#A3C19C] font-medium pt-2 border-t border-white/15">
                      <span className="flex items-center gap-1">
                        Read Form Tip <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <span className="text-white/40 text-[10px] uppercase tracking-wider">
                        Tap to expand
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Expanded Modal Lightbox */}
      <AnimatePresence>
        {activeItem && selectedItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItemIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 md:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#F5F3EF] shadow-2xl border border-white/20 text-[#1A1A1A] flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItemIndex(null)}
                aria-label="Close dialog"
                className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-black/75 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Left Side: Photo */}
              <div className="md:w-1/2 relative min-h-[260px] md:min-h-full bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="w-full h-full object-cover max-h-[50vh] md:max-h-[80vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
              </div>

              {/* Right Side: Editorial Guide Content */}
              <div className="md:w-1/2 p-6 sm:p-8 md:p-10 overflow-y-auto flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#6B8F63]/15 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase text-[#476641]">
                      <Sparkles className="h-3 w-3" />
                      {activeItem.location}
                    </span>
                    <span className="text-[11px] text-[#1A1A1A]/40 font-mono">
                      0{selectedItemIndex + 1} / 0{items.length}
                    </span>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-serif)] text-2xl sm:text-3xl md:text-4xl leading-tight text-[#1A1A1A]">
                    {activeItem.caption}
                  </h3>

                  <div className="mt-4 h-px w-12 bg-[#1A1A1A]/20" />

                  {/* Actionable coaching tip */}
                  <div className="mt-5 rounded-xl bg-[#E8E4DD] p-4 border border-[#1A1A1A]/10">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A]/50 mb-1">
                      Actionable Form Tip
                    </p>
                    <p className="text-[13px] sm:text-[14px] text-[#1A1A1A] font-medium leading-relaxed">
                      {activeItem.tip || activeItem.alt}
                    </p>
                  </div>

                  {/* Oax Sport Holistic Guide Note */}
                  {activeItem.guideQuote && (
                    <div className="mt-5 space-y-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#1A1A1A]/50">
                        Oax Sport Guide Insight
                      </p>
                      <blockquote className="text-[13px] sm:text-[14px] text-[#1A1A1A]/75 font-light leading-relaxed italic border-l-2 border-[#6B8F63] pl-3">
                        &ldquo;{activeItem.guideQuote}&rdquo;
                      </blockquote>
                    </div>
                  )}
                </div>

                {/* Footer Controls & Link */}
                <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Prev/Next Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setSelectedItemIndex((prev) =>
                          prev !== null && prev > 0 ? prev - 1 : items.length - 1
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1A1A1A]/20 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                      title="Previous tip"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setSelectedItemIndex((prev) =>
                          prev !== null && prev < items.length - 1 ? prev + 1 : 0
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#1A1A1A]/20 transition-colors hover:bg-[#1A1A1A] hover:text-white"
                      title="Next tip"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                    <span className="text-[11px] text-[#1A1A1A]/40 ml-2">
                      Use Arrow Keys
                    </span>
                  </div>

                  {/* Guide Link */}
                  <a
                    href="https://oaxsport.org/beginners-running-guide/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#476641] hover:underline"
                  >
                    <span>Read in Oax Sport</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}


