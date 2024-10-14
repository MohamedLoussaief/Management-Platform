import React, { useState } from "react"
import {Sidebar} from "../component/Sidebar"
import '../Styles/requests.css'
import { useRequests } from "../hooks/useRequests"
import { format } from "date-fns"
import useDecodedToken from "../hooks/useDecodedToken"
import PopupValidate from "../component/PopupValidate"
import usePopup from "../hooks/usePopup"
import PopupShow from "../component/PopupShow"
import { useValidateRequest } from "../hooks/useValidateRequest"



const Requests = ()=>{



interface leaveInfo{
id_emp: string, 
id_depart:string, 
startDate:string, 
endDate:string,
leaveType:string,
} 


interface requestInfo{
_id:string;    
requestType: string;
amount: number;
cin: string;
reason: string;
leaveType: string;
startDate: string;
endDate: string;
document:string;
substituteName:string
}


const {requests, isloading, error} = useRequests()
const {isPopupOpen, openPopup, closePopup} = usePopup()
const [requestType, setRequestType] = useState<string>("")
const [requestUserType, setRequestUserType] = useState<string>("")
const [requestId, setRequestId] = useState<string>("")

const [leaveInfo, setLeaveInfo] = useState<leaveInfo>({ 
id_emp: "", 
id_depart:"", 
startDate:"", 
endDate:"",
leaveType:""
})


const [requestInfo, setRequestInfo] = useState<requestInfo>({
_id:"",    
requestType:"",
amount:0,
cin:"",
reason: "",
leaveType:"",
startDate:"",
endDate:"",
document:"",
substituteName:""
})

const [popupType, setPopupType] = useState<string>("")

const decodedToken = useDecodedToken()

const {cancelRequest} = useValidateRequest()



const [employeeFilter, setEmployeeFilter] = useState("");
const [departmentFilter, setDepartmentFilter] = useState("");


// Extract unique department names for the filter options
const uniqueDepartments = Array.from(
new Set(requests.map((request) => request.departmentDetails.departName))
);

// Extract unique employee names based on the selected department
const uniqueEmployees = departmentFilter ? Array.from(
new Set(requests.filter((request) => request.departmentDetails.departName === departmentFilter).map((request) =>
`${request.userDetails.firstName} ${request.userDetails.lastName}`))): [];

// Filter requests based on the selected filters
const filteredRequests = requests.filter((request) => {
return (
(employeeFilter === "" ||
`${request.userDetails.firstName} ${request.userDetails.lastName}` === employeeFilter) && (departmentFilter === "" ||
request.departmentDetails.departName === departmentFilter)
);
});



const handleOpenPopup =(requestType:string, requestUserType:string, requestId:string)=>{
setPopupType("validate")    
setRequestId(requestId)    
setRequestUserType(requestUserType)
setRequestType(requestType)
openPopup()
}

const handleOpenPopupLeave = (requestType:string, requestUserType:string, requestId:string, 
id_emp:string, id_depart:string, startDate:string, 
endDate:string, leaveType:string)=>{
setPopupType("validate")   
setRequestId(requestId)    
setRequestUserType(requestUserType)
setRequestType(requestType)
setLeaveInfo({
id_emp: id_emp, 
id_depart: id_depart, 
startDate: startDate, 
endDate: endDate,
leaveType:leaveType
})

openPopup()

}


const handleShowInfo = (_id: string, requestType: string, amount: number, cin: string, reason: string, 
leaveType: string, startDate: string, endDate: string, document:string, substituteName:string)=>{

setPopupType("show")   
setRequestInfo({
_id:_id,    
requestType:requestType,
amount:amount,
cin:cin,
reason:reason,
leaveType:leaveType,
startDate:startDate,
endDate:endDate,
document:document,
substituteName:substituteName
})

openPopup()

}


const handleCancel = async(id:string)=>{

if(window.confirm("Are you sure you want to cancel this request") == true){

const response = await cancelRequest(id)  
  
if(response){

alert(response)

}

}

}






return (
<div className="d-flex flex-row reqContainer">

<Sidebar/>


<div className="tableContainer">
<div className="d-flex flex-row justify-content-between">
<h1 className="align-self-center">Requests</h1>
{decodedToken?.userType === "Admin" && (
<div className="align-self-end me-5 d-flex">
<select value={departmentFilter} onChange={(e) => {
setDepartmentFilter(e.target.value); setEmployeeFilter(""); 
}} className="me-2">
<option value="">All Departments</option>
{uniqueDepartments.map((department, index) => (
<option key={index} value={department}>
{department}
</option>
))}
</select>
<select
value={employeeFilter}
onChange={(e) => setEmployeeFilter(e.target.value)}
>
<option value="">All Employees</option>
{uniqueEmployees.map((employee, index) => (
<option key={index} value={employee}>
{employee}
</option>
))}
</select>
</div>
)}


</div>

<div className="table-responsive reqTable">


<table className="table">

<thead>
<tr>
<th>Request</th>
<th>FullName</th>
<th>Role</th>
<th>Department</th>
<th>Status</th>
<th>Date</th>
<th>Action</th>
</tr>
</thead>
<tbody>



{

filteredRequests.map((request)=>(


<tr key={request._id}>
 
 <td>{request.requestType}</td>  
 <td> {request.userDetails.firstName} {request.userDetails.lastName}</td> 
 <td> {request.userDetails.userType}  </td> 
 <td> {request.departmentDetails.departName}  </td>
 <td> {request.status}  </td>
 <td>  {format(new Date(request.requestDate), "dd/MM/yyyy, HH:mm" )}   </td>
 <td className="d-flex flex-row actionReq"> { request.requestType!=="Payslip" &&  
 <a onClick={()=>{handleShowInfo(request._id, request.requestType, request.amount, request.cin, request.certificateReason,    
 request.leaveType, request.startDate, request.endDate, request.document, request.substituteName)} }><img src="../images/visual.png" 
 className="mt-1 me-1"style={{width:"20px",height:"20px"}} alt="Show"/><p style={{color:"blue"}}>Show</p> </a>  }
 
 {!(decodedToken?.userType === "Admin" &&
request.userDetails.userType === "Employee" &&
request.status === "Awaiting") && (
<>
<a onClick={()=>{ request.requestType!=="Leave"?
handleOpenPopup(request.requestType, request.userDetails.userType, request._id):
handleOpenPopupLeave(request.requestType, request.userDetails.userType, request._id, request.userDetails._id, 
request.departmentDetails._id, request.startDate, 
request.endDate, request.leaveType)   } }>
<img src="../images/accept.png" className="me-1" style={{ width: "23px", height: "23px" }} alt="Validate"/>
<p style={{ color: "#4fc123" }}>Validate</p>
</a>
<a onClick={()=>handleCancel(request._id)}>
<img
src="../images/cancel.png"
className="me-1"
style={{ width: "20px", height: "20px" }}
alt="Cancel"/>
<p style={{ color: "#e21b1b" }}>Cancel</p>
</a>
</>
)}

{
(request.requestType=="Payslip"&&decodedToken?.userType === "Admin"
&&request.userDetails.userType === "Employee" && request.status === "Awaiting") && <b>No Action</b>
}


</td>
 </tr>


))


}

            
</tbody>
</table>

</div>

</div>


{ 

popupType=="validate" &&    <PopupValidate isOpen={isPopupOpen} onClose={closePopup} requestType={requestType} requestId={requestId}
requestUserType={requestUserType} leaveInfo={leaveInfo} />

 }

{

popupType=="show" && <PopupShow isOpen={isPopupOpen} onClose={closePopup} requestInfo={requestInfo} /> 



}


</div>
)

}

export default Requests 





