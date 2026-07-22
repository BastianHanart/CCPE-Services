import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Dot } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 rounded-xl shadow-lg px-3 py-2 text-sm">
        <div className="font-semibold text-gray-700 mb-0.5">{label}</div>
        <div className="font-bold" style={{ color: payload[0].color }}>
          {payload[0].value} {payload[0].name}
        </div>
      </div>
    )
  }
  return null
}

export default function TendanceChart({ data, couleur, couleur_claire, titre, unite, moyenne }) {
  return (
    <div className="card p-5 h-full flex flex-col max-h-[38vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">{titre}</h3>
        {moyenne && (
          <div className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">
            Moyenne : <strong className="text-gray-600">{moyenne}</strong>
          </div>
        )}
      </div>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
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
              tickFormatter={v => `${v}${unite}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {moyenne && (
              <ReferenceLine
                y={parseFloat(moyenne)}
                stroke="#E5E7EB"
                strokeDasharray="4 4"
                label={{ value: moyenne, position: 'right', fontSize: 10, fill: '#9ca3af' }}
              />
            )}
            <Line
              type="monotone"
              dataKey="taux"
              name={unite}
              stroke={couleur}
              strokeWidth={2.5}
              dot={{ fill: couleur, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, fill: couleur }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}