import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Users, MessageCircle, Calendar, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { clsx } from "clsx"

type Tab = "members" | "contacts" | "events" | "gallery"

interface AdminLayoutProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  children: ReactNode
}

const tabs: { id: Tab; label: string; icon: typeof Users }[] = [
  { id: "members", label: "Members", icon: Users },
  { id: "contacts", label: "Contacts", icon: MessageCircle },
  { id: "events", label: "Events", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: ImageIcon },
]

export default function AdminLayout({ activeTab, onTabChange, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen w-full bg-[#E8E4DD]">
      {/* ── Top Header Bar (dark) ────────────────────────── */}
      <header className="sticky top-0 z-50 w-full bg-[#1A1A1A]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <a
              href="http://localhost:5173"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
              title="Open public site"
            >
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div className="h-5 w-px bg-white/15" />
            <span className="font-[family-name:var(--font-serif)] text-[18px] text-white tracking-wide">
              thestrideclub
            </span>
            <span className="text-[13px] text-white/40 font-medium tracking-wider uppercase">
              Admin Portal
            </span>
          </div>

          {/* Tab Navigation */}
          <nav className="hidden sm:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id)}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-medium tracking-wide transition-all cursor-pointer",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Mobile Tab Bar */}
        <div className="flex sm:hidden border-t border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={clsx(
                  "flex flex-1 flex-col items-center gap-1 py-3 text-[11px] font-medium tracking-wider uppercase transition-all cursor-pointer",
                  isActive
                    ? "text-[#A3C19C] border-b-2 border-[#A3C19C]"
                    : "text-white/40 hover:text-white/60"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </header>

      {/* ── Main Content Area ────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
