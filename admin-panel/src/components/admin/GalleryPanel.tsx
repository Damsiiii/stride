import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Trash2, Loader2, Image as ImageIcon, Plus, Check } from "lucide-react"

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "")

interface GalleryItem {
  _id: string
  src: string
  alt: string
  caption: string
  location: string
  aspect: string
  order: number
  isActive: boolean
}

const emptyForm = {
  src: "",
  alt: "",
  caption: "",
  location: "",
  aspect: "aspect-square",
}

export default function GalleryPanel() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState(emptyForm)
  const [creating, setCreating] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const fetchItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/gallery?all=true`)
      if (!res.ok) throw new Error("Failed to fetch gallery items")
      const data = await res.json()
      setItems(data)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return
    try {
      const res = await fetch(`${API_URL}/api/gallery/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete item")
      setItems((prev) => prev.filter((item) => item._id !== id))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleToggleActive = async (item: GalleryItem) => {
    try {
      const res = await fetch(`${API_URL}/api/gallery/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      })
      if (!res.ok) throw new Error("Failed to update status")
      const updated = await res.json()
      setItems((prev) => prev.map((i) => (i._id === item._id ? updated : i)))
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setCreating(true)

    try {
      const res = await fetch(`${API_URL}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || "Failed to create item")
      }

      setFormData(emptyForm)
      setShowForm(false)
      fetchItems()
    } catch (err: any) {
      setFormError(err.message)
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1A1A1A]">Tips & Gallery Management</h1>
          <p className="text-[13px] text-[#1A1A1A]/60 mt-1">Manage public running tips, form guides, and photos displayed in the guide section.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 rounded-lg bg-[#1A1A1A] px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-[#333] active:scale-95"
        >
          {showForm ? <Trash2 className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          <span>{showForm ? "Cancel" : "Add Photo"}</span>
        </button>
      </div>

      {/* Add Photo Form */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          className="rounded-xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm overflow-hidden"
          onSubmit={handleCreate}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#1A1A1A]/70 uppercase tracking-wider">Image URL</label>
              <input
                required
                type="text"
                placeholder="/images/gallery/photo.jpg or https://..."
                className="w-full rounded-lg border border-[#1A1A1A]/20 bg-transparent px-3 py-2 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#A3C19C] focus:outline-none focus:ring-1 focus:ring-[#A3C19C]"
                value={formData.src}
                onChange={(e) => setFormData({ ...formData, src: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#1A1A1A]/70 uppercase tracking-wider">Caption</label>
              <input
                required
                type="text"
                placeholder="e.g. Dawn Patrol"
                className="w-full rounded-lg border border-[#1A1A1A]/20 bg-transparent px-3 py-2 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#A3C19C] focus:outline-none focus:ring-1 focus:ring-[#A3C19C]"
                value={formData.caption}
                onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#1A1A1A]/70 uppercase tracking-wider">Location</label>
              <input
                required
                type="text"
                placeholder="e.g. Kurunegala Lake"
                className="w-full rounded-lg border border-[#1A1A1A]/20 bg-transparent px-3 py-2 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#A3C19C] focus:outline-none focus:ring-1 focus:ring-[#A3C19C]"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-[#1A1A1A]/70 uppercase tracking-wider">Alt Text</label>
              <input
                required
                type="text"
                placeholder="Description for screen readers"
                className="w-full rounded-lg border border-[#1A1A1A]/20 bg-transparent px-3 py-2 text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#A3C19C] focus:outline-none focus:ring-1 focus:ring-[#A3C19C]"
                value={formData.alt}
                onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[12px] font-medium text-[#1A1A1A]/70 uppercase tracking-wider">Aspect Ratio</label>
              <select
                className="w-full rounded-lg border border-[#1A1A1A]/20 bg-transparent px-3 py-2 text-[14px] text-[#1A1A1A] focus:border-[#A3C19C] focus:outline-none focus:ring-1 focus:ring-[#A3C19C]"
                value={formData.aspect}
                onChange={(e) => setFormData({ ...formData, aspect: e.target.value })}
              >
                <option value="aspect-square">Square (1:1)</option>
                <option value="aspect-[4/3]">Landscape (4:3)</option>
                <option value="aspect-[3/4]">Portrait (3:4)</option>
                <option value="aspect-[16/9]">Widescreen (16:9)</option>
              </select>
            </div>
          </div>

          {formError && <p className="mt-4 text-[13px] text-red-600">{formError}</p>}

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={creating}
              className="flex items-center gap-2 rounded-lg bg-[#A3C19C] px-5 py-2.5 text-[13px] font-medium text-[#1A1A1A] transition-all hover:bg-[#8FB388] active:scale-95 disabled:opacity-50"
            >
              {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              <span>{creating ? "Saving..." : "Save Photo"}</span>
            </button>
          </div>
        </motion.form>
      )}

      {/* List / Grid of Photos */}
      <div className="rounded-xl border border-[#1A1A1A]/10 bg-white p-6 shadow-sm min-h-[400px]">
        {loading ? (
          <div className="flex h-[300px] items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#1A1A1A]/30" />
          </div>
        ) : error ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-[#1A1A1A]/50">
            <ImageIcon className="h-8 w-8 opacity-20" />
            <p className="text-[14px]">{error}</p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex h-[300px] flex-col items-center justify-center gap-2 text-[#1A1A1A]/50">
            <ImageIcon className="h-8 w-8 opacity-20" />
            <p className="text-[14px]">No photos in gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id} className="group relative rounded-xl border border-[#1A1A1A]/10 overflow-hidden bg-[#F5F3EF]">
                <div className={`${item.aspect} w-full overflow-hidden bg-[#E8E4DD]`}>
                  <img src={item.src} alt={item.alt} className={`w-full h-full object-cover ${!item.isActive && 'grayscale opacity-50'}`} />
                </div>
                <div className="p-4 bg-white border-t border-[#1A1A1A]/5">
                  <h3 className="font-semibold text-[15px] truncate">{item.caption}</h3>
                  <p className="text-[12px] text-[#1A1A1A]/50 mt-1 truncate">{item.location}</p>
                  
                  <div className="mt-4 flex items-center justify-between border-t border-[#1A1A1A]/10 pt-3">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${item.isActive ? 'bg-[#A3C19C]/20 text-[#6B8F63] hover:bg-[#A3C19C]/30' : 'bg-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/20'}`}
                    >
                      {item.isActive ? 'Visible' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-[#1A1A1A]/30 hover:text-red-500 transition-colors p-1"
                      title="Delete Photo"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
