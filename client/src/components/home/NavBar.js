import React from 'react'
import LinkButton from './LinkButton'

export default function NavBar() {
  return (
    <div className='nav-bar'>
        <LinkButton name="Movies" navlink={'/movies'} />
        <LinkButton name="TV Shows" navlink={'/tv-shows'} />
        <LinkButton name="Live" navlink={'/live'} />
        <LinkButton name="Others" navlink={''} />
    </div>
  )
}
