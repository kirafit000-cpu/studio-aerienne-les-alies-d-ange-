export const metadata = {
title: "Les Ailes d’Ange — Planning",
description: "Planning des cours du studio Les Ailes d’Ange"
}

import "./globals.css"
import Link from "next/link"

export default function RootLayout({ children }: { children: React.ReactNode }) {
return (
<html lang="fr">
<body>
<header className="navbar">
<div className="container nav-inner">
<Link href="/" className="logo">Les Ailes d’Ange</Link>
<nav className="nav-links">
<Link href="/" className="nav-link">Accueil</Link>
<Link href="/schedule" className="nav-link">Planning</Link>
</nav>
</div>
</header>
<main className="container">
{children}
</main>
</body>
</html>
)
}
