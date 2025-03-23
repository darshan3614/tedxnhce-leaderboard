import Link from "next/link"
import { PlayerLeaderboard } from "@/components/player-leaderboard"
import { PickleballRules } from "@/components/pickleball-rules"
import { EventDetails } from "@/components/event-details"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="font-medium hover:text-red-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#leaderboard" className="font-medium hover:text-red-600 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="#rules" className="font-medium hover:text-red-600 transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/admin" className="font-medium hover:text-red-600 transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <EventDetails />

        <section id="leaderboard" className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Player Leaderboard</h2>
          <PlayerLeaderboard />
        </section>

        <section id="rules" className="mt-16 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Pickleball Rules</h2>
          <PickleballRules />
        </section>
      </main>

      <footer className="bg-slate-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-center md:text-left">© 2025 TEDx × PaddleX | The Pickleball Club</p>
            </div>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/tedxnhce/" className="hover:text-red-400 transition-colors">
                TedxNhce 
              </Link>
              <Link href="https://www.instagram.com/paddlex.pickleball/" className="hover:text-red-400 transition-colors">
                PaddleX 
              </Link>
              
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

