import { useState, FormEvent } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const useDeleteEmp = ()=>{

const {user}= useAuthContext()

const deleteEmp = async (id:string, id1:string)=>{

if(!user){
    return;
}

try{ 

const res = await axios.delete(`/user/deleteEmp/${id}/${id1}`, {headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`}} )

}catch(error:any){

console.error(error);

}


}

return {deleteEmp};

}


export default useDeleteEmp;
