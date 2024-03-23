import React from 'react'

function EmergencyPatientCard({ handleGetDetails, name, bg, phone }) {
  return (
    <div className='emePatCard'>
        <div className="emePatCard1">
            <p className='patName'>{name}</p>
            <p className='patBlood'>{bg}</p>
        </div>

        <p className='patMobile'>{phone}</p>
        <p className='admiTime'>Feb 18, 2024</p>

        <div className="trackBtnDiv">
            <button className='detBtn' onClick={handleGetDetails}>Get Details</button>
            <button className='trackBtn'>Track Ambulance</button>
        </div>
    </div>
  )
}

export default EmergencyPatientCard