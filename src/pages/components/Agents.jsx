import { Users } from 'lucide-react'

export default function Agents({ agents, couleur, couleur_claire }) {
  const totalEtp = agents.reduce((acc, a) => acc + a.etp, 0)

  return (
    <div className="card p-5 h-full flex flex-col max-h-[38vh]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700">Équipe</h3>
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{ backgroundColor: couleur_claire, color: couleur }}
        >
          <Users size={11} />
        </div>
      </div>

      <div className="flex flex-col gap-2 flex-1 overflow-y-auto scroll-smooth">
        {agents.map((agent, i) => (
          <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50">
            <div>
              <div className="text-sm font-semibold text-gray-700">{agent.statut}</div>
              <div className="text-xs text-gray-400">{agent.poste}</div>
            </div>
            <div
              className="text-sm font-bold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: couleur_claire, color: couleur }}
            >
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
