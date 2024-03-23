import React from 'react'
import Image from 'next/image'
import logo from '../assets/logo.png'
import Link from 'next/link'

function NavBar() {
  return (
    <div>
        <div className="navBar">
            <div className="navBar1">
                <Link href="/"><Image className='logo' src={logo} /></Link>
            </div>
            <div className="navBar2">
                <Link href="/emergencyPatients" className='navLink'>Emergency Patients</Link>
                <Link href="/Availability" className='navLink'>Availability</Link>
                <Link href="/Appoinments" className='navLink'>Appoinments</Link>
                <Link href="/" className='navLink'>Medical Simulator</Link>
            </div>
        </div>
    </div>
  )
}

export default NavBar