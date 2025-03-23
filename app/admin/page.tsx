"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import { getPlayers, addPlayer, updatePlayerScore, deletePlayer } from "@/lib/data"
import type { Player } from "@/lib/types"
import { Lock } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayer, setNewPlayer] = useState({ name: "", score: 0, matches: 0 })
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      loadPlayers()
    }
  }, [isAuthenticated])

  const loadPlayers = async () => {
    try {
      const data = await getPlayers()
      setPlayers(data)
    } catch (error) {
      console.error("Failed to load players:", error)
      toast({
        title: "Error",
        description: "Failed to load players. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would be a secure authentication process
    // For demo purposes, we're using a simple password check
    if (password === "darshan3614") {
      setIsAuthenticated(true)
      toast({
        title: "Success",
        description: "Logged in successfully as admin.",
      })
    } else {
      toast({
        title: "Error",
        description: "Invalid password. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlayer.name) {
      toast({
        title: "Error",
        description: "Player name is required.",
        variant: "destructive",
      })
      return
    }

    try {
      await addPlayer(newPlayer)
      setNewPlayer({ name: "", score: 0, matches: 0 })
      loadPlayers()
      toast({
        title: "Success",
        description: "Player added successfully.",
      })
    } catch (error) {
      console.error("Failed to add player:", error)
      toast({
        title: "Error",
        description: "Failed to add player. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateScore = async (playerId: string, newScore: number, newMatches: number) => {
    try {
      await updatePlayerScore(playerId, newScore, newMatches)
      loadPlayers()
      toast({
        title: "Success",
        description: "Player score updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update player score:", error)
      toast({
        title: "Error",
        description: "Failed to update player score. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeletePlayer = async () => {
    if (!selectedPlayer) return

    try {
      await deletePlayer(selectedPlayer.id)
      setShowDeleteDialog(false)
      setSelectedPlayer(null)
      loadPlayers()
      toast({
        title: "Success",
        description: "Player deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete player:", error)
      toast({
        title: "Error",
        description: "Failed to delete player. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Admin Login</CardTitle>
              <CardDescription>Enter your password to access the admin dashboard</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-red-600">TEDx</h1>
            <span className="text-xl font-medium">×</span>
            <h1 className="text-2xl font-bold text-blue-600">PaddleX</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-600">Logged in as Admin (Darshan)</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsAuthenticated(false)
                router.push("/")
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="players" className="space-y-8">
          <TabsList>
            <TabsTrigger value="players">Manage Players</TabsTrigger>
            <TabsTrigger value="add">Add Player</TabsTrigger>
          </TabsList>

          <TabsContent value="players">
            <Card>
              <CardHeader>
                <CardTitle>Player Management</CardTitle>
                <CardDescription>Update scores or remove players from the leaderboard</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Matches</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {players.map((player) => (
                      <TableRow key={player.id}>
                        <TableCell className="font-medium">{player.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateScore(player.id, Math.max(0, player.score - 1), player.matches)
                              }
                              disabled={player.score <= 0}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{player.score}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateScore(player.id, player.score + 1, player.matches)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                handleUpdateScore(player.id, player.score, Math.max(0, player.matches - 1))
                              }
                              disabled={player.matches <= 0}
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">{player.matches}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleUpdateScore(player.id, player.score, player.matches + 1)}
                            >
                              +
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedPlayer(player)
                              setShowDeleteDialog(true)
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add">
            <Card>
              <CardHeader>
                <CardTitle>Add New Player</CardTitle>
                <CardDescription>Add a new player to the pickleball tournament</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddPlayer} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Player Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter player name"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="score">Initial Score</Label>
                      <Input
                        id="score"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newPlayer.score}
                        onChange={(e) => setNewPlayer({ ...newPlayer, score: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="matches">Matches Played</Label>
                      <Input
                        id="matches"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={newPlayer.matches}
                        onChange={(e) => setNewPlayer({ ...newPlayer, matches: Number.parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Add Player
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the player
              {selectedPlayer ? ` "${selectedPlayer.name}"` : ""} from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePlayer}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

