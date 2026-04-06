import React from 'react'
import { Link } from 'react-router'

export const PaymentCancelled = () => {
  return (
      <div>
          <h2>Paymet is cancelled .please try again</h2>
          <Link to={'/dashboard/myparcels'}>
              <button className='btn btn-primary text-black'>Try Again</button>
          </Link>
    </div>
  )
}
