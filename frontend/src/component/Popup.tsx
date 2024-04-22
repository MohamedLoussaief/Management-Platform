import React, {FormEvent, useEffect, useState} from "react";
import  '../Styles/popDepart.css'
import useAddUpDepart from "../hooks/useAddUpDepart"


interface PopupProps{
isOpen:boolean;
onClose:()=>void;
action:string;
id:string
depart?:string
}





const Popup: React.FC<PopupProps> = ({isOpen,  onClose, action, id, depart})=>{

const {departName, setDepartName, error, setError, addDepart,
success, setSuccess, updateDepart} = useAddUpDepart();


useEffect(()=>{

if(action=="Update"){

setDepartName(depart as string);

}
else if(action=="Add"){

setDepartName("")

}


},[action, depart, isOpen])


if (!isOpen) return null;

return (
<>
<div className="bg">



</div>



<div className="popup">
<button onClick={()=>{onClose(); setError(""); setSuccess("")}} className="btnClose">x</button>
<h5>Departement Name</h5>

<form className="formDepart" onSubmit={(e)=>{action=="Add"? addDepart(e): updateDepart(e, id)} }> 
<input type="text" value={departName}   
placeholder="Enter department name" onChange={(e)=>{setDepartName(e.target.value) }}/>
<p className={error?"errorDepart":"success"}>  {error ? error:success?success:""}  </p> 
<button type="submit">{action}</button>
</form>
 
</div>

</>

)

}


export default Popup;