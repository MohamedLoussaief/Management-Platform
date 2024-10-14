import {useState, useEffect} from "react"
import axios from "axios"
import { useAuthContext } from "./useAuthContext"



const useAllEmp = ()=>{



interface Employee {

_id:string,
    
userType:string,
    
firstName:string,

lastName:string,

email:string,

salary:number
    
leaveBalance:number,
    
func:string,

id_depart:string

}


const {user} = useAuthContext()
const [employees, setEmployees] = useState<Employee[]>([])
const [isloading, setIsLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(()=>{

    const fetchEmployees = async ()=>{
    
    try{
const res = await axios.get("/user/getAllEmp",{headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`}})

setEmployees(res.data)
setIsLoading(false)
}catch(error:any){
setError(error.message)
setIsLoading(false)
}
    
}
    
if(user){
fetchEmployees();
}
    
},[employees, user])



return { employees, isloading, error };


}

export default useAllEmp