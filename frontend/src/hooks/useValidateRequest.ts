import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import useDecodedToken from "./useDecodedToken"



export const useValidateRequest = ()=>{

const {user} = useAuthContext()
const decodedToken = useDecodedToken()
const [file, setFile] = useState<File | null>(null)

const validateRequest = async(id:string, userType:string, requestType:string, leaveType:string, 
startDate:string, endDate:string, id_emp:string, substituteName:string)=>{

if(!user){
return
}

try{

const res = await axios.put(`/request/validateRequest/${id}`,{userType:userType, requestType:requestType, 
leaveType:leaveType, startDate:startDate, endDate:endDate, id_emp:id_emp, substituteName:substituteName},
{headers:{Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 

if(res.status===200){   
return
}

}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}

}


const validatePayslip = async(id:string, file:File | null)=>{

const formData = new FormData()
file && formData.append('file', file)
formData.append('userType', String(decodedToken?.userType))


if(!user){
return
}

try{

const res = await axios.put(`/request/validatePayslipRequest/${id}`, formData,
{headers:{Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 

if(res.status===200){   
return
}

}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}




}


const cancelRequest = async(id:string)=>{

if(!user){
return
}

try{

const res = await axios.put(`/request/cancelRequest/${id}`,
{headers:{Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 

if(res.status===200){   
return
}

}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}



}




return {validateRequest, file, setFile, validatePayslip, cancelRequest}

}






