import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './BarDetail.css'

const BarDetail = () => {
  const { slug } = useParams()
  const [bar, setBar] = useState(null)
  const [deals, setDeals] = useState(null)
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    fetchBarData()
  }, [slug])

  const fetchBarData = async () => {
    try {
      setLoading(true)
      
      // Fetch bar info
      const { data: barData, error: barError } = await supabase
        .from('bar_info')
        .select('*')
        .eq('slug', slug)
        .single()

      if (barError) throw barError

      // Fetch deals for this bar
      const { data: dealsData, error: dealsError } = await supabase
        .from('deals')
        .select('*')
        .eq('slug', slug)
        .single()

      if (dealsError) throw dealsError

      // Fetch events for this bar
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('slug', slug)
        .order('event_date', { ascending: true })

      if (eventsError) {
        console.warn('Error fetching events:', eventsError)
        // Don't throw error for events, just log it
      }

      setBar(barData)
      setDeals(dealsData)
      setEvents(eventsData || [])
    } catch (err) {
      console.error('Error fetching bar data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const getDayDeals = (day) => {
    if (!deals) return { everyday: [], daily: [] }
    const dayDeals = deals[day.toLowerCase()] || []
    const everydayDeals = deals.everyday || []
    return { 
      everyday: everydayDeals, 
      daily: dayDeals,
      day: day
    }
  }

  const getTodaysDeals = () => {
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const today = dayNames[new Date().getDay()]
    return getDayDeals(today)
  }

  if (loading) {
    return (
      <div className="loading">
        <h2>Loading bar details...</h2>
      </div>
    )
  }

  if (error || !bar) {
    return (
      <div className="bar-detail-page">
        <header className="header">
          <div className="header-content">
            <Link to="/" className="logo">
              <img src="/images/wtm_red_tspnt.PNG" alt="WTM Bama" className="logo-img" />
            </Link>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className="desktop-nav">
              <Link to="/about">About</Link>
              <a href="https://www.wtmshop.com" target="_blank" rel="noopener noreferrer">Shop</a>
            </nav>
          </div>
        </header>

        {mobileMenuOpen ? (
          <div className="mobile-menu-block">
            <Link 
              to="/" 
              className="mobile-menu-button"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="mobile-menu-button"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
            >
              About
            </Link>
            <a 
              href="https://www.wtmshop.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mobile-menu-button"
              onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
            >
              Shop
            </a>
          </div>
        ) : null}

        <main className="main">
          <div className="container">
            <div className="error-page">
              <div className="error-content">
                <h1>Oops! We're missing some info</h1>
                <p>It seems like we don't have this information at the moment... please check back soon for updates!</p>
                <div className="error-actions">
                  <Link to="/" className="btn btn-primary">Back to Home</Link>
                  <Link to="/about" className="btn btn-secondary">About Us</Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <div className="bar-detail-page">
      <header className="header">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/images/wtm_red_tspnt.PNG" alt="WTM Bama" className="logo-img" />
          </Link>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <nav className="desktop-nav">
            <Link to="/about">About</Link>
            <a href="https://www.wtmshop.com" target="_blank" rel="noopener noreferrer">Shop</a>
          </nav>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-menu-block">
          <Link 
            to="/" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            About
          </Link>
          <a 
            href="https://www.wtmshop.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-menu-button"
            onClick={() => setTimeout(() => setMobileMenuOpen(false), 100)}
          >
            Shop
          </a>
        </div>
      )}

      <main className="main">
        <div className="container-full">
          <Link to="/" className="back-link">
            ← Back to all bars
          </Link>

          <div className="bar-detail">
            <h1 className="bar-detail-name">{bar.full_name}</h1>
            
            <div className="bar-info">
              <p className="bar-detail-location"><strong>Location:</strong> {bar.location}</p>
              {bar.address && (
                <p className="bar-address"><strong>Address:</strong> {bar.address}</p>
              )}
              {bar.instagram && (
                <p className="bar-instagram">
                  <strong>Instagram:</strong> 
                  <a 
                    href={`https://instagram.com/${bar.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    @{bar.instagram}
                  </a>
                </p>
              )}
            </div>

            <div className="events-section">
              <h2>Upcoming Events</h2>
              {events && events.length > 0 ? (
                <div className="events-list">
                  {events.map((event, index) => (
                    <div key={index} className="event-item">
                      <div className="event-header">
                        <h3 className="event-name">{event.event_name}</h3>
                        <span className="event-date">
                          {new Date(event.event_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      {event.event_details && (
                        <p className="event-details">{event.event_details}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-events">No upcoming events</p>
              )}
            </div>

            <h2>Weekly Deals</h2>
            <div className="deals-grid">
              {dayNames.map(day => {
                const dayData = getDayDeals(day.toLowerCase())
                const hasEverydayDeals = dayData.everyday && dayData.everyday.length > 0
                const hasDailyDeals = dayData.daily && dayData.daily.length > 0
                const hasAnyDeals = hasEverydayDeals || hasDailyDeals
                
                return (
                  <div key={day} className="day-deals-box">
                    <h3 className="day-title">{day}</h3>
                    {hasAnyDeals ? (
                      <div className="deals-container">
                        {hasEverydayDeals && (
                          <div className="deal-group">
                            <h4 className="deal-type-label">EVERYDAY:</h4>
                            <ul className="day-deals-list">
                              {dayData.everyday.map((deal, index) => (
                                <li key={index}>{deal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {hasDailyDeals && (
                          <div className="deal-group">
                            <h4 className="deal-type-label">{day.toUpperCase()}:</h4>
                            <ul className="day-deals-list">
                              {dayData.daily.map((deal, index) => (
                                <li key={index}>{deal}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="no-deals">No deals</p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default BarDetail
