"use client"
import React, { useEffect } from 'react'
import NavBar from '../../../components/NavBar'
import { useState } from 'react';
import EmergencyPatientCard from '../../../components/EmergencyPatientCard'
import axios from 'axios';
import { useRouter } from 'next/navigation';

function emergencyPatients() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [isOpen, setOpen] = useState(false)
  const [currentName, setCurrentName] = useState('')
  useEffect(() => {
    axios.get('http://192.168.222.100:3000/emergency').then((items) => {
      setData(items.data)
    })
  }, [])
  return (
    <div><div>
    <NavBar/>

    <div className="emePatientsDiv">
      <p className='emePatHead'>Emergency Patients</p>

      <div className="emePatCardDiv">
        {
          data && data.map((item, i) => (
            <EmergencyPatientCard key={i} bg={item.bloodGroup} name={item.name} phone={item.phoneNumber} handleGetDetails={() => {
              setOpen(true)
              setCurrentName(item.name)
            }
            }/>
          ))
        }
      </div>
    </div>

        {
          isOpen ?
          <div className="emePopUp">
            <div className="popupContent">
              {/* <button className="closeButton">
                Close
              </button> */}
              <button className="detBtn">Access Medical Records</button>
              <button className="detBtn" onClick={() => router.push(`/Appoinments?name=${currentName}`)}>Complete Registration</button>
              <button className="detBtn" onClick={() => setOpen(false)}>Close</button>
            </div>
          </div> : null
        }

      </div>

  </div>
  )
}

export default emergencyPatients
