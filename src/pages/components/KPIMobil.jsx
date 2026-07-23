import { Bus, BusFront, Bike } from 'lucide-react'

const icons = {
  HoplaBus: Bus,
  HoplaNav: BusFront,
  VeloLoue: Bike,
  Pistes_cyclables: Bike ,
}

function Delta({ value, inverse = false }) {
  const isPositive = value > 0
  const isGood = inverse ? !isPositive : isPositive
  return (
    <span className={`text-xs font-medium flex items-center gap-0.5 ${isGood ? 'text-green-600' : 'text-red-400'}`}>
      {isPositive ? '↑' : '↓'} {Math.abs(value)} % vs N-1
    </span>
  )
}

export default function KPIMobil({ kpis, couleur, couleur_claire }) {
  const items = [
    { key: 'HoplaBus', inverse: false },
    { key: 'HoplaNav', inverse: false },
    { key: 'VeloLoue', inverse: false },
    { key: 'Pistes_cyclables', inverse: false },
  ]

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {items.map(({ key, inverse }) => {
        const d = kpis[key]
        const Icon = icons[key]
        const valeurFormatee = key === 'budget_realise'
          ? d.valeur.toLocaleString('fr-FR') + ' €'
          : d.valeur.toLocaleString('fr-FR') + ' ' + d.unite

        return (
          <div key={key} className="card px-5 py-4 flex items-start gap-3">
            <div className="mt-0.5 p-2 rounded-xl shrink-0" style={{ backgroundColor: couleur_claire }}>
              <Icon size={17} style={{ color: couleur }} />
            </div>
            <div className="min-w-0">
              <div className="text-xs text-gray-400 font-medium mb-1 truncate">{d.label}</div>
              <div className="text-2xl font-bold text-gray-900 mb-0.5">{valeurFormatee}</div>
              <div className="text-xs text-gray-400 mb-1">{d.sous_label}</div>
              <Delta value={d.delta} inverse={inverse} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
