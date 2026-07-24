// Version "build" (sans watch) — convertit tous les Excel une seule fois.
// Utilisé lors du déploiement (Vercel, Netlify, GitHub Actions...),
// contrairement à watch-excel.mjs qui sert uniquement en dev local.

import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.resolve('data')
const OUT_DIR = path.resolve('src/data')

function num(val) {
  if (val === undefined || val === '' || val === null) return undefined
  const n = Number(val)
  return isNaN(n) ? val : n
}

function sheetToObjects(sheet) {
  return xlsx.utils.sheet_to_json(sheet, { defval: '' })
}

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

  if (wb.Sheets['dob']) {
    const rows = sheetToObjects(wb.Sheets['dob'])
    const dob = {}
    rows.forEach(r => { dob[r.cle] = r.valeur })
    result.dob = dob
  }

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

  if (wb.Sheets['agents']) {
    result.agents = sheetToObjects(wb.Sheets['agents']).map(r => ({
      poste: r.poste,
      etp: num(r.etp),
      statut: r.statut,
    }))
  }

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
    console.log(`${filename}.json généré`)
  } catch (err) {
    console.error(`Erreur sur ${filename} :`, err.message)
    process.exitCode = 1
  }
}

fs.readdirSync(DATA_DIR)
  .filter(f => f.endsWith('.xlsx'))
  .forEach(f => convertFile(path.join(DATA_DIR, f)))

console.log('Conversion Excel → JSON terminée.')
