import { useState, FormEvent } from "react"
import axios from "axios";
import { useAuthContext } from "./useAuthContext"


const useDeleteRequest = ()=>{

const {user}= useAuthContext()


const deleteRequest = async(id:string)=>{

if(!user){
return;
}


try{

const res = await axios.delete(`/request/deleteRequest/${id}`, {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})


return res.data.message

}
catch(error:any){
console.error(error)
return "Error occurred"
}


}

return {deleteRequest}

}

export default useDeleteRequest


