import React from 'react'
import logoImage2 from '../../img/bx_dumbbell2.png'

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img src={logoImage2} alt="Logo-Progfit" className="h-8 w-8" />
      <p className=" font-bold text-black text-2xl" style={{fontFamily: 'Montserrat, sans-serif'}}>ProgFit</p>
    </div>
  )
}