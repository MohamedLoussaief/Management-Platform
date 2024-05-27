import React, {ChangeEvent, FormEvent, useState} from "react";
import  '../Styles/popSalary.css'
import useAddRequest from "../hooks/useAddRequest"

interface PopupSalary{
isOpen:boolean;
onClose:()=>void;    
}



const PopupSalary: React.FC<PopupSalary> =  ({isOpen, onClose})=>{


const {addSalary, amount, setAmount} = useAddRequest()
const [error, setError] = useState<string>('')


const handleSubmit = async (e: FormEvent) => {

e.preventDefault()

const response = await addSalary(amount)

if(response){
setError(response)    
}
else{
onClose()
setError("")
setAmount(100)
}

}


if (!isOpen) return null


return(<>
<div className="bg" onClick={()=>{onClose();setError("");setAmount(100)}}>
<button onClick={()=>{onClose();setError("");setAmount(100)}} className="btnCloseSalary">x</button>     
</div>

<div className="popSalary"> 

<form onSubmit={handleSubmit}>

<div>
<label htmlFor="formFile" className="form-label">Amount</label>
<input type="number" className="form-control" min={50} step={10} value={amount} onChange={(e)=>{setAmount(Number(e.target.value))}}/>    
</div>

<p className={error?"errorSalary":""}>  {error?error:""}  </p>
<button type="submit" className="buttonAddSalary">+Add</button>

</form>

</div>
</>)


}


export default PopupSalary



















