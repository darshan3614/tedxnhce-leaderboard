"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal } from "lucide-react"
import { getPlayers } from "@/lib/data"
import type { Player } from "@/lib/types"

export function PlayerLeaderboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await getPlayers()
        // Sort players by score in descending order
        const sortedPlayers = [...data].sort((a, b) => b.score - a.score)
        setPlayers(sortedPlayers)
      } catch (error) {
        console.error("Failed to load players:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPlayers()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  return (
    <Card className="shadow-lg border-2 border-blue-100">
      <CardContent className="p-6">
        <AnimatePresence>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Matches</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {players.map((player, index) => (
                  <TableRow key={player.id} className={index < 3 ? "font-medium" : ""}>
                    <TableCell className="text-center">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-yellow-500 mx-auto" />
                      ) : index === 1 ? (
                        <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                      ) : index === 2 ? (
                        <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                      ) : (
                        index + 1
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell className="text-right">{player.score}</TableCell>
                    <TableCell className="text-right">{player.matches}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

