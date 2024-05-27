import React, { useState } from "react"
import "../Styles/myrequests.css"
import {Sidebar} from "../component/Sidebar"
import { useMyRequests } from "../hooks/useMyRequests"
import { format } from 'date-fns'
import PopupPayslip from "../component/PopupPayslip"
import PopupInsurance from "../component/PopupInsurance"
import PopupSalary from '../component/PopupSalary'
import PopupWorkCertificate from "../component/PopupWorkCertificate"
import PopupLeave from "../component/PopupLeave"
import PopupupRequestInfo from "../component/PopupRequestInfo"
import usePopup from '../hooks/usePopup';
import useDeleteRequest from "../hooks/useDeleteRequest"
import { useNavigate } from "react-router-dom"

const MyRequests = ()=>{


interface RequestInfo {
requestType: string;
amount: number;
cin: string;
reason: string;
leaveType: string;
startDate: string;
endDate: string;
}

const {requests, isloading, error} = useMyRequests()
const {isPopupOpen, openPopup, closePopup} = usePopup()
const [popupType, setPopupType] = useState<string>("")
const {deleteRequest} = useDeleteRequest()
const [requestInfo, setRequestInfo] = useState<RequestInfo>({
requestType: "",
amount: 0,
cin: "",
reason: "",
leaveType: "",
startDate: "",
endDate: ""
});






const handleOpenPopup =(type:string)=>{

setPopupType(type)
openPopup()

}


const handleOpenRequestInfo =(type:string, requestInfo:RequestInfo)=>{

setPopupType(type)
setRequestInfo(requestInfo)
openPopup()

}



const handleDelete = async(id:string)=>{


if(window.confirm("Are you sure you want to cancel this request") == true){

const response = await deleteRequest(id)  
  
if(response){

alert(response)

}

}

}




return (

<div className="d-flex flex-row">
<Sidebar/>
<div className="divContainer">

<div className="requests">
<button onClick={()=>handleOpenPopup("payslip")}><img  src="./images/payslip.png"  style={{width:"30px",height:"30px"}}  /><p>Payslip</p></button>
<button onClick={()=>handleOpenPopup("insurance")}><img  src="./images/reimbursement.png"  style={{width:"35px",height:"35px"}}  /><p>Insurance Reimbursement</p></button>
<button onClick={()=>handleOpenPopup("salary")}><img  src="./images/salary.png"  style={{width:"30px",height:"30px"}}  /><p>Salary Advance</p></button>
<button onClick={()=>handleOpenPopup("certificate")}><img  src="./images/certificate.png"  style={{width:"30px",height:"30px"}}  /><p>Work Certificate</p></button>
<button onClick={()=>handleOpenPopup("leave")} style={{marginRight:"0"}}><img  src="./images/leave.png"  style={{width:"30px",height:"30px"}}  /> <p>Leave request</p></button>
</div>



<div className="table-responsive reqTable" >
        <table className="table">



          <thead>
            <tr>
              <th>Request</th>
              <th>Date</th>
              <th>Status</th>
              <th>action</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
           
{
requests.map((request, index)=>(<tr key={request._id}>
 
<td>{request.requestType}</td>  
<td>{format(new Date(request.requestDate), "dd/MM/yyyy, HH:mm" )}</td> 
<td>{request.status}</td> 
<td className="action"> {["Salary Advance", "Work Certificate", "Leave"].includes(request.requestType) && <a className="me-2" onClick={()=>
{handleOpenRequestInfo("requestInfo", {requestType:request?.requestType,
amount: request?.amount,
cin: request?.cin,
reason: request?.certificateReason,
leaveType: request?.leaveType,
startDate: request?.startDate,
endDate: request?.endDate})  }}>Details</a>  }  {request.status!=="Validated" && <a onClick={()=>{handleDelete(request._id)}}>Cancel</a>}</td>

<td> {(request.status=="Validated" && request.requestType=="Work Certificate" ) && 
 <button className="btnResult">Work Certificate</button> }  

{(request.status=="Validated" && request.requestType=="Leave" ) && 
<button className="btnResult">Leave Document</button>}

{(request.status=="Validated" && request.requestType=="Payslip" ) && 
<button className="btnResult">Download document</button> }

{(request.status=="Validated" && request.requestType=="Insurance Reimbursement" ) && 
<p>Your Insurance Reimbursement request is validated ! </p> }

{(request.status=="Validated" && request.requestType=="Salary Advance" ) && 
<p>Your Salary Advance request is validated ! </p> }

{(request.status=="Canceled") && 
<p>Your {request.requestType} request is Canceled ! </p> }

</td>

</tr>))

}

            
          </tbody>
        </table>
      </div>



</div>
{popupType === "payslip" && <PopupPayslip  isOpen={isPopupOpen} onClose={closePopup}/>}
{popupType === "insurance" && <PopupInsurance isOpen={isPopupOpen} onClose={closePopup}/>}
{popupType === "salary" && <PopupSalary isOpen={isPopupOpen} onClose={closePopup}/>}
{popupType === "certificate"  && <PopupWorkCertificate isOpen={isPopupOpen} onClose={closePopup}/>}
{popupType === "leave" && <PopupLeave isOpen={isPopupOpen} onClose={closePopup}/>}
{popupType === "requestInfo" && <PopupupRequestInfo isOpen={isPopupOpen} onClose={closePopup} requestInfo={requestInfo}  />}

</div>


)


}

export default MyRequests;