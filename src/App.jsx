import { useState } from 'react'

import collectivite from './data/collectivite.json'
import services from './data/services.json'
import halte_garderie from './data/halte_garderie.json'
import dev_eco from './data/dev_eco.json'
import mobilite from './data/mobilite.json'
import equipement from './data/equipement.json'
import assainissement from './data/assainissement.json'
import finances from './data/finances.json'
import communication from './data/communication.json'
import amenagement from './data/amenagement.json'

import Header from './components/Header'

import PageHalteGarderie from './pages/HalteGarderie'
import PageDevEco from './pages/DevEco'
import PageMobilite from './pages/Mobilite'
import PageDechet from './pages/Dechet'
import PageCommunication from './pages/Communication'
import PageAmenagement from './pages/Amenagement'
import PageAssainissement from './pages/Assainissement'
import PageFinances from './pages/Finances'

const allData = {
  halte_garderie,
  dev_eco,
  mobilite,
  equipement,
  assainissement,
  finances,
  communication,
  amenagement,
}

const pages = {
  halte_garderie: PageHalteGarderie,
  dev_eco: PageDevEco,
  mobilite: PageMobilite,
  equipement: PageDechet,
  communication: PageCommunication,
  amenagement: PageAmenagement,
  assainissement: PageAssainissement,
  finances: PageFinances,
}

export default function App() {
  console.log('services:', services)
  const [serviceActif, setServiceActif] = useState(services[0])
  const Page = pages[serviceActif.id]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        collectivite={collectivite}
        services={services}
        serviceActif={serviceActif}
        setServiceActif={setServiceActif}
      />
      <main className="flex-1 px-8 py-6 max-w-screen-2xl mx-auto w-full">
        <Page data={allData[serviceActif.id]} service={serviceActif} />
      </main>
    </div>
  )
}