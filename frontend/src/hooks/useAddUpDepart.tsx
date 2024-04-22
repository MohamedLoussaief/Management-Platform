import {useState , FormEvent} from 'react'
import validator from 'validator';
import axios from "axios";
import { useAuthContext } from './useAuthContext'; 

const useAddUpDepart =()=>{
const {user} = useAuthContext()
const [departName, setDepartName] = useState<string>("")
const [error, setError] = useState<string>('')
const [success, setSuccess] = useState<string>("")




// Add Departement
const addDepart = async (e:FormEvent)=>{
    
e.preventDefault();
    
if(!user){
    return;
}

if(!departName.trim()){
        
setError("Please provide a departement name")
return;
}
    
if(!validator.isAlpha(departName, 'en-US', {ignore: " " })){
    
setError("Departement name must contain only letters")
return;
}
    
    
try{

const res = await axios.post("/depart/addDepart", {departName:departName}, {headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`}} )   
    
if(res.status===200){
setError("")
setSuccess("Departement added successfully")

}


}catch(error:any){

setError(error.response.data.error)
setSuccess("")

}
    
}    

// Update Departement
const updateDepart = async(e:FormEvent, id:string)=>{

e.preventDefault();

if(!user){
    return;
}


if(!departName.trim()){
        
setError("Please provide a departement name")
return;
}
        
if(!validator.isAlpha(departName, 'en-US', {ignore: " " })){
        
setError("Departement name must contain only letters")
return;
}
  


try{

const res = await axios.put(`/depart/updateDepart/${id}`, {departName:departName}, {headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`}} )

if(res.status===200){
setError("")
setSuccess("Departement updated successfully")
}


}catch(error:any) {

setError(error.response.data.error)
setSuccess("")


}





}





return {departName, setDepartName, error, setError, addDepart, success, 
setSuccess, updateDepart }



}

export default useAddUpDepart;
