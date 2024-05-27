import React, {FormEvent, useState} from "react"
import "../Styles/popRequestInfo.css"
import { format } from "date-fns";


interface RequestInfo {
requestType: string;
amount: number;
cin: string;
reason: string;
leaveType: string;
startDate: string;
endDate: string;
}

interface PopupupRequestInfo{
isOpen:boolean;
onClose:()=>void;
requestInfo:RequestInfo
}


const PopupupRequestInfo: React.FC<PopupupRequestInfo> = ({isOpen, onClose, requestInfo})=>{



if (!isOpen) return null    

return(<>
<div className="bg" onClick={()=>{onClose()} }>
<button onClick={()=>{ onClose()}} className="btnCloseInfo">x</button>     
</div>

<div className="table-responsive reqTable popInfo" >

<table className="table">

<thead>
<tr>
{
requestInfo.requestType=="Work Certificate" && 
<>
<th>CIN</th>
<th>Reason</th>
</> 
}

{
requestInfo.requestType=="Salary Advance" && 
<>
<th>Amount</th>
</>
}

{
requestInfo.requestType=="Leave" &&
<>
<th>Leave Type</th>
<th>Start Date</th>
<th>End Date</th>
</>
}

</tr>
</thead>

<tbody>

<tr>
{
requestInfo.requestType=="Work Certificate" && <>
<td>{requestInfo.cin}</td> 
<td>{requestInfo.reason}</td>
</> 
}

{
requestInfo.requestType=="Salary Advance" && 
<>
<td> {requestInfo.amount} dt</td>
</>
}

{
requestInfo.requestType=="Leave" &&
<>
<td>{requestInfo.leaveType}</td>
<td>{format(new Date(requestInfo.startDate), "dd/MM/yyyy" )}</td>
<td>{format(new Date(requestInfo.endDate), "dd/MM/yyyy" )} </td>
</>
}
</tr>


</tbody>

</table>

</div>


</>)


}


export default PopupupRequestInfo






















