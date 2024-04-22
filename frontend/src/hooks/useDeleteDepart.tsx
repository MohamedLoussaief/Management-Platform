import { useState, FormEvent } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useDeleteDepart = ()=>{

const {user}= useAuthContext()

const deleteDepart = async (id:string)=>{

if(!user){
    return;
}

try{ 

const res = await axios.delete(`/depart/deleteDepart/${id}`, {headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`}} )

}catch(error:any){

console.error(error);

}





}

return {deleteDepart};

}


export default useDeleteDepart;
