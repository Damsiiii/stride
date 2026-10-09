"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Compass, Timer, Sunrise, Sunset, ArrowRight } from "lucide-react"

interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
  formattedTarget: string
}

function getNextOccurrence(targetDayOfWeek: number, targetHour: number, targetMinute = 0): Date {
  const now = new Date()
  const target = new Date(now)
  target.setHours(targetHour, targetMinute, 0, 0)

  const currentDay = now.getDay()
  let daysUntil = (targetDayOfWeek - currentDay + 7) % 7

  // If today is the run day but the run time has already passed today, target next week
  if (daysUntil === 0 && now >= target) {
    daysUntil = 7
  }
  target.setDate(now.getDate() + daysUntil)
  return target
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  const totalMs = Math.max(0, diff)

  const seconds = Math.floor((totalMs / 1000) % 60)
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60)
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24)
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24))

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs,
    formattedTarget: targetDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }),
  }
}

export default function ScheduleSection() {
  const [wedCountdown, setWedCountdown] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(getNextOccurrence(3, 17, 30))
  )
  const [sunCountdown, setSunCountdown] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(getNextOccurrence(0, 6, 30))
  )

  useEffect(() => {
    const updateCountdowns = () => {
      setWedCountdown(calculateTimeRemaining(getNextOccurrence(3, 17, 30)))
      setSunCountdown(calculateTimeRemaining(getNextOccurrence(0, 6, 30)))
    }

    updateCountdowns()
    const timer = setInterval(updateCountdowns, 1000)
    return () => clearInterval(timer)
  }, [])

  // Identify which run is happening next
  const isWedNext = wedCountdown.totalMs <= sunCountdown.totalMs
  const nextRun = isWedNext
    ? {
        day: "Wednesday Evening",
        location: "Lakeround Kurunegala",
        time: "5:30 PM",
        countdown: wedCountdown,
        type: "Sunset Lake Loop",
      }
    : {
        day: "Sunday Morning",
        location: "Ethagala Trail",
        time: "6:30 AM",
        countdown: sunCountdown,
        type: "Sunrise Ridge Climb",
      }

  return (
    <section id="runs" className="relative w-full bg-[#F5F3EF] py-24 md:py-36">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-[#6B8F63]" />
              <p className="text-[11px] tracking-[0.25em] text-[#1A1A1A]/40 uppercase font-semibold">
                Official Schedule
              </p>
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-[#1A1A1A] text-4xl sm:text-5xl md:text-6xl leading-[1] tracking-[-0.02em]">
              When we run
            </h2>
          </div>

          <p className="max-w-sm text-[14px] text-[#1A1A1A]/55 font-light leading-[1.7]">
            We run twice a week across Kurunegala. Wednesday evenings around the lake, and Sunday mornings on the mountain trail. Free forever and open to every pace.
          </p>
        </motion.div>

        {/* Featured Live Countdown Card (Next Upcoming Run) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-[#1A1A1A] p-7 sm:p-9 md:p-11 text-white shadow-xl mb-12"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#6B8F63]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            {/* Left Info */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] tracking-wider uppercase font-semibold text-[#A3C19C] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A3C19C] animate-ping" />
                <span>Next Community Run</span>
              </div>

              <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl md:text-4xl tracking-tight text-white">
                {nextRun.day} · {nextRun.location}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-[13px] text-white/60">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#A3C19C]" />
                  {nextRun.time}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#A3C19C]" />
                  {nextRun.type}
                </span>
                <span>•</span>
                <span className="text-white/40">
                  {nextRun.countdown.formattedTarget}
                </span>
              </div>
            </div>

            {/* Right: Digital Countdown Blocks */}
            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              {[
                { label: "Days", val: nextRun.countdown.days },
                { label: "Hours", val: nextRun.countdown.hours },
                { label: "Mins", val: nextRun.countdown.minutes },
                { label: "Secs", val: nextRun.countdown.seconds },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center rounded-xl bg-white/8 border border-white/10 px-3 sm:px-4 py-3 min-w-[62px] sm:min-w-[74px] backdrop-blur-sm shadow-inner"
                >
                  <span className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
                    {String(item.val).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[10px] tracking-widest uppercase text-white/45 font-medium">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* The Two Main Scheduled Days Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* 1. Wednesday Evening: Lakeround Kurunegala */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`relative rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              isWedNext
                ? "bg-[#E8E4DD] border-[#1A1A1A]/30 shadow-md ring-1 ring-[#1A1A1A]/10"
                : "bg-white/80 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25"
            }`}
          >
            <div>
              {/* Day & Icon Header */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="inline-flex items-center gap-2">
                  <Sunset className="h-5 w-5 text-[#C4683C]" />
                  <span className="text-[12px] font-bold tracking-[0.15em] text-[#1A1A1A]/60 uppercase">
                    Wednesday Evening
                  </span>
                </div>
                {isWedNext && (
                  <span className="rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
                    Up Next
                  </span>
                )}
              </div>

              {/* Title & Location */}
              <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                Lakeround Kurunegala
              </h3>
              <p className="mt-2 text-[14px] text-[#1A1A1A]/65 font-light leading-relaxed">
                A scenic sunset loop along Kurunegala lake. Flat, smooth paved course designed for aerobic pacing, recovery miles, and relaxed social conversation.
              </p>

              {/* Details List */}
              <div className="mt-6 space-y-2.5 text-[13px] text-[#1A1A1A]/75">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span><strong>5:30 PM</strong> · Warmup & brief at 5:20 PM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span>Lake Promenade Main Entrance</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Compass className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span>5 – 8 km · Flat asphalt · All pace groups</span>
                </div>
              </div>
            </div>

            {/* Wednesday Countdown Pill */}
            <div className="mt-8 pt-5 border-t border-[#1A1A1A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]/60">
                <Timer className="h-4 w-4 text-[#C4683C]" />
                <span className="font-mono font-medium text-[#1A1A1A]">
                  {wedCountdown.days}d {wedCountdown.hours}h {wedCountdown.minutes}m {wedCountdown.seconds}s
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-[#1A1A1A]/40 uppercase">
                To Wednesday
              </span>
            </div>
          </motion.div>

          {/* 2. Sunday Morning: Ethagala Trail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className={`relative rounded-2xl border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
              !isWedNext
                ? "bg-[#E8E4DD] border-[#1A1A1A]/30 shadow-md ring-1 ring-[#1A1A1A]/10"
                : "bg-white/80 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/25"
            }`}
          >
            <div>
              {/* Day & Icon Header */}
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="inline-flex items-center gap-2">
                  <Sunrise className="h-5 w-5 text-[#547A4D]" />
                  <span className="text-[12px] font-bold tracking-[0.15em] text-[#1A1A1A]/60 uppercase">
                    Sunday Morning
                  </span>
                </div>
                {!isWedNext && (
                  <span className="rounded-full bg-[#1A1A1A] px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase">
                    Up Next
                  </span>
                )}
              </div>

              {/* Title & Location */}
              <h3 className="font-[family-name:var(--font-serif)] text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight">
                Ethagala Trail
              </h3>
              <p className="mt-2 text-[14px] text-[#1A1A1A]/65 font-light leading-relaxed">
                An invigorating sunrise ascent up the Elephant Rock ridge. Forest paths, gentle trail gradients, and panoramic 360° summit views over the valley.
              </p>

              {/* Details List */}
              <div className="mt-6 space-y-2.5 text-[13px] text-[#1A1A1A]/75">
                <div className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span><strong>6:30 AM</strong> · Morning roll call at 6:20 AM</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span>Elephant Rock Foothills Trailhead</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Compass className="h-4 w-4 text-[#1A1A1A]/40 shrink-0" />
                  <span>6 – 10 km · Elevation +220m · Guided groups</span>
                </div>
              </div>
            </div>

            {/* Sunday Countdown Pill */}
            <div className="mt-8 pt-5 border-t border-[#1A1A1A]/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[12px] text-[#1A1A1A]/60">
                <Timer className="h-4 w-4 text-[#547A4D]" />
                <span className="font-mono font-medium text-[#1A1A1A]">
                  {sunCountdown.days}d {sunCountdown.hours}h {sunCountdown.minutes}m {sunCountdown.seconds}s
                </span>
              </div>
              <span className="text-[11px] font-medium tracking-wide text-[#1A1A1A]/40 uppercase">
                To Sunday
              </span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 pt-8 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[13px] text-[#1A1A1A]/50 font-light">
            Bag drop and hydration available at both starting points. Free and open to every pace.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[12px] font-semibold tracking-wider text-[#1A1A1A] hover:text-[#547A4D] transition-colors uppercase"
          >
            <span>Ask questions or join WhatsApp briefing</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  )
}

