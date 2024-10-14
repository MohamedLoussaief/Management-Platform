import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogout = ()=>{

const {dispatch} = useAuthContext()

const logout = async()=>{

const response = await axios.post("/auth/logout")

// dispatch logout action
dispatch({type:"LOGOUT"})


}

return {logout}

}



