import React, {useEffect, useState} from "react";
import "../Styles/popEmp.css"
import {useAllDeparts} from '../hooks/useAllDeparts'
import useAddUpEmp from "../hooks/useAddUpEmp";

interface PopupProps{
isOpen:boolean;
onClose:()=>void;
action:string;
empInfo:{id:string, firstName: string; lastName: string; email: string; idDepart: string; 
  selectedRole: string; func: string; salary:number; leaveBalances: number; }
}


const PopupEmp : React.FC<PopupProps>= ({isOpen,  onClose, action, empInfo})=>{

const {departs} = useAllDeparts();  

const {firstName, setFirstName, lastName, setLastName, email, setEmail, idDepart, setIdDepart, 
selectedRole, setSelectedRole, func, setFunc, salary, setSalary, leaveBalances, setLeaveBalances, password, setPassword,
confirmPass, setConfirmPass , error, setError, success, setSuccess, addEmp, updateEmp } = useAddUpEmp()


useEffect(()=>{

if(action=="Update"){
  
setFirstName(empInfo.firstName)
setLastName(empInfo.lastName)
setEmail(empInfo.email)
setIdDepart(empInfo.idDepart)
setSelectedRole(empInfo.selectedRole)

empInfo.func=='undefined' ? setFunc(""): setFunc(empInfo.func)

setSalary(empInfo.salary)
setLeaveBalances(empInfo.leaveBalances)
 
  
}
else if(action=="Add"){
    
setFirstName("")
setLastName("")
setEmail("")
setIdDepart("")
setSelectedRole("")
setFunc("")
setSalary(500)
setLeaveBalances(0.5)
setPassword("")  
setConfirmPass("")

}
  
  
},[action, empInfo, isOpen])



useEffect(()=>{

if(selectedRole=="DepartHead") {

setFunc("") 

} 


},[selectedRole])




const handleRoleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRole(e.target.value);
  };


if (!isOpen) return null;

return (<>

<div className="bg">
</div>


<div className="popEmp">


<button className="btnClose1" onClick={()=>{onClose(); setError(""); setSuccess("")}}>x</button>



<form onSubmit={(e)=>{action=="Add" ? addEmp(e):updateEmp(e, empInfo.id)}}>

<div className="row mb-3">

<div className="col form-group">
<label>FirstName</label>
<input type="text" className="form-control" value={firstName} onChange={(e)=>{setFirstName(e.target.value) }}/>
</div>

<div className="col">
<label>LastName</label>
<input type="text" className="form-control" value={lastName} onChange={(e)=>{setLastName(e.target.value) }}/>
</div>

</div>


<div className="row mb-3">

<div className="col form-group">
<label>Email</label>
<input type="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value) }} />
</div>

<div className="col form-group">
<label>Department</label>

<select className="form-select" value={idDepart}  onChange={(e)=>{setIdDepart(e.target.value)}}>
<option value="">Choose a department</option>  
{departs && (
  <>
 
    {departs.map((depart, index) => (
      <option key={depart._id} value={depart._id}>{depart.departName}</option>
    ))}
  </>
)}
</select>

</div>

</div>


<div className="mb-3">

<label className="mb-2">Role</label>

<div className="d-flex form-group">

<div className="form-check me-5">
<input className="form-check-input" type="radio" name="role" value="Employee" 
checked={selectedRole === 'Employee'} onChange={handleRoleChange}/>
<label className="form-check-label">Employee</label>
</div>

<div className="form-check">
<input className="form-check-input" type="radio" name="role" value="DepartHead" 
checked={selectedRole === 'DepartHead'} onChange={handleRoleChange}/>
<label className="form-check-label">Departement Lead</label>
</div>





</div>






</div>


{selectedRole === 'Employee'&& (
<div className="mb-2">
<div className="form-group">
<label>Function</label>
<input type="text" className="form-control" value={func} onChange={(e)=>{setFunc(e.target.value)}}/>
</div>
</div>
)  
}


<div className="row mb-3">

<div className="col form-group">
<label>Salary</label>
<input type="number" min={500} className="form-control" value={salary} onChange={(e)=>{setSalary(Number(e.target.value))}}/>
</div>

<div className="col">
<label>Leave Balances</label>
<input type="number" className="form-control" step="0.5"  value={leaveBalances} onChange={(e)=>{setLeaveBalances(Number(e.target.value))}}/>
</div>

</div>



<div className="row mb-3">

<div className="col form-group">
<label>Password</label>
<input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control"/>
</div>

<div className="col">
<label>Confirm Password</label>
<input type="password" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}} className="form-control"/>
</div>

</div>

<p className={error?"errorDepart":"success"} style={{width:"400px"}}>  {error ? error:success?success:""}  </p>

<button type="submit" className="btnEmp">{action}</button>

</form>


</div>





</>)


}

export default PopupEmp
