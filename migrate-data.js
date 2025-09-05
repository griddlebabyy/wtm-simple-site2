import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Load environment variables
import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Read JSON files
const barsData = JSON.parse(fs.readFileSync('bars.json', 'utf8'))
const dealsData = JSON.parse(fs.readFileSync('deals.json', 'utf8'))

async function migrateData() {
  try {
    console.log('Starting data migration...')

    // Clear existing data
    console.log('Clearing existing data...')
    await supabase.from('deals').delete().neq('id', 0)
    await supabase.from('bar_info').delete().neq('id', 0)

    // Migrate bar_info data
    console.log('Migrating bar_info data...')
    const barInfoRecords = []
    
    for (const [location, bars] of Object.entries(barsData)) {
      for (const [fullName, slug] of Object.entries(bars)) {
        barInfoRecords.push({
          full_name: fullName,
          slug: slug,
          location: location,
          address: null, // Will be added later
          instagram: null, // Will be added later
          img_url: null // Will be added later
        })
      }
    }

    const { error: barError } = await supabase
      .from('bar_info')
      .insert(barInfoRecords)

    if (barError) {
      throw barError
    }

    console.log(`Inserted ${barInfoRecords.length} bar records`)

    // Migrate deals data
    console.log('Migrating deals data...')
    const dealsRecords = []

    for (const [fullName, deals] of Object.entries(dealsData)) {
      // Find the corresponding slug from bar_info
      const barRecord = barInfoRecords.find(bar => bar.full_name === fullName)
      if (!barRecord) {
        console.warn(`No bar found for deals: ${fullName}`)
        continue
      }

      dealsRecords.push({
        full_name: fullName,
        slug: barRecord.slug,
        monday: deals.Monday || [],
        tuesday: deals.Tuesday || [],
        wednesday: deals.Wednesday || [],
        thursday: deals.Thursday || [],
        friday: deals.Friday || [],
        saturday: deals.Saturday || [],
        sunday: deals.Sunday || [],
        everyday: deals.everyday || [],
        event: null // Will be added manually later
      })
    }

    const { error: dealsError } = await supabase
      .from('deals')
      .insert(dealsRecords)

    if (dealsError) {
      throw dealsError
    }

    console.log(`Inserted ${dealsRecords.length} deals records`)
    console.log('Data migration completed successfully!')

  } catch (error) {
    console.error('Error during migration:', error)
    process.exit(1)
  }
}

migrateData()
