import {useState} from "react"
import axios from "axios";
import { useAuthContext } from './useAuthContext'; 




const useAddUpEmp = ()=>{

const {user} = useAuthContext()
const [firstName, setFirstName] = useState<string>("")
const [lastName, setLastName] = useState<string>("")
const [email, setEmail] = useState<string>("")
const [idDepart, setIdDepart] = useState<string>("")
const [selectedRole, setSelectedRole] = useState<string>("")
const [func, setFunc] = useState<string>("")
const [salary, setSalary] = useState<number>(500)
const [leaveBalances, setLeaveBalances] = useState<number>(0.5)
const [password, setPassword] = useState<string>("")
const [confirmPass, setConfirmPass] = useState<string>("")

const [error, setError] = useState<string>('')
const [success, setSuccess] = useState<string>("")



// add employee
const addEmp = async (e: { preventDefault: () => void; })=>{

e.preventDefault();


if(!user){

return;

}


try{

const res = await axios.post("/user/addEmp", {email:email, password:password, userType:selectedRole, 
firstName:firstName, lastName:lastName, salary:salary, leaveBalance:leaveBalances, func:func, 
id_depart:idDepart, confirmPassword:confirmPass}, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})

if(res.status==200){
setError("")
setSuccess("Employee added successfully")

}


}catch(error:any){

setError(error.response.data.error)
setSuccess("")

}


}




const updateEmp = async(e: { preventDefault: () => void; }, id: string)=>{

e.preventDefault();

if(!user){
return;
}


try{

const res = await axios.put(`/user/updateEmp/${id}`, {email:email, password:password, confirmPassword:confirmPass, 
userType:selectedRole,firstName:firstName, lastName:lastName, salary:salary, leaveBalance:leaveBalances, 
func:func, id_depart:idDepart}, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}} )

if(res.status===200){
setError("")
setSuccess("Employee updated successfully")
}

}catch(error:any){

setError(error.response.data.error)
setSuccess("")

}



}









return {firstName, setFirstName, lastName, setLastName, email, setEmail, idDepart, setIdDepart, selectedRole, setSelectedRole,
func, setFunc, salary, setSalary, leaveBalances, setLeaveBalances, password, setPassword,
confirmPass, setConfirmPass , error, setError, success, setSuccess, addEmp, updateEmp    
}

}


export default useAddUpEmp