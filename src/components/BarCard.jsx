import { Link } from 'react-router-dom'
import './BarCard.css'

const BarCard = ({ bar, todaysDeals }) => {
  return (
    <Link to={`/bar/${bar.slug}`} className="bar-card-link">
      <div className="bar-card">
        <div className="bar-card-header">
          <h3 className="bar-name">{bar.full_name}</h3>
          <p className="bar-location">{bar.location}</p>
        </div>
        <div className="bar-deals">
          <h4 className="deals-title">Today's Deals</h4>
          {todaysDeals.length > 0 ? (
            <ul className="deals-list">
              {todaysDeals.slice(0, 3).map((deal, index) => (
                <li key={index}>{deal}</li>
              ))}
              {todaysDeals.length > 3 && (
                <li className="more-deals">+{todaysDeals.length - 3} more deals</li>
              )}
            </ul>
          ) : (
            <p className="no-deals">No deals today</p>
          )}
        </div>
      </div>
    </Link>
  )
}

export default BarCard
