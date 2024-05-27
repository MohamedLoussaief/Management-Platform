import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import useDecodedToken from "./useDecodedToken"




export const useRequests = ()=>{

interface Request{
_id: string;
requestType: string;
requestDate: string;
status: string;
document: string;
startDate:string;
amount:number,
cin:string,
certificateReason:string,
substituteName:string,
endDate:string;
leaveType:string;
userDetails: {
firstName: string;
lastName: string;
userType: string;
 _id: string;
};
departmentDetails: {
departName: string;
_id: string;
};
}


const {user} = useAuthContext()
const decodedToken = useDecodedToken()
const [requests, setRequests] = useState<Request[]>([])
const [isloading, setIsLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(()=>{

const fetchRequest = async (id: string, userType:string)=>{
    
try{
const res = await axios.get(`/request/AllRequests/${userType}/${id}`, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})
setRequests(res.data.query)
setIsLoading(false)
}catch(error:any){
setError(error.message)
setIsLoading(false)
}
    
}
 

if(user && decodedToken){
fetchRequest(String(decodedToken?._id), String(decodedToken?.userType));
}
  

},[requests, user])



return {requests, isloading, error}



}




























