import {useState , FormEvent} from 'react'
import axios from "axios"
import { useAuthContext } from './useAuthContext'
import useDecodedToken from './useDecodedToken'
import validator from 'validator'




const useAddRequest = ()=>{


const {user} = useAuthContext()
const decodedToken = useDecodedToken()
const [file, setFile] = useState<File | null>(null)
const [amount, setAmount] = useState<number>(100)
const [cin, setCin] = useState<string>('')
const [reason, setReason] = useState<string>('') 
const [leaveType, setleaveType] = useState<string>('')
const [startDate, setStartDate] = useState<string>('')
const [endDate, setEndDate] = useState<string>('')



// Add Payslip
const addPayslip = async()=>{

if(!user){
  return
}

try{

const res = await axios.post("/request/payslip", {id_emp:decodedToken?._id}, {headers:
  {Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 

if(res.status===200){   
return
}

}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}

}


// Add insurance
const addInsurance = async(file:File)=>{

if(!user){
return
}

const formData = new FormData()
formData.append('file', file)
formData.append('id_emp', String(decodedToken?._id))

try{

const res = await axios.post("/request/insuranceReimbursement", formData, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`, 
'Content-Type': 'multipart/form-data'}})

if(res.status===200){   
return
}
  
}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}

}


// Add Salary
const addSalary = async(amount:number)=>{

if(!user){
return
}

if(amount===0 || !amount){
return "Please provide an amount"
}

if(amount > 1000){
return "The amount must not exceed 1000dt"
}



try{

const res = await axios.post("/request/salaryAdvance", {amount:amount, id_emp:decodedToken?._id}, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}} )

if(res.status===200){   
return
}

}catch(error:any){

const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage

}

}

// Add work certificate
const addWorkCertificate = async(cin:string, reason:string)=>{

if(!user){
return
}
  
 
if(!cin || !reason){
return "Please fill the empty field"
}

if(!validator.isNumeric(cin)){  
return "The CIN must only contain numbers"  
}
  
if(cin[0]!=="0" && cin[0]!=="1"){
return "The CIN must start with 0 or 1" 

}
  
  
if(cin.length > 8){ 
return "The CIN must not exceed 8 digits"
}


try{
  
const res = await axios.post("/request/workCertificate", {id_emp:decodedToken?._id, cin:cin, certificateReason:reason}, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 
  
if(res.status===200){   
return
}
  
}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}

}

// Add leave 
const addLeave = async(leaveType:string, startDate:string, endDate:string)=>{

if(!user){
return
}
  
// Empty field validation
if(!leaveType || !startDate || !endDate){
return "Please fill the empty field"
}

// Check if the start date in the weekend
const dayStart = new Date(startDate).getDay() 
if(dayStart === 0 || dayStart === 6){
return "The start date is in the weekend days"     
}

// Check if the end date in the weekend
const dayEnd = new Date(endDate).getDay()
if(dayEnd === 0 || dayEnd === 6){
return "The end date is in the weekend days"     
}

try{
  
const res = await axios.post("/request/Leave", {id_emp:decodedToken?._id, leaveType:leaveType, 
startDate:startDate, endDate:endDate}, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}} ) 
  
if(res.status===200){   
return
}
  
}catch(error:any){
const errorMessage = error.response?.data?.error || 'An error occurred.'
return errorMessage
}

}


return {addPayslip, addInsurance, file, setFile, addSalary, amount, setAmount, 
cin, setCin, reason, setReason, addWorkCertificate, leaveType, setleaveType, 
startDate, setStartDate, endDate, setEndDate, addLeave}

}

export default useAddRequest
















