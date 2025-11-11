'use client'
import { useEffect } from 'react'
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import frLocale from '@fullcalendar/core/locales/fr'

function slugify(s: string) {
return s
.normalize('NFD') // убрать акценты
.replace(/[\u0300-\u036f]/g, '')
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-') // пробелы и прочее → -
.replace(/(^-|-$)/g, '')
}

export default function SchedulePage() {
useEffect(() => {
const el = document.getElementById('calendar') as HTMLElement
let cal: Calendar | null = null

async function run() {
const events = await fetch('/events.json').then(r => r.json())

cal = new Calendar(el, {
plugins: [timeGridPlugin, interactionPlugin],
locales: [frLocale],
locale: 'fr',
timeZone: 'Europe/Paris',
initialView: 'timeGridWeek',
firstDay: 1,
height: 'auto',
slotMinTime: '08:00:00',
slotMaxTime: '22:00:00',
eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },

eventClassNames(arg) {
const t = (arg.event.extendedProps['type'] as string) || ''
const cap = Number(arg.event.extendedProps['capacity'] ?? 0)
const booked = Number(arg.event.extendedProps['booked'] ?? 0)
const full = cap > 0 && booked >= cap
return [t ? `type-${slugify(t)}` : '', full ? 'is-full' : '']
},

eventContent(arg) {
const title = arg.event.title
const cap = Number(arg.event.extendedProps['capacity'] ?? 0)
const booked = Number(arg.event.extendedProps['booked'] ?? 0)
const left = cap ? Math.max(cap - booked, 0) : null
const badge = cap
? (left === 0
? `<span class="badge badge-full">Complet</span>`
: `<span class="badge">${booked}/${cap} · Reste ${left}</span>`)
: ''
return { html: `<div class="evt">
<div class="evt-title">${title}</div>
<div class="evt-meta">${badge}</div>
</div>` }
},

events
})
cal.render()
}

run()
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
