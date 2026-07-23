import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts'

export default function OccupationChart({ titre, data, couleur, couleur_claire }) {

  const MOYENNE = data.reduce((somme, entry) => somme + entry.taux, 0) / data.length

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const valeur = payload[0].payload.taux
      const couleurActive = valeur >= MOYENNE ? couleur : couleur_claire
      return (
        <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
          <div className="font-semibold text-gray-700 mb-0.5">{label}</div>
          <div className="font-bold" style={{ color: couleurActive }}>{valeur} % d'occupation</div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{titre}</h3>
        <div className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
          Moyenne : <strong className="text-gray-600">{MOYENNE.toFixed(2)} %</strong>
        </div>
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barSize={18}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis dataKey="mois" tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} tickFormatter={v => `${v}%`} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8F7FF' }} />
            <ReferenceLine y={75} stroke="#E5E7EB" strokeDasharray="4 4" label={{ value: '75%', position: 'right', fontSize: 10, fill: '#9ca3af' }} />
            <Bar dataKey="taux" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.taux >= MOYENNE ? couleur : couleur_claire}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-2 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: couleur }} />
          <span className="text-xs text-gray-400">Au dessus moyenne</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: couleur_claire }} />
          <span className="text-xs text-gray-400">En dessous moyenne</span>
        </div>
      </div>
    </div>
  )
}