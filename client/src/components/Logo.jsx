import React from 'react'
import logoImage from '../../img/bx_dumbbell.png'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage} alt="Logo-Progfit" className="h-8 w-8" />
      <p className=" font-bold text-white text-2xl" style={{fontFamily: 'Montserrat, sans-serif'}}>ProgFit</p>
    </div>
  )
}
