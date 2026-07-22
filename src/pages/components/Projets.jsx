import { CheckCircle, Clock, AlertCircle, ArrowUpCircle, MinusCircle } from 'lucide-react'

const statutConfig = {
  termine:  { label: 'Terminé',  icon: CheckCircle,  color: 'text-green-600', bg: 'bg-green-50' },
  en_cours: { label: 'En cours', icon: Clock,        color: 'text-amber-500', bg: 'bg-amber-50' },
  planifie: { label: 'Planifié', icon: AlertCircle,  color: 'text-blue-400',  bg: 'bg-blue-50'  },
}

const prioriteConfig = {
  haute:   { label: 'Haute',   icon: ArrowUpCircle, color: 'text-red-400' },
  normale: { label: 'Normale', icon: MinusCircle,   color: 'text-gray-400' },
}

export default function Projets({ projets, couleur, couleur_claire }) {
  return (
    <div className="card p-5 h-full max-h-[40vh] flex flex-col">
      {/* Header fixe */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <h3 className="text-sm font-semibold text-gray-700">Projets en cours</h3>
        <div className="text-xs text-gray-400">
          {projets.filter(p => p.statut === 'en_cours').length} actif(s) · {projets.filter(p => p.statut === 'planifie').length} planifié(s)
        </div>
      </div>

      {/* Liste scrollable uniquement */}
      <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-y-auto scroll-smooth custom-scrollbar">
        {projets.map((projet) => {
          const statut = statutConfig[projet.statut]
          const priorite = prioriteConfig[projet.priorite]
          const StatutIcon = statut.icon
          const PrioriteIcon = priorite.icon

          return (
            <div
              key={projet.id}
              className="project-row flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-gray-100 shrink-0"
            >

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg shrink-0 w-28 ${statut.bg}`}>
                <StatutIcon size={11} className={statut.color} />
                <span className={`text-xs font-semibold ${statut.color}`}>{statut.label}</span>
              </div>

              <PrioriteIcon size={14} className={`shrink-0 ${priorite.color}`} />

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 truncate">{projet.nom}</div>
                <div className="text-xs text-gray-400 truncate">{projet.description}</div>
              </div>

              <div className="text-xs text-gray-400 shrink-0 hidden xl:block w-40 text-right truncate">
                {projet.responsable}
              </div>
              
              <div className="text-xs text-gray-400 shrink-0 w-36 text-right hidden lg:block">
                {projet.date}
              </div>
            </div>
          )
        })}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50 shrink-0">
        <div className="flex items-center gap-1.5">
          <ArrowUpCircle size={12} className="text-red-400" />
          <span className="text-xs text-gray-400">Priorité haute</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MinusCircle size={12} className="text-gray-400" />
          <span className="text-xs text-gray-400">Priorité normale</span>
        </div>
      </div>
    </div>
  )
}