import { FileText, CheckCircle, Clock, AlertCircle, ListChecks } from 'lucide-react'

const statutConfig = {
  en_cours: { label: 'En cours', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
  termine: { label: 'Terminée', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
  expire: { label: 'Expirée', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-50' },
}

export default function Convention({ convention, couleur, couleur_claire }) {

  return (
    <div className="card p-5 h-full flex flex-col max-h-[38vh]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: couleur_claire }}>
            <FileText size={16} style={{ color: couleur }} />
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Commission</div>
            <div className="font-semibold text-gray-800 text-sm leading-tight">{convention.nom}</div>
          </div>
        </div>
      </div>

      {/* Champs d'intervention */}
      <div className="flex-1 overflow-y-auto scroll-smooth">
        <div className="flex items-center gap-1.5 mb-2.5">
          <ListChecks size={13} className="text-gray-400" />
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Champs d'intervention</span>
        </div>
        <div className="flex flex-col gap-1.5">
          {convention.champs_intervention.map((champ, i) => (
            <div key={i} className="flex items-start gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                style={{ backgroundColor: couleur }}
              />
              <span className="text-sm text-gray-600 leading-relaxed">{champ}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
