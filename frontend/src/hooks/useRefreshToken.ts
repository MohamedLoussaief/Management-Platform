import axios from "axios"
import { useState } from "react"




export const useRefreshToken =  ()=>{

const [token, setToken] = useState(null)  
const [error, setError] = useState(null)


const refreshToken = async()=>{


try{

const res = await axios.get(`/auth/refresh`)    
if(res.status==200){ 
setToken(res.data.token)       
}

}catch(error:any){

setError(error)  

}





}


return {refreshToken, token}



}