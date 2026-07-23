import KPIamenagement from './components/KPIamenagement'
import Convention from './components/Convention'
import Graphique from './components/GraphiqueCourbe'
import Budget from './components/Budget'
import Projets from './components/Projets'
import Agents from './components/Agents'

export default function HalteGarderie({ data, service }) {
  return (
    <div>
      {/* Titre page */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Aménagement du territoire</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Tableau de bord de suivi · {data.convention.partenaire}
        </p>
      </div>

      {/* KPIs */}
      <KPIamenagement
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
          <Graphique
            data={data.Nombre}
            couleur={service.couleur}
            couleur_claire={service.couleur_claire}
            titre = "Nombre de logements produit"
            unite = "logements"
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