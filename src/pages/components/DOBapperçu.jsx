import { useEffect, useRef, useState } from 'react'
import { FileText, ExternalLink } from 'lucide-react'
import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

export default function DobApercu({ dob, couleur }) {
  const url = dob?.url || dob?.URL || dob?.Url
  const canvasRef = useRef(null)
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(false)

  useEffect(() => {
    if (!url) return
    let annule = false
    setChargement(true)
    setErreur(false)

    pdfjsLib.getDocument(url).promise
      .then(pdf => pdf.getPage(1))
      .then(page => {
        if (annule) return
        const viewportBase = page.getViewport({ scale: 1 })
        const scale = 400 / viewportBase.width
        const viewport = page.getViewport({ scale })

        const canvas = canvasRef.current
        if (!canvas) return
        canvas.width = viewport.width
        canvas.height = viewport.height
        const context = canvas.getContext('2d')

        return page.render({ canvasContext: context, viewport }).promise
      })
      .then(() => { if (!annule) setChargement(false) })
      .catch(() => { if (!annule) { setErreur(true); setChargement(false) } })

    return () => { annule = true }
  }, [url])

  if (!dob || !url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card p-0 h-full flex flex-col overflow-hidden group hover:border-gray-200 transition-colors"
    >
      {/* Aperçu */}
      <div className="relative flex-1 min-h-0 bg-gray-50 flex items-center justify-center overflow-hidden">
        {!erreur ? (
          <canvas
            ref={canvasRef}
            className={`w-full h-auto max-h-full object-contain transition-opacity ${chargement ? 'opacity-0' : 'opacity-100'}`}
          />
        ) : (
          <FileText size={32} className="text-gray-300" />
        )}

        {chargement && !erreur && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 shadow-sm">
          <ExternalLink size={12} className="text-gray-400" />
        </div>
      </div>

      {/* Infos */}
      <div className="p-4 shrink-0 border-t border-gray-50">
        <div className="text-sm font-semibold text-gray-800 truncate">
          {dob.titre || "Débat d'Orientation Budgétaire"}
        </div>
        {dob.date && (
          <div className="text-xs text-gray-400 mt-0.5">Publié le {dob.date}</div>
        )}
      </div>
    </a>
  )
}