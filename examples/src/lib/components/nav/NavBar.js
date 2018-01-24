import React from 'react'
import {
  Link
} from 'react-router-dom'

import './NavBar.css'

export default ({ nav }) => {

  return (
    <div className="navbar">
      <ul>
      {
        nav.map(({link, title}, index) => (
          <li key={index}><Link to={link}>{title}</Link></li>
        ))
      }    
      </ul>
    </div>
  )
}