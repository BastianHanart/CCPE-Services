import { Calendar, Clock, AlertCircle, Star } from 'lucide-react'

const iconMap = {
  calendar: Calendar,
  clock: Clock,
  'alert-circle': AlertCircle,
  star: Star,
}

export default function ChampsIntervention({ champs }) {
  return (
    <div className="card p-5 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Champs d'intervention</h3>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {champs.map((champ) => {
          const Icon = iconMap[champ.icone] || Star
          return (
            <div key={champ.id} className="bg-violet-50 rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white rounded-lg shadow-sm">
                  <Icon size={14} className="text-violet-600" />
                </div>
                <span className="text-s font-semibold text-gray-800">{champ.titre}</span>
              </div>
              <p className="text-s text-gray-500 leading-relaxed">{champ.description}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
