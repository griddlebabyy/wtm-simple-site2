import { Link } from 'react-router-dom'
import './BarCard.css'

const BarCard = ({ bar, todaysDeals, allDeals }) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const today = dayNames[new Date().getDay()]
  
  // Get all deals for the bar with proper labels
  const getAllDeals = () => {
    const allDealsList = []
    
    // Add everyday deals first with label
    if (allDeals.everyday && allDeals.everyday.length > 0) {
      allDealsList.push({
        type: 'everyday',
        deals: allDeals.everyday
      })
    }
    
    // Add today's specific deals with label
    if (allDeals[today] && allDeals[today].length > 0) {
      allDealsList.push({
        type: 'daily',
        day: today,
        deals: allDeals[today]
      })
    }
    
    return allDealsList
  }

  const dealsList = getAllDeals()

  return (
    <Link to={`/bar/${bar.slug}`} className="bar-card-link">
      <div className="bar-card">
        <div className="bar-card-header">
          <h3 className="bar-name">{bar.full_name}</h3>
          <p className="bar-location">{bar.location}</p>
        </div>
        <div className="bar-deals">
          <h4 className="deals-title">Today's Deals</h4>
          {dealsList.length > 0 ? (
            <div className="deals-container">
              {dealsList.map((dealGroup, index) => (
                <div key={index} className="deal-group">
                  <h5 className="deal-type-label">
                    {dealGroup.type === 'everyday' ? 'EVERYDAY:' : `${dealGroup.day.toUpperCase()}:`}
                  </h5>
                  <ul className="deals-list">
                    {dealGroup.deals.map((deal, dealIndex) => (
                      <li key={dealIndex}>{deal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-deals">No deals today</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default BarCard
