import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import useDecodedToken from "./useDecodedToken"




export const useSubstituteNames = (id_emp: string, id_depart:string, 
startDate:string, endDate:string)=>{


interface SubstituteName{
firstName:string,
lastName:string
}

const {user} = useAuthContext()
const decodedToken = useDecodedToken()
const [substituteNames, setSubstituteNames] = useState<SubstituteName[]>([])
const [isloading, setIsLoading] = useState(true)
const [error, setError] = useState(null)



useEffect(()=>{

const fetchRequest = async (id_emp: string, id_depart:string, 
startDate:string, endDate:string)=>{
    


try{
const res = await axios.get(`/request/substituteNames`,{params:{ id_emp:id_emp, id_depart:id_depart, 
startDate:startDate, endDate:endDate}, headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})
setSubstituteNames(res.data.availableEmployees)
setIsLoading(false)
}catch(error:any){
setError(error.message)
setIsLoading(false)
}
    
}
 

if(user && decodedToken){
fetchRequest(id_emp, id_depart, startDate, endDate);
}
  

},[substituteNames, user, id_emp, id_depart, startDate, endDate])



return {substituteNames, isloading, error}


}








