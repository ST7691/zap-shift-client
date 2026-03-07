import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router'

const ZapShip = () => {
  return (
    <Link to={'/'}>
      <div className="flex items-end">
        <img src={logo} alt="" />
        <p className="text-2xl lg:text-4xl font-extrabold -ml-3">ZapShift</p>
      </div>
    </Link>
  );
}

export default ZapShip