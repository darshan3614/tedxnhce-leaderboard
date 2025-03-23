"use server"

import type { Player } from "./types"
import { v4 as uuidv4 } from "uuid"

// In a real application, this would be stored in a database
// For this demo, we're using server-side memory storage
let players: Player[] = [
  { id: "1", name: "Alex Johnson", score: 42, matches: 5 },
  { id: "2", name: "Sam Williams", score: 38, matches: 4 },
  { id: "3", name: "Taylor Smith", score: 35, matches: 5 },
  { id: "4", name: "Jordan Brown", score: 31, matches: 3 },
  { id: "5", name: "Casey Davis", score: 28, matches: 4 },
  { id: "6", name: "Riley Wilson", score: 25, matches: 3 },
  { id: "7", name: "Morgan Lee", score: 22, matches: 2 },
  { id: "8", name: "Jamie Garcia", score: 18, matches: 2 },
]

export async function getPlayers(): Promise<Player[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return [...players]
}

export async function addPlayer(player: Omit<Player, "id">): Promise<Player> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newPlayer: Player = {
    id: uuidv4(),
    ...player,
  }

  players.push(newPlayer)
  return newPlayer
}

export async function updatePlayerScore(
  playerId: string,
  newScore: number,
  newMatches: number,
): Promise<Player | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const playerIndex = players.findIndex((p) => p.id === playerId)
  if (playerIndex === -1) return null

  players[playerIndex] = {
    ...players[playerIndex],
    score: newScore,
    matches: newMatches,
  }

  return players[playerIndex]
}

export async function deletePlayer(playerId: string): Promise<boolean> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const initialLength = players.length
  players = players.filter((p) => p.id !== playerId)

  return players.length < initialLength
}

