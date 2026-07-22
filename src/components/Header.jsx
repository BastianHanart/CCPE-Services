import { useState, useRef, useEffect } from 'react'
import { Calendar, Building2, ChevronDown, Check } from 'lucide-react'

export default function Header({ collectivite, services, serviceActif, setServiceActif }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Ferme le menu si on clique ailleurs
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">

        {/* Logo CCPE */}
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl" style={{ backgroundColor: serviceActif.couleur_claire }}>
            <Building2 size={18} style={{ color: serviceActif.couleur }} />
          </div>
          <div>
            <div className="font-bold text-gray-900 leading-none">{collectivite.nom}</div>
            <div className="text-xs text-gray-400">{collectivite.sous_titre}</div>
          </div>
        </div>

        <div className="w-px h-8 bg-gray-100" />

        {/* Sélecteur de service */}
        <div className="relative" ref={ref}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: serviceActif.couleur_claire, color: serviceActif.couleur }}
            >
              {serviceActif.sous_titre}
            </div>
            <span className="font-semibold text-gray-800 text-sm">{serviceActif.nom}</span>
            <ChevronDown
              size={14}
              className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 py-2 overflow-hidden">
              <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Services
              </div>
              {services.map(service => (
                <button
                  key={service.id}
                  onClick={() => { setServiceActif(service); setOpen(false) }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="p-1.5 rounded-lg" style={{ backgroundColor: service.couleur_claire }}>
                    <Building2 size={13} style={{ color: service.couleur }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800">{service.nom}</div>
                    <div className="text-xs text-gray-400 truncate">{service.sous_titre}</div>
                  </div>
                  {serviceActif.id === service.id && (
                    <Check size={14} style={{ color: service.couleur }} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-400 border border-gray-100 rounded-xl px-3 py-2">
        <Calendar size={13} />
        <span>Mis à jour le <strong className="text-gray-600">{collectivite.date_maj}</strong></span>
      </div>
    </header>
  )
}