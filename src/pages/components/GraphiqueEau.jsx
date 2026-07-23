import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Cell, LabelList
} from 'recharts'
import { ShieldCheck, ShieldAlert } from 'lucide-react'

const SEUIL = 85

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const val = payload[0].value
    const conforme = val >= SEUIL
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
        <div className="font-semibold text-gray-700 mb-1">{label}</div>
        <div className={`font-bold ${conforme ? 'text-green-600' : 'text-red-400'}`}>
          {val} % de rendement
        </div>
        <div className={`text-xs mt-0.5 ${conforme ? 'text-green-500' : 'text-red-400'}`}>
          {conforme ? 'Conforme (≥ 85 %)' : `Non conforme (${(val - SEUIL)} pts sous le seuil)`}
        </div>
      </div>
    )
  }
  return null
}

export default function RendementEauChart({ data, couleur, couleur_claire }) {
  const conformes = data.filter(d => d.rendement >= SEUIL).length
  const nonConformes = data.length - conformes
  const derniere = data[data.length - 1]

  return (
    <div className="card p-5 h-full flex flex-col max-h-[38vh] overflow-y-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-700">Rendement du réseau d'eau potable</h3>
          <p className="text-xs text-gray-400 mt-0.5">Seuil réglementaire : 85 %</p>
        </div>
        {/* Badge dernière année */}
        {derniere && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold ${
            derniere.rendement >= SEUIL
              ? 'bg-green-50 text-green-600'
              : 'bg-red-50 text-red-400'
          }`}>
            {derniere.rendement >= SEUIL
              ? <ShieldCheck size={13} />
              : <ShieldAlert size={13} />
            }
            {derniere.annee} : {derniere.rendement} %
          </div>
        )}
      </div>

      {/* Graphique */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
            barSize={28}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              type="category"
              dataKey="annee"
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="number"
              domain={[60, 100]}
              tick={{ fontSize: 10, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `${v}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
            <ReferenceLine
              y={SEUIL}
              stroke="#EF4444"
              strokeWidth={1.5}
              strokeDasharray="4 3"
              label={{
                value: '85 %',
                position: 'right',
                fontSize: 10,
                fill: '#EF4444',
                fontWeight: 600,
              }}
            />
            <Bar dataKey="rendement" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.rendement >= SEUIL ? couleur : couleur_claire}
                />
              ))}
              <LabelList
                dataKey="rendement"
                position="top"
                formatter={v => `${v} %`}
                style={{ fontSize: 10, fontWeight: 600, fill: '#6b7280' }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Légende */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: couleur }} />
          <span className="text-xs text-gray-400">Conforme (≥ 85 %)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: couleur_claire }} />
          <span className="text-xs text-gray-400">Non conforme (&lt; 85 %)</span>
        </div>
      </div>

    </div>
  )
}