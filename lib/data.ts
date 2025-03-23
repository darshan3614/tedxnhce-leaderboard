"use server"

import { supabase } from './supabase'
import type { Player } from "./types"

export async function getPlayers(): Promise<Player[]> {
  const { data } = await supabase
    .from('players')
    .select('*')
    .order('score', { ascending: false })
  
  return data || []
}

export async function addPlayer(player: Omit<Player, "id">): Promise<Player> {
  const { data } = await supabase
    .from('players')
    .insert([player])
    .select()
  
  return data?.[0] as Player
}

export async function updatePlayerScore(
  playerId: string,
  newScore: number,
  newMatches: number,
): Promise<Player | null> {
  const { data } = await supabase
    .from('players')
    .update({ score: newScore, matches: newMatches })
    .eq('id', playerId)
    .select()
  
  return data?.[0] || null
}

export async function deletePlayer(playerId: string): Promise<boolean> {
  await supabase
    .from('players')
    .delete()
    .eq('id', playerId)
  
  return true
}