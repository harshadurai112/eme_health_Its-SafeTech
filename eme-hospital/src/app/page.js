"use client"
import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import EmergencyPatientCard from '../../components/EmergencyPatientCard';

function Page() {
  const [doctorAvailability, setDoctorAvailability] = useState(12);
  const [bedsAvailability, setBedsAvailability] = useState(21);
  const [emergencyPatients, setEmergencyPatients] = useState(3);
  const [dailyAppointments, setDailyAppointments] = useState(19);
  const [dischargedPatients, setDischargedPatients] = useState(2);

  // Function to generate random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Function to update state with random increments or decrements
  const updateRandomValue = (setter, value) => {
    const newValue = value + getRandomNumber(-2, 2); // Increment or decrement randomly by -2 to 2
    setter(newValue < 0 ? 0 : newValue); // Ensure value is not negative
  };

  useEffect(() => {
    const interval = setInterval(() => {
      updateRandomValue(setDoctorAvailability, doctorAvailability);
      updateRandomValue(setBedsAvailability, bedsAvailability);
      updateRandomValue(setEmergencyPatients, emergencyPatients);
      updateRandomValue(setDailyAppointments, dailyAppointments);
      updateRandomValue(setDischargedPatients, dischargedPatients);
    }, 2000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [doctorAvailability, bedsAvailability, emergencyPatients, dailyAppointments, dischargedPatients]);

  return (
    <div>
      <NavBar />

      <div className="analyticsDiv">
        <div className="analyticsCard">
          <p className='anaHead'>Doctor Availability</p>
          <p className='anaSubHead'>{doctorAvailability}</p>
        </div>

        <div className="analyticsCard">
          <p className='anaHead'>Beds Availability</p>
          <p className='anaSubHead'>{bedsAvailability}</p>
        </div>

        <div className="analyticsCard">
          <p className='anaHead'>Emergency Patients</p>
          <p className='anaSubHead'>{emergencyPatients}</p>
        </div>

        <div className="analyticsCard">
          <p className='anaHead'>Daily Appointments</p>
          <p className='anaSubHead'>{dailyAppointments}</p>
        </div>

        <div className="analyticsCard">
          <p className='anaHead'>Discharged Patients</p>
          <p className='anaSubHead'>{dischargedPatients}</p>
        </div>
      </div>

      <div className="emePatientsDiv">
        <p className='emePatHead'>Emergency Patients</p>

        <div className="emePatCardDiv">
          {/* Render EmergencyPatientCard component dynamically based on count */}
          {[...Array(emergencyPatients)].map((_, index) => (
            <EmergencyPatientCard key={index} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Page;
