import React, {FormEvent, useState} from "react"
import '../Styles/popLeave.css'
import useAddRequest from "../hooks/useAddRequest"
import { format, addDays } from 'date-fns'

interface PopupLeave{
isOpen:boolean;
onClose:()=>void;    
}


const PopupLeave: React.FC<PopupLeave> = ({isOpen, onClose})=>{


const {leaveType, setleaveType, startDate, setStartDate, endDate, setEndDate, addLeave} = useAddRequest()
const [error, setError] = useState<string>()  


const handleSubmit = async(e:FormEvent)=>{

e.preventDefault()

const response = await addLeave(leaveType, startDate, endDate)

if(response){

setError(response)

}
else{
onClose()    
setError("")
setleaveType("")
setStartDate("")
setEndDate("")
}


}




if (!isOpen) return null

return(<>
<div className="bg" onClick={()=>{onClose();setError("");setleaveType("");setStartDate("");setEndDate("")}}>
<button onClick={()=>{onClose();setError("");setleaveType("");setStartDate("");setEndDate("")}} className="btnCloseCetificate">x</button>     
</div>

<div className="popLeave">

<form onSubmit={handleSubmit}>

<div style={{marginBottom:"10px"}}>
<label className="form-label" >Leave Type</label>
<div className="d-flex">
<div className="form-check me-5">
<input className="form-check-input" type="radio" name="leaveType" value="Paid" 
checked={leaveType === 'Paid'} onChange={(e)=>{setleaveType(e.target.value)}} />
<label className="form-check-label">Paid</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="leaveType" value="Unpaid" 
checked={leaveType === 'Unpaid'} onChange={(e)=>{setleaveType(e.target.value)}}/>
<label className="form-check-label">Unpaid</label>
</div>
</div>

</div>



<div style={{marginBottom:"10px"}}>
<label htmlFor="formStartDate" className="form-label">Start Date</label>
<input type="date" className="form-control" min={format(addDays(new Date(), 2), 'yyyy-MM-dd')} 
onChange={(e)=>{setStartDate(e.target.value)}}/>
</div>

<div>
<label htmlFor="formStartDate" className="form-label">End Date</label>
<input type="date" className="form-control" min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
onChange={(e)=>{setEndDate(e.target.value)}}/>
</div>


<p className={error?"errorLeave":""}>  {error?error:""}  </p>
<button type="submit" className="buttonLeave">+Add</button>

</form>

</div>


</>)


}


export default PopupLeave





























