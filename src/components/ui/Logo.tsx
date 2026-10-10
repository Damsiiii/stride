import React from "react"

export interface LogoProps {
  className?: string
  iconSize?: number
  showIcon?: boolean
  showText?: boolean
  textClassName?: string
  theme?: "dark" | "light"
}

/**
 * Clean, lightweight official Logo component for thestrideclub.
 * Uses Slimamif font family with bold brand presence.
 */
export default function Logo({
  className = "",
  iconSize = 30,
  showIcon = true,
  showText = true,
  textClassName = "",
  theme = "light",
}: LogoProps) {
  const isDark = theme === "dark"

  return (
    <div className={`group flex items-center gap-3 select-none ${className}`}>
      {/* Athletic Emblem Badge */}
      {showIcon && (
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 group-hover:scale-105 ${
            isDark
              ? "bg-white/10 text-white shadow-sm ring-1 ring-white/15"
              : "bg-[#1A1A1A] text-[#E8E4DD] shadow-sm ring-1 ring-[#1A1A1A]/10"
          }`}
          style={{ width: iconSize + 6, height: iconSize + 6 }}
        >
          <svg
            width={iconSize}
            height={iconSize}
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 group-hover:rotate-6"
            aria-hidden="true"
          >
            <g transform="rotate(-6 18 18)">
              {/* Upper track curve */}
              <path
                d="M 23.5 11.5 C 21 9 14.5 9 12 12.5 C 10 15 12 17.8 15.5 19 L 19 20"
                stroke={isDark ? "#FFFFFF" : "#E8E4DD"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Lower track curve */}
              <path
                d="M 17 20 L 20.5 21.2 C 24 22.4 26 25.2 24 27.7 C 21.5 31.2 15 31.2 12.5 28.7"
                stroke={isDark ? "#FFFFFF" : "#E8E4DD"}
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Sage accent runner cadence dot */}
              <circle cx="24.5" cy="11.5" r="1.8" fill="#A3C19C" />
            </g>
          </svg>
        </div>
      )}

      {/* Brand Wordmark - fully bold, prominent logo size */}
      {showText && (
        <span
          className={`font-[family-name:var(--font-slimamif)] font-bold tracking-[0.05em] uppercase leading-none ${
            isDark ? "text-white" : "text-[#1A1A1A]"
          } ${textClassName || "text-[26px] md:text-[32px]"}`}
        >
          thestrideclub
        </span>
      )}
    </div>
  )
}
