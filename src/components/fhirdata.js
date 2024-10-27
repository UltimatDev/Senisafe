import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FHIRPatientData = ({ patientId = 'example', fhirBaseUrl = "http://hapi.fhir.org/baseR4" }) => {
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(`${fhirBaseUrl}/Patient/${patientId}`, {
          headers: {
            'Content-Type': 'application/fhir+json'
          }
        });
        setPatientData(response.data);
        console.log(response);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPatientData();
  }, [patientId, fhirBaseUrl]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (

    <div>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patientData.name && patientData.name[0].text}</p>
      <p><strong>Gender:</strong> {patientData.gender}</p>
      <p><strong>Birth Date:</strong> {patientData.birthDate}</p>
    </div>
  );
};

export default FHIRPatientData;
