export const metadata = { title: 'Studio Schedule', description: 'Public schedule' }
import './globals.css'
import Link from 'next/link'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header style={{borderBottom:'1px solid #eee', padding:'12px 16px'}}>
          <nav style={{display:'flex', gap:16}}>
            <Link href="/">Home</Link>
            <Link href="/schedule">Schedule</Link>
          </nav>
        </header>
        <main style={{maxWidth:960, margin:'24px auto', padding:'0 16px'}}>{children}</main>
      </body>
    </html>
  )
}
