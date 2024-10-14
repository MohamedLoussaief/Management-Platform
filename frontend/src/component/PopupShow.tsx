import React, {ChangeEvent, FormEvent, useState} from "react";
import useDecodedToken from "../hooks/useDecodedToken";
import { format } from "date-fns";
import { useDownloadDocument } from "../hooks/useDownloadDocument";



interface requestInfo{
_id:string,    
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

interface PopupShow{
isOpen:boolean,
onClose:()=>void,    
requestInfo:requestInfo;
}



const PopupShow:React.FC<PopupShow> = ({isOpen, onClose, requestInfo})=>{

const  {downloadDocument} = useDownloadDocument() 





const handleDownload = async(e: React.FormEvent<HTMLFormElement>)=>{

e.preventDefault()

await downloadDocument(requestInfo._id)


}






if (!isOpen) return null  

return(
<>
<div className="bg" onClick={()=>{onClose()} }>
<button onClick={()=>{ onClose()}} className="btnCloseInfo">x</button>     
</div>

<div className="table-responsive reqTable popInfo" >

<table className="table">

<thead>
<tr>
{
requestInfo.requestType=="Salary Advance"&&
<>
<th>Amount</th>
</>
}

{
requestInfo.requestType=="Leave"&&

<>
<th>Leave Type</th>
<th>Start Date</th>
<th>End Date</th>
{requestInfo.substituteName&& <th>name of the substitute</th>}
</>

}

{
requestInfo.requestType=="Insurance Reimbursement"&&    
<>
<th>Document</th>
</>
}

{
requestInfo.requestType=="Work Certificate"&&
<>
<th>CIN</th>
<th>Reason</th>
</>

}

</tr>
</thead>

<tbody>

<tr>
{
requestInfo.requestType=="Salary Advance"&&
<>
<td>{requestInfo.amount}</td>
</>
}

{
requestInfo.requestType=="Leave"&&

<>
<td> {requestInfo.leaveType} </td>
<td> { format(new Date(requestInfo.startDate), "dd/MM/yyyy")}  </td>
<td>{ format(new Date(requestInfo.endDate), "dd/MM/yyyy")}</td>
{requestInfo.substituteName&& <td> {requestInfo.substituteName} </td>}
</>

}

{
requestInfo.requestType=="Insurance Reimbursement"&&    
<>
<td> 
<form onSubmit={handleDownload}>
<button type="submit">Download The Document</button>    
</form>    
</td>
</>
}

{
requestInfo.requestType=="Work Certificate"&&
<>
<td> {requestInfo.cin} </td>
<td> {requestInfo.reason} </td>
</>

}




</tr>


</tbody>

</table>

</div>


</>
)


}


export default PopupShow







