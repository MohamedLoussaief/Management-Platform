import {useState , FormEvent} from 'react'
import axios from "axios"
import { useAuthContext } from './useAuthContext'
import useDecodedToken from './useDecodedToken'



const useAddRequest = ()=>{

const {user} = useAuthContext()
const decodedToken = useDecodedToken()





// Add Payslip
const addPayslip = async(e:FormEvent)=>{

e.preventDefault()

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


return {addPayslip}

}

export default useAddRequest
















