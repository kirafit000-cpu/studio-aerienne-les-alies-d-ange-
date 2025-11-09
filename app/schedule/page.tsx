'use client'
import { useEffect } from 'react'
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default function SchedulePage() {
  useEffect(() => {
    const el = document.getElementById('calendar') as HTMLElement
    let cal: Calendar | null = null
    async function run() {
      const events = await fetch('/events.json').then(r => r.json())
      cal = new Calendar(el, {
        plugins: [timeGridPlugin, interactionPlugin],
        initialView: 'timeGridWeek',
        locale: 'fr',
        height: 'auto',
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
        events,
        eventClick(info) { alert(`Занятие: ${info.event.title}\n${info.event.start?.toLocaleString()}`) }
      })
      cal.render()
    }
    run()
    return () => { cal?.destroy() }
  }, [])

  return (
    <div>
      <h1 style={{marginBottom:12}}>Расписание</h1>
      <div id="calendar" />
      <p style={{color:'#666', fontSize:12, marginTop:8}}>Демо-данные из <code>/public/events.json</code>.</p>
    </div>
  )
}
