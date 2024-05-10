import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import useDecodedToken from "./useDecodedToken"




export const useMyRequests = ()=>{


interface Request{

_id:string,
requestType:string,
requestDate:string,
status:string,

}


const {user} = useAuthContext()
const decodedToken = useDecodedToken()
const [requests, setRequests] = useState<Request[]>([])
const [isloading, setIsLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(()=>{

const fetchRequest = async (id_emp: string)=>{
    
try{
const res = await axios.get(`/request/employeRequests/${id_emp}`, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})
setRequests(res.data)
setIsLoading(false)
}catch(error:any){
setError(error.message)
setIsLoading(false)
}
    
}
 

if(user){
fetchRequest(String(decodedToken?._id));
}
    

},[requests, user])



return { requests, isloading, error };


}





















