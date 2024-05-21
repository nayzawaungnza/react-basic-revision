import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layouts() {
  return (
    <div>
      <nav>
        <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/create'>Create</a></li>
            <li><a href='/search'>Search</a></li>
        </ul>
      </nav>
      <Outlet/>
      </div>
  )
}
