import KPIMobil from './components/KPIMobil'
import Convention from './components/Convention'
import OccupationChart from './components/OccupationChart'
import Budget from './components/Budget'
import Projets from './components/Projets'
import Agents from './components/Agents'
import GraphiqueCourbes from './components/Graphique2Courbes'

// Dans le JSX, remplace OccupationChart par :

export default function Mobilite({ data, service }) {
  return (
    <div>
      {/* Titre page */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Mobilités Durables</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Tableau de bord de suivi · {data.convention.partenaire}
        </p>
      </div>

      {/* KPIs */}
      <KPIMobil
        kpis={data.kpis}
        couleur={service.couleur}
        couleur_claire={service.couleur_claire}
      />

      {/* Ligne 2 : Convention + Occupation + Agents */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        <div className="col-span-2">
          <Convention
            convention={data.convention}
            couleur={service.couleur}
            couleur_claire={service.couleur_claire}
          />
        </div>
        <div className="col-span-3">
          <GraphiqueCourbes
            data={data.frequentation}
            couleur={service.couleur}
          />
        </div>
        <div className="col-span-2">
          <Agents
            agents={data.agents}
            couleur={service.couleur}
            couleur_claire={service.couleur_claire}
          />
        </div>
      </div>

      {/* Ligne 3 : Budget + Projets */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        <div className="col-span-2">
          <Budget
            budget={data.budget}
            couleur={service.couleur}
            couleur_claire={service.couleur_claire}
          />
        </div>
        <div className="col-span-5">
          <Projets
            projets={data.projets}
            couleur={service.couleur}
            couleur_claire={service.couleur_claire}
          />
        </div>
      </div>
    </div>
  )
}