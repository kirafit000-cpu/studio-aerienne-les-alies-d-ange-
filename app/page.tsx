'use client'
import { useEffect } from 'react'

function slugify(s: string) {
return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
}

export default function SchedulePage() {
useEffect(() => {
let cal: any
const el = document.getElementById('calendar') as HTMLElement | null
if (!el) return

;(async () => {
const [{ Calendar }, timegrid, interaction, fr] = await Promise.all([
import('@fullcalendar/core'),
import('@fullcalendar/timegrid'),
import('@fullcalendar/interaction'),
import('@fullcalendar/core/locales/fr'),
])

const events = await fetch('/events.json').then(r => r.json())

cal = new Calendar(el, {
plugins: [timegrid.default, interaction.default],
locales: [fr.default],
locale: 'fr',
timeZone: 'Europe/Paris',
initialView: 'timeGridWeek',
headerToolbar: { left: 'prev,next today', center: 'title', right: 'timeGridDay,timeGridWeek' },
buttonText: { today: "Aujourd’hui", day: 'Jour', week: 'Semaine' },
