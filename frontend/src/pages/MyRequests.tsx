import React from "react";
import "../Styles/myrequests.css"
import {Sidebar} from "../component/Sidebar"
import { useMyRequests } from "../hooks/useMyRequests";
import { format } from 'date-fns';
import PopupPayslip from "../component/PopupPayslip"
import usePopup from '../hooks/usePopup';


const MyRequests = ()=>{

const {requests, isloading, error} = useMyRequests()
const {isPopupOpen, openPopup, closePopup} = usePopup()


return (

<div className="d-flex flex-row">
<Sidebar/>
<div className="divContainer">

<div className="requests">
<button onClick={openPopup}><img  src="./images/payslip.png"  style={{width:"30px",height:"30px"}}  /><p>Payslip</p></button>
<button><img  src="./images/reimbursement.png"  style={{width:"35px",height:"35px"}}  /><p>Insurance Reimbursement</p></button>
<button><img  src="./images/salary.png"  style={{width:"30px",height:"30px"}}  /><p>Salary Advance</p></button>
<button><img  src="./images/certificate.png"  style={{width:"30px",height:"30px"}}  /><p>Work Certificate</p></button>
<button style={{marginRight:"0"}}><img  src="./images/leave.png"  style={{width:"30px",height:"30px"}}  /> <p>Leave request</p></button>
</div>



<div className="table-responsive reqTable" >
        <table className="table">



          <thead>
            <tr>
              
              <th>Request</th>
              <th>Date</th>
              <th>Status</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
           
{
requests.map((request, index)=>(<tr key={request._id}>
 
<td>{request.requestType}</td>  
<td>{format(new Date(request.requestDate), "dd/MM/yyyy, HH:mm" )}</td> 
<td>{request.status}</td> 
<td className="action"><a>Show</a> / <a>Cancel</a></td>
</tr>))

}

            
          </tbody>
        </table>
      </div>



</div>

<PopupPayslip  isOpen={isPopupOpen} onClose={closePopup}/>

</div>


)


}

export default MyRequests;