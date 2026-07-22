import { Euro } from 'lucide-react'

// Convertit un hex (#RRGGBB) en [r, g, b]
function hexToRgb(hex) {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

// Interpole entre deux couleurs hex selon t (0 = colorA, 1 = colorB)
function interpolateColor(colorA, colorB, t) {
  const [r1, g1, b1] = hexToRgb(colorA)
  const [r2, g2, b2] = hexToRgb(colorB)
  const r = Math.round(r1 + (r2 - r1) * t)
  const g = Math.round(g1 + (g2 - g1) * t)
  const b = Math.round(b1 + (b2 - b1) * t)
  return `rgb(${r}, ${g}, ${b})`
}

export default function Budget({ budget, couleur, couleur_claire }) {
  const pct = Math.round((budget.total_realise / budget.total_alloue) * 100)

  return (
    <div className="card p-5 h-full flex flex-col max-h-[40vh] overflow-y-auto scroll-smooth">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Suivi budgétaire</h3>

      {/* Total */}
      <div className="rounded-xl p-3 mb-4" style={{ backgroundColor: couleur_claire }}>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium" style={{ color: couleur }}>Budget consommé</span>
          <span className="text-xs font-bold" style={{ color: couleur }}>{pct} %</span>
        </div>
        <div className="w-full bg-white rounded-full h-2 mb-2">
          <div
            className="h-2 rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: couleur }}
          />
        </div>
        <div className="flex justify-between text-xs">
          <span className="font-bold text-gray-800">{budget.total_realise.toLocaleString('fr-FR')} €</span>
          <span className="text-gray-400">/ {budget.total_alloue.toLocaleString('fr-FR')} €</span>
        </div>
      </div>

      {/* Par poste */}
      <div className="flex flex-col gap-2.5 flex-1">
        {budget.postes.map((poste) => {
          const p = Math.round((poste.realise / poste.alloue) * 100)
          const pClamped = Math.min(Math.max(p, 0), 100)
          const barColor = interpolateColor(couleur_claire, couleur, pClamped / 100)

          return (
            <div key={poste.nom}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: barColor }} />
                  <span className="text-xs text-gray-600">{poste.nom}</span>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-semibold text-gray-700">{poste.realise.toLocaleString('fr-FR')} €</span>
                  <span className="text-gray-300 mx-1">/</span>
                  <span>{poste.alloue.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full"
                  style={{ width: `${pClamped}%`, backgroundColor: barColor }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}