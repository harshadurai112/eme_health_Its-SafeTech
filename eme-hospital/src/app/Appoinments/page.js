'use client'
import React, { useEffect, useState } from 'react'
import NavBar from '../../../components/NavBar'
import AppoinmentCard from '../../../components/AppoinmentCard'
import axios from 'axios';



function Appoinments() {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(false)
    const [view, setView] = useState(false)
    
    useEffect(() => {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("name");
        setLoading(true)
        axios.get(`http://192.168.222.100:3000/getPatientDetails/${c}`).then((data) => {
            setLoading(false)
            setData(data.data[0])
            console.log(data.data);
        })
    }, [])

    if(loading) {
        return <div>Loading..</div>
    }
  return (
    <div>
        <NavBar/>

    <div className="emePatientsDiv">
      <p className='emePatHead'>Appoinments</p>

      {
        data ?
        <div className="emePatCardDiv">
            <AppoinmentCard name={data.fullName} phone={data.phoneNumber} handleAppointment={() => setView(true)}/>
        </div> : null
      }
    </div>

    {
        data && view ?
            <div className="appoinmentFormDiv">
                <h2 className='appHead'>Appoinment Form</h2>
                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Name</p>
                        <div className="value">{data.fullName}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>DOB</p>
                        <div className="value">{data.dob}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Gender</p>
                        <div className="value">{data.gender}</div>
                    </div>
                </div>

                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Marital Status</p>
                        <div className="value">{data.maritalStatus}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Is the patient under 18 years?</p>
                        <div className="value">{data.minor}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Parent/Guardian Name</p>
                        <div className="value">{data.guardianName}</div>
                    </div>
                </div>

                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Employment Status of patient</p>
                        <div className="value">{data.patientEmploymentStatus}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Phone Number</p>
                        <div className="value">{data.phoneNumber}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Email</p>
                        <div className="value">{data.email}</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">{data.address}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">{data.address}</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">{data.postalCode}</div>
                    </div>
                </div>

                <h2 className='appHead'>Emergency Contacts - Person 1</h2>

                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Full Name</p>
                        <div className="value">ABC</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Relationship to Patient</p>
                        <div className="value">Friend</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Phone Number</p>
                        <div className="value">9498823365</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Email</p>
                        <div className="value">ABC@gmail.com</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">Ganapathy nagar, Coimbatore, TN</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">641664</div>
                    </div>
                </div>

                <h2 className='appHead'>Emergency Contacts - Person 2</h2>

                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Full Name</p>
                        <div className="value">ABC</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Relationship to Patient</p>
                        <div className="value">Friend</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Phone Number</p>
                        <div className="value">9498823365</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="contentWrap">
                        <p className='heading'>Email</p>
                        <div className="value">ABC@gmail.com</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">Ganapathy nagar, Coimbatore, TN</div>
                    </div>
                    <div className="contentWrap">
                        <p className='heading'>Address</p>
                        <div className="value">641664</div>
                    </div>
                </div>
                <button className='appdetBtn' onClick={() => setView(false)}>Close</button>
            </div> : null
        }
    </div>
  )
}

export default Appoinments