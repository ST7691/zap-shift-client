import React from 'react'
import { Outlet } from 'react-router'
import Nabver from '../Shared/Nabver'
import Footer from '../Shared/Footer'

const MainRoot = () => {
  return (
      <div>
          <Nabver></Nabver>
          <Outlet></Outlet>
          <Footer></Footer>
    </div>
  )
}

export default MainRoot