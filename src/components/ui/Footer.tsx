import Logo from "./Logo"

export default function Footer() {
  return (
    <footer className="w-full bg-[#E8E4DD] border-t border-[#1A1A1A]/10">
      <div className="mx-auto max-w-5xl px-6 md:px-12 py-14 md:py-16">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          {/* Left: Brand Logo */}
          <div>
            <Logo iconSize={24} textClassName="text-[15px]" />
          </div>

          {/* Right: Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://strava.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              Strava
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#1A1A1A]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] tracking-[0.08em] text-[#1A1A1A]/30">
          <p>© {new Date().getFullYear()} thestrideclub</p>
          <p>Est. 2023 · Kurunegala, Sri Lanka</p>
        </div>
      </div>
    </footer>
  )
}
