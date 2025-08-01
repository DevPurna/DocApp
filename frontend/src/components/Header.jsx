import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='p-6 bg-blue-300 rounded-b-lg'>
        <Link to="/">
            <h1 className='text-2xl font-bold text-gray-800'>Doc Appoint</h1>
        </Link>
    </div>
  )
}

export default Header