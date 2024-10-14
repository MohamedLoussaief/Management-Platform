import React, {ChangeEvent, FormEvent, useState} from "react";
import "../Styles/popValidate.css"
import useDecodedToken from "../hooks/useDecodedToken";
import {useSubstituteNames} from "../hooks/useSubstituteNames"
import {useValidateRequest} from "../hooks/useValidateRequest"

interface leaveInfo{
id_emp: string, 
id_depart:string, 
startDate:string, 
endDate:string,
leaveType:string
} 


interface PopupValidate{
isOpen:boolean;
onClose:()=>void;
requestType:string;
requestUserType:string;
leaveInfo:leaveInfo,
requestId:string
}


const PopupValidate:React.FC<PopupValidate> = ({isOpen, onClose, requestType, requestUserType, requestId, leaveInfo})=>{


const decodedToken = useDecodedToken()

const {substituteNames, isloading, error} = useSubstituteNames(leaveInfo.id_emp, leaveInfo.id_depart, 
leaveInfo.startDate, leaveInfo.endDate)

const [substituteName, setSubstituteName] = useState<string>("")

const {validateRequest, file, setFile, validatePayslip} = useValidateRequest()

const [error1, setError1] = useState<string>("")


const handleSubmitRequest = async(e: FormEvent)=>{
e.preventDefault();


if(!substituteName && (requestType=="Leave") && ((decodedToken?.userType=="DepartHead" && requestUserType=="Employee") 
|| (decodedToken?.userType=="Admin" && requestUserType=="DepartHead")) ){

setError1("Please choose the substitute name")
return;
}



const response = await validateRequest(requestId, String(decodedToken?.userType), requestType, 
leaveInfo.leaveType, leaveInfo.startDate, leaveInfo.endDate, leaveInfo.id_emp, substituteName)

if(response) {
setError1(response)
}
else{
setSubstituteName("")    
onClose();
}

}


const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
if (event.target.files && event.target.files.length === 1) {
setFile(event.target.files[0]);
setError1('');
} else {
setFile(null);
setError1('Please select only one file');
}
}


const handleSubmitPayslip = async(e:FormEvent)=>{
e.preventDefault()

if(decodedToken?.userType=="Admin" && !file){
setError1("Please select a file")    
return
}


const response = await validatePayslip(requestId, file)

if(response){
setError1(response)    
}
else{
onClose()
setError1("")
setFile(null)
}

}








if (!isOpen) return null


return(<>

<div className="bg" onClick={()=>{onClose();setError1("");setSubstituteName("")}}>

</div>

<div className="popValidate">

<form onSubmit={(e)=>{requestType!=="Payslip"? handleSubmitRequest(e):handleSubmitPayslip(e)} }>
   
<p><b> Do you want to validate this {requestType} request ?</b> </p>

{
(decodedToken?.userType=="Admin" && requestType=="Payslip")&&

<div>
<label htmlFor="formFile" className="form-label">Upload the payslip document</label>
<input className="form-control" type="file" id="formFile" multiple={true} 
onChange={(e)=>{handleFileChange(e)}}/>    
</div>
} 


{

(( (decodedToken?.userType=="Admin" && requestUserType=="DepartHead") || 
(decodedToken?.userType=="DepartHead" && requestUserType=="Employee") ) && requestType=="Leave")?

<div className="mb-3">
<label className="form-label">Choose an employee for replacement</label>
<select value={substituteName}  onChange={(e)=>{setSubstituteName(e.target.value)}}>
<option value="">Choose an employee</option>    
{
substituteNames.map((substituteName)=>(

<option key ={substituteName.firstName + " " + substituteName.lastName} 
value={substituteName.firstName + " " + substituteName.lastName}>
{substituteName.firstName + " " + substituteName.lastName}</option>

))

}
</select>
</div>:null

}

<p style={{color:"red"}}> {error1 && error1} </p>
<button type="submit" className="buttonValidate">Validate</button>
<button type="button" onClick={()=>{onClose();setError1("")}} className="buttonNo">No</button>

</form>

</div>


</>)

}


export default PopupValidate