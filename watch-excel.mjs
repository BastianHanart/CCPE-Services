import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import chokidar from 'chokidar'

const DATA_DIR = path.resolve('data')
const OUT_DIR = path.resolve('src/data')
const COLLECTIVITE_PATH = path.join(DATA_DIR, 'collectivite.xlsx')

function num(val) {
  if (val === undefined || val === '' || val === null) return undefined
  const n = Number(val)
  return isNaN(n) ? val : n
}

function sheetToObjects(sheet) {
  return xlsx.utils.sheet_to_json(sheet, { defval: '' })
}

// ── Mise à jour automatique de la date de mise à jour ───────────────

function dateDuJour() {
  return new Date().toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function updateDateMaj() {
  if (!fs.existsSync(COLLECTIVITE_PATH)) return

  const wb = xlsx.readFile(COLLECTIVITE_PATH)
  const sheet = wb.Sheets['collectivite']
  if (!sheet) return

  const rows = sheetToObjects(sheet)
  const nouvelleDate = dateDuJour()
  const dejaAJour = rows.some(r => r.cle === 'date_maj' && r.valeur === nouvelleDate)

  // Si la date est déjà à jour, on n'écrit rien pour éviter une boucle inutile
  if (dejaAJour) return

  let trouve = false
  const rowsMaj = rows.map(r => {
    if (r.cle === 'date_maj') {
      trouve = true
      return { ...r, valeur: nouvelleDate }
    }
    return r
  })
  if (!trouve) rowsMaj.push({ cle: 'date_maj', valeur: nouvelleDate })

  wb.Sheets['collectivite'] = xlsx.utils.json_to_sheet(rowsMaj, { skipHeader: false })
  xlsx.writeFile(wb, COLLECTIVITE_PATH)
  console.log(`${new Date().toLocaleTimeString('fr-FR')} — date_maj mise à jour (${nouvelleDate})`)
}

// ── Convertisseurs par fichier ──────────────────────────────────────

function convertCollectivite(wb) {
  const result = {}
  if (wb.Sheets['collectivite']) {
    sheetToObjects(wb.Sheets['collectivite']).forEach(r => {
      result[r.cle] = r.valeur
    })
  }
  return result
}

function convertServices(wb) {
  if (!wb.Sheets['services']) return []
  return sheetToObjects(wb.Sheets['services']).map(r => ({
    id: r.id,
    nom: r.nom,
    sous_titre: r.sous_titre,
    couleur: r.couleur,
    couleur_claire: r.couleur_claire,
    actif: r.actif === 'true' || r.actif === true,
  }))
}

function convertService(wb) {
  const result = {}

  // convention
  if (wb.Sheets['convention']) {
    const rows = sheetToObjects(wb.Sheets['convention'])
    const conv = {}
    rows.forEach(r => { conv[r.cle] = r.valeur })
    if (conv.champs_intervention) {
      conv.champs_intervention = conv.champs_intervention
        .split('|').map(s => s.trim()).filter(Boolean)
    }
    result.convention = conv
  }

  // dob (Débat d'Orientation Budgétaire)
  if (wb.Sheets['dob']) {
    const rows = sheetToObjects(wb.Sheets['dob'])
    const dob = {}
    rows.forEach(r => { dob[r.cle] = r.valeur })
    result.dob = dob
  }

  // kpis
  if (wb.Sheets['kpis']) {
    result.kpis = {}
    sheetToObjects(wb.Sheets['kpis']).forEach(r => {
      const obj = {}
      if (r.valeur !== '')     obj.valeur     = num(r.valeur)
      if (r.unite !== '')      obj.unite      = r.unite
      if (r.delta !== '')      obj.delta      = num(r.delta)
      if (r.label !== '')      obj.label      = r.label
      if (r.sous_label !== '') obj.sous_label = r.sous_label
      result.kpis[r.cle] = obj
    })
  }

  // projets
  if (wb.Sheets['projets']) {
    result.projets = sheetToObjects(wb.Sheets['projets']).map(r => ({
      id: num(r.id),
      nom: r.nom,
      statut: r.statut,
      priorite: r.priorite,
      date: r.date,
      responsable: r.responsable,
      progression: num(r.progression),
    }))
  }

  // agents
  if (wb.Sheets['agents']) {
    result.agents = sheetToObjects(wb.Sheets['agents']).map(r => ({
      poste: r.poste,
      etp: num(r.etp),
      statut: r.statut,
    }))
  }

  // budget
  if (wb.Sheets['budget']) {
    const rows = sheetToObjects(wb.Sheets['budget'])
    const meta = rows.find(r => r.type === 'total') || {}
    const postes = rows.filter(r => r.type === 'poste')
    result.budget = {
      total_alloue: num(meta.alloue),
      total_realise: num(meta.realise),
      postes: postes.map(r => ({
        nom: r.nom,
        alloue: num(r.alloue),
        realise: num(r.realise)
      }))
    }
  }

  // occupation_mensuelle (optionnel selon le service)
  if (wb.Sheets['occupation']) {
    result.occupation_mensuelle = sheetToObjects(wb.Sheets['occupation']).map(r => ({
      mois: r.mois,
      taux: num(r.taux),
    }))
  }

  if (wb.Sheets['frequentation']) {
    result.frequentation = sheetToObjects(wb.Sheets['frequentation']).map(r => ({
      mois: r.mois,
      bus: num(r.bus),
      navette : num(r.navette),
    }))
  }

  if (wb.Sheets['rendement_eau']) {
    result.rendement_eau = sheetToObjects(wb.Sheets['rendement_eau']).map(r => ({
      annee: r.annee,
      rendement: num(r.rendement)
    }))
  }


  if (wb.Sheets['Nombre']) {
    result.Nombre = sheetToObjects(wb.Sheets['Nombre']).map(r => ({
      annee: r.annee,
      rendement: num(r.rendement),
    }))
  }
  


  return result
}

// ── Convertir un fichier Excel en JSON ──────────────────────────────

function convertFile(excelPath) {
  const filename = path.basename(excelPath, '.xlsx')
  const outPath = path.join(OUT_DIR, `${filename}.json`)

  try {
    const wb = xlsx.readFile(excelPath)
    let result

    if (filename === 'collectivite') result = convertCollectivite(wb)
    else if (filename === 'services') result = convertServices(wb)
    else result = convertService(wb)

    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8')
    console.log(`${new Date().toLocaleTimeString('fr-FR')} — ${filename}.json mis à jour`)
  } catch (err) {
    console.error(`Erreur sur ${filename} :`, err.message)
  }
}

// ── Lancement ───────────────────────────────────────────────────────

// Convertir tous les fichiers existants au démarrage
fs.readdirSync(DATA_DIR)
  .filter(f => f.endsWith('.xlsx'))
  .forEach(f => convertFile(path.join(DATA_DIR, f)))

// Surveiller les modifications
console.log(`Surveillance de ${DATA_DIR}/*.xlsx`)
chokidar.watch(path.join(DATA_DIR, '*.xlsx')).on('change', filePath => {
  setTimeout(() => {
    convertFile(filePath)

    // Si ce n'est pas collectivite.xlsx qui vient de changer, on met à jour sa date.
    // Ça déclenchera à son tour un événement 'change' sur collectivite.xlsx,
    // qui régénérera collectivite.json avec la nouvelle date.
    const filename = path.basename(filePath, '.xlsx')
    if (filename !== 'collectivite') {
      updateDateMaj()
    }
  }, 300)
})
