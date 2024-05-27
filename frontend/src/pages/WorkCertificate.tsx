import React, { useState } from "react"
import { useLocation } from 'react-router-dom';
import "../Styles/workCertif.css"


const WorkCertificate = ()=>{


return( <div className="certificate-container">
<header>
  <div className="company-logo">Company Logo</div>
  <div className="delivery-date"> deliveryDate </div>
</header>
<h1>Work Certificate</h1>
<p>
  I, the undersigned <span className="bold"> directorName </span>, General Director of the company <span className="bold">companyName</span>,
</p>
<p>
  hereby certify that <span className="bold"> employeeName </span>, holder of the identity card No. <span className="bold">idNumber</span>,
</p>
<p>
  is one of the permanent employees of our company as a <span className="bold"> employeeRole </span>, and has been since <span className="bold">registrationDate</span> until now.
</p>
<p>
  This certificate is issued at the request of the concerned party for <span className="bold"> requestReason </span>.
</p>
<footer>
  <div className="signature">
    General Director
    <br />
    Seal and signature
  </div>
</footer>
</div>)


}

export default WorkCertificate












