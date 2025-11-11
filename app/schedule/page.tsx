'use client'

import { useEffect } from 'react'

function slugify(s: string) {
return s
.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function SchedulePage() {
useEffect(() => {
let cal: any
const el = document.getElementById('calendar') as HTMLElement | null
if (!el) return

;(async () => {
try {
const [{ Calendar }, timegrid, interaction, fr] = await Promise.all([
import('@fullcalendar/core'),
import('@fullcalendar/timegrid'),
import('@fullcalendar/interaction'),
import('@fullcalendar/core/locales/fr'),
])

const events = await fetch('/events.json').then(r => r.json()).catch(() => [])

cal = new Calendar(el, {
plugins: [timegrid.default, interaction.default],
locales: [fr.default],
} catch (e) {
console.error(e)
el.innerHTML = '<p style="color:#f87171">Erreur d’init du calendrier</p>'
}
})()

return () => { cal?.destroy() }
}, [])

return (
<section className="card">
<h1>Planning</h1>
<div id="calendar" />
<p className="muted small" style={{marginTop:8}}>
Données de démo : <code>/public/events.json</code>.
</p>
</section>
)
}
