import React, {useEffect, useState} from "react";
import MyRequests from "../pages/MyRequests"
import useDecodedToken from '../hooks/useDecodedToken'
import { Sidebar } from "../component/Sidebar";



const Dashboard =()=>{
   
const decodedToken = useDecodedToken();

const userType = decodedToken?.userType;



return (
<>   
{

userType=="Employee" && <MyRequests/> 

}


{

userType=="DepartHead" && <Sidebar/> 

}

{

userType=="Admin" && <Sidebar/> 

}

</> 




)

}

export default Dashboard;