import React, {FormEvent, useState} from "react";
import  '../Styles/popPayslip.css'
import useAddRequest from "../hooks/useAddRequest"


interface PopupPayslip{
isOpen:boolean;
onClose:()=>void;
}


const PopupPayslip: React.FC<PopupPayslip> = ({isOpen, onClose})=>{


const {addPayslip} = useAddRequest() 
const [error, setError] = useState<string>('') 

const handleSubmit = async (e: FormEvent) => {
e.preventDefault();

const response = await addPayslip()

if(response) {
setError(response)
}
else{
onClose();
}

};


if (!isOpen) return null

return(<>
<div className="bg" onClick={()=>{onClose();setError("");}}>

</div>

<div className="popPayslip">

<form onSubmit={handleSubmit}>
<p>Do you want to add a payslip request ?</p>
<p className={error?"errorPayslip":""}>  {error ? error:""}  </p> 
<button type="submit" className="buttonAddPayslip">+Add</button>
<button type="button" onClick={()=>{onClose();setError("")}} className="buttonNo">No</button>

</form>

</div>

</>)


}

export default PopupPayslip


















