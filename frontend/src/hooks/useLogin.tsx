import {useState} from 'react'
import { useAuthContext } from "./useAuthContext";

export const useLogin = ()=>{


const [error, setError] = useState<any>(null)

const [isLoading, setIsLoading] = useState<any>(null);

const {dispatch} = useAuthContext()


const Login = async (email:string, password:string)=>{

setIsLoading(true)
setError(null)

const response = await fetch("/user/login", { 
method : 'POST',
headers: {'Content-Type':'application/json'},
body: JSON.stringify({email, password})
})


const json = await response.json();


if(!response.ok){

setIsLoading(false)
setError(json.error)

}


if(response.ok){

// save the user to localStorage
localStorage.setItem('user', JSON.stringify(json))


// update authContext
dispatch({type:'LOGIN', payload:json})

setIsLoading(false)

}




}


return {Login, isLoading, error}


}



