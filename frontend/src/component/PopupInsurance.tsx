import React, {ChangeEvent, FormEvent, useState} from "react";
import  '../Styles/popInsurance.css'
import useAddRequest from "../hooks/useAddRequest"


interface PopupInsurance{
isOpen:boolean;
onClose:()=>void;    
}



const PopupInsurance: React.FC<PopupInsurance> =  ({isOpen, onClose})=>{


const {addInsurance, file, setFile} = useAddRequest() 
const [error, setError] = useState<string>('')


const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
if (event.target.files && event.target.files.length === 1) {
setFile(event.target.files[0]);
setError('');
} else {
setFile(null);
setError('Please select only one file');
}
}



const handleSubmit = async (e: FormEvent) => {

e.preventDefault()

if(!file){
setError("Please select a file")    
return
}

const response = await addInsurance(file)

if(response){

setError(response)    

}
else{
onClose()
setError("")
setFile(null)
}

}


if (!isOpen) return null


return(<>
<div className="bg" onClick={()=>{onClose();setError("");setFile(null)}}> 
<button onClick={()=>{onClose();setError("");setFile(null)}} className="btnCloseInsurance">x</button> 
</div>


<div className="popInsurance">
   
<form onSubmit={handleSubmit}>

<div>
<label htmlFor="formFile" className="form-label">Upload your insurance document</label>
<input className="form-control" type="file" id="formFile" multiple={true} 
onChange={handleFileChange}/>    
</div>

<p className={error?"errorInsurance":""}>  {error?error:""}  </p> 
<button type="submit" className="buttonAddInsurance">+Add</button>
    
</form>
    
</div>
    
</>)

    
}

export default PopupInsurance
