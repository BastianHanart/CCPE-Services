import { FileText, RefreshCw } from 'lucide-react'

export default function ConventionCard({ convention }) {
  return (
    <div className="card p-5 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-violet-100 rounded-lg">
          <FileText size={14} className="text-violet-600" />
        </div>
        <span className="text-xs font-semibold text-violet-600 uppercase tracking-wide">
          Convention
        </span>
      </div>

      <h3 className="text-base font-bold text-gray-900 mb-1">{convention.titre}</h3>
      <div className="text-xs text-gray-400 mb-3">Partenaire : <span className="font-semibold text-gray-600">{convention.partenaire}</span></div>

      <p className="text-sm text-gray-500 leading-relaxed flex-1">{convention.description}</p>

      <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <RefreshCw size={12} className="text-amber-500" />
            <span className="text-sm font-semibold text-amber-500">{convention.renouvellement}</span>
          </div>
          <div className="text-xs text-gray-400">Renouvellement</div>
        </div>
      </div>
    </div>
  )
}
