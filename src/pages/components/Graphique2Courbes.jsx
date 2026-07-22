import { useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { ChevronDown } from 'lucide-react'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
        <div className="font-semibold text-gray-700 mb-1">{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-gray-600">{p.name} :</span>
            <span className="font-bold" style={{ color: p.color }}>
              {p.value.toLocaleString('fr-FR')} voyageurs
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="appearance-none bg-gray-50 border border-gray-100 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-700 pr-6 cursor-pointer hover:bg-gray-100 transition-colors focus:outline-none"
        >
          {options.map((opt, i) => (
            <option key={i} value={opt.index}>{opt.label}</option>
          ))}
        </select>
        <ChevronDown size={11} className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

export default function FrequentationChart({ data, couleur }) {
  const [debut, setDebut] = useState(0)
  const [fin, setFin] = useState(data.length - 1)

  const couleurNavette = couleur + '99'

  // Options pour les selects — construites depuis les données
  const options = data.map((d, i) => ({ label: d.mois, index: i }))

  // Options de début : tout sauf les indices >= fin
  const optionsDebut = options.filter(o => o.index < fin)
  // Options de fin : tout sauf les indices <= debut
  const optionsFin = options.filter(o => o.index > debut)

  // Données filtrées selon la période choisie
  const dataFiltered = useMemo(
    () => data.slice(debut, fin + 1),
    [data, debut, fin]
  )

  return (
    <div className="card p-5 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <h3 className="text-sm font-semibold text-gray-700 shrink-0">
          Fréquentation Hoplà
        </h3>

        {/* Sélecteur de période */}
        <div className="flex items-end gap-2">
          <Select
            label="De"
            value={debut}
            onChange={val => { setDebut(val); if (val >= fin) setFin(val + 1) }}
            options={optionsDebut}
          />
          <span className="text-gray-300 text-sm mb-1.5">→</span>
          <Select
            label="À"
            value={fin}
            onChange={val => { setFin(val); if (val <= debut) setDebut(val - 1) }}
            options={optionsFin}
          />
          {/* Reset */}
          {(debut !== 0 || fin !== data.length - 1) && (
            <button
              onClick={() => { setDebut(0); setFin(data.length - 1) }}
              className="text-xs text-gray-400 hover:text-gray-600 mb-1.5 underline underline-offset-2"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>
      
      {/* Graphique */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={dataFiltered} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="mois"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => v.toLocaleString('fr-FR')}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="line"
              iconSize={16}
              wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            />
            <Line
              type="monotone"
              dataKey="bus"
              name="Hoplà le bus"
              stroke={couleur}
              strokeWidth={2.5}
              dot={{ fill: couleur, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="navette"
              name="Hoplà la navette"
              stroke={couleurNavette}
              strokeWidth={2.5}
              strokeDasharray="5 4"
              dot={{ fill: couleurNavette, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}