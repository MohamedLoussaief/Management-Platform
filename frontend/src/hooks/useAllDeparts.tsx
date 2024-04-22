import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"


export const useAllDeparts =()=>{


interface Depart {

_id:string,
departName:string,
nbEmp:number,

}


const {user} = useAuthContext()
const [departs, setDeparts] = useState<Depart[]>([])
const [isloading, setIsLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(()=>{

const fetchDepart = async ()=>{

try{
const res = await axios.get("/depart/getAllDepart", {headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`}})
setDeparts(res.data)
setIsLoading(false)
}catch(error:any){
setError(error.message)
setIsLoading(false)
}

}

if(user){
fetchDepart();
}

},[departs, user])





return { departs, isloading, error };




}








