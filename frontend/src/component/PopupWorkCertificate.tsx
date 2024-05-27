import React, {FormEvent, useState} from "react";
import  '../Styles/popWorkCertificate.css'
import useAddRequest from "../hooks/useAddRequest";


interface PopupWorkCertificate{
isOpen:boolean;
onClose:()=>void;    
}

const PopupWorkCertificate: React.FC<PopupWorkCertificate> =  ({isOpen, onClose})=>{


const {cin, setCin, reason, setReason, addWorkCertificate} = useAddRequest()    
const [error, setError] = useState<string>()    


const handleSubmit = async(e:FormEvent)=>{

e.preventDefault()

const response = await addWorkCertificate(cin, reason)

if(response){
setError(response)
}
else{
onClose()
setError("")
setCin("")
setReason("")
}

}



if (!isOpen) return null


return(<>
<div className="bg" onClick={()=>{onClose();setError("");setCin("");setReason("")}}>
<button onClick={()=>{onClose();setError("");setCin("");setReason("")}} className="btnCloseCetificate">x</button>     
</div>

<div className="popCertificate">
<form onSubmit={handleSubmit}>

<div style={{marginBottom:"10px"}}>
<label htmlFor="formCin" className="form-label">CIN</label>
<input type="text" className="form-control" onChange={(e)=>{setCin(e.target.value)}}/>
</div>

<div>
<label htmlFor="formReason" className="form-label">Reason</label>
<input type="text" className="form-control" onChange={(e)=>{setReason(e.target.value)}}/>    
</div>

<p className={error?"errorCertificate":""}>  {error?error:""}  </p>
<button type="submit" className="buttonCertificate">+Add</button>

</form>
</div>

</>)

}

export default PopupWorkCertificate