import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import BarCard from './BarCard'
import './HomePage.css'

const HomePage = () => {
  const [bars, setBars] = useState([])
  const [deals, setDeals] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch bars
      const { data: barsData, error: barsError } = await supabase
        .from('bar_info')
        .select('*')
        .order('location', { ascending: true })

      if (barsError) throw barsError

      // Fetch deals
      const { data: dealsData, error: dealsError } = await supabase
        .from('deals')
        .select('*')

      if (dealsError) throw dealsError

      // Transform deals data into a more usable format
      const dealsMap = {}
      dealsData.forEach(deal => {
        dealsMap[deal.slug] = {
          everyday: deal.everyday || [],
          Monday: deal.monday || [],
          Tuesday: deal.tuesday || [],
          Wednesday: deal.wednesday || [],
          Thursday: deal.thursday || [],
          Friday: deal.friday || [],
          Saturday: deal.saturday || [],
          Sunday: deal.sunday || []
        }
      })

      setBars(barsData || [])
      setDeals(dealsMap)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getTodaysDeals = (barSlug) => {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = dayNames[new Date().getDay()]
    const barDeals = deals[barSlug]
    
    if (!barDeals) return []
    
    const todaysDeals = barDeals[today] || []
    const everydayDeals = barDeals.everyday || []
    
    return [...everydayDeals, ...todaysDeals]
  }

  const groupBarsByLocation = () => {
    const grouped = {}
    bars.forEach(bar => {
      if (!grouped[bar.location]) {
        grouped[bar.location] = []
      }
      grouped[bar.location].push(bar)
    })
    
    // Define the desired order (matching the actual case in data)
    const locationOrder = ['strip', 'downtown', 'niche']
    
    // Create ordered object
    const orderedGrouped = {}
    locationOrder.forEach(location => {
      if (grouped[location]) {
        orderedGrouped[location] = grouped[location]
      }
    })
    
    // Add any other locations that might not be in the predefined order
    Object.keys(grouped).forEach(location => {
      if (!locationOrder.includes(location)) {
        orderedGrouped[location] = grouped[location]
      }
    })
    
    return orderedGrouped
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading bars...</h2>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error loading data</h2>
        <p>{error}</p>
      </div>
    )
  }

  const groupedBars = groupBarsByLocation()

  return (
    <div className="home-page">
      <header className="header">
        <div className="header-content">
          <a href="/" className="logo">
            <img src="/images/wtm_red_tspnt.PNG" alt="WTM Bama" className="logo-img" />
          </a>
          <nav className="desktop-nav">
            <Link to="/about">About</Link>
            <a href="https://www.wtmshop.com" target="_blank" rel="noopener noreferrer">Shop</a>
          </nav>
        </div>
      </header>

      <div className="permanent-nav-block">
        <Link to="/" className="permanent-nav-button">Home</Link>
        <Link to="/about" className="permanent-nav-button">About</Link>
        <a href="https://www.wtmshop.com" target="_blank" rel="noopener noreferrer" className="permanent-nav-button">Shop</a>
      </div>

      <main className="main">
        <section className="hero">
          <div className="container">
            <h1>What's The Move?</h1>
            <p>Discover the best bars and deals in Tuscaloosa. Find your perfect spot for any day of the week.</p>
          </div>
        </section>

        <div className="container">
          {Object.entries(groupedBars).map(([location, locationBars]) => (
            <section key={location} className="location-section" id={location}>
              <div className="location-header">
                <h2 className="location-title">{location}</h2>
              </div>
              <div className="bars-grid">
                {locationBars.map(bar => (
                  <BarCard
                    key={bar.id}
                    bar={bar}
                    todaysDeals={getTodaysDeals(bar.slug)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage
