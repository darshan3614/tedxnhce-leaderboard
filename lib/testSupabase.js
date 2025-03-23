const { createClient } = require('@supabase/supabase-js')

// Replace with your actual Supabase credentials
const supabaseUrl = 'https://bckltfnflcuejotojnxh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJja2x0Zm5mbGN1ZWpvdG9qbnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NTE2NzEsImV4cCI6MjA1ODMyNzY3MX0.GSLI9sy_mFV3X7VdynD-ohsJcePSfeLwmySx80Um2SU'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
  const { data, error } = await supabase.from('players').select('*')

  if (error) {
    console.error("Error fetching data:", error.message)
  } else {
    console.log("Fetched Players:", data)
  }
}

testConnection()
