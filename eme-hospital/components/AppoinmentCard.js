import React from 'react'

function AppoinmentCard({name, phone, handleAppointment}) {
  return (
    <div className='appCard'>
        <div className="appCard1">
            <p className='appName'>{name}</p>
            {/* <p className='appBlood'>B+</p> */}
        </div>

        <p className='appMobile'>{phone}</p>
        <p className='admiTime'>Feb 18, 2024</p>

        <div className="apptrackBtnDiv">
            <button className='appdetBtn' onClick={handleAppointment}>View Appoinment</button>
            {/* <button className='trackBtn'>Track Ambulance</button> */}
        </div>
    </div>
  )
}

export default AppoinmentCard