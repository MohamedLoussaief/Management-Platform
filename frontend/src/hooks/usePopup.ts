import React from "react";
import { useState } from "react";



const usePopup = () => {
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [action, setAction] = useState("");
    const [id, setId] = useState("")
    const [departName, setDepartName] = useState("");

    const [empInfo, setEmpInfo] = useState({
      id:"",
      firstName:"",
      lastName:"",
      email:"",
      idDepart:"",
      selectedRole:"",
      func:"",
      salary:500,
      leaveBalances:0.5
    })



    const openPopup = () => {
      setPopupOpen(true);
    };
  
    const closePopup = () => {
      setPopupOpen(false);
    };

const idDepart=(id:string)=>{

setId(id);

}


const currentDepartName = (departName:string)=>{

setDepartName(departName)
  
}



const actionPopup = (actionType:string)=>{

if(actionType=="add"){

setAction("Add");

}
else if(actionType =="update"){

setAction("Update")

}
else{
setAction("");
}

}


const currentEmpInfo =(newEmpInfo: 
  { id:string; firstName: string; lastName: string; email: string; idDepart: string; 
    selectedRole: string; func: string; salary:number ;leaveBalances: number; })=>{

setEmpInfo(prevEmpInfo=>({
...newEmpInfo,
...newEmpInfo
}))

}



    return {
      isPopupOpen,
      openPopup,
      closePopup,
      action,
      actionPopup,
      idDepart,
      id,
      currentDepartName,
      departName,
      currentEmpInfo,
      empInfo
    };
  };
  
  export default usePopup;






