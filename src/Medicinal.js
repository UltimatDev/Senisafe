
import React from 'react';
import FHIRPersonData from './components/fhirdata';
function Medicinal () {

  return (
    <div className="medical-records">
      <h2>Medical Records</h2>
      <p>Here you can view and manage your medical records.</p>
  
    <div>
      <h1>FHIR Data Viewer</h1>
      <FHIRPersonData  />
    </div>
  
    </div>
  );
}

export default Medicinal;
