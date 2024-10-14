import React from 'react'
import {Navigate} from 'react-router-dom'
import "../Styles/sidebar.css"
import useDecodedToken from "../hooks/useDecodedToken"
import {useLogout} from "../hooks/useLogout"
import {Routes, Route,  Link} from 'react-router-dom'




export const Sidebar=()=>{


const {logout} = useLogout();


const handleLogout = ()=>{

logout();

}

const decodedToken = useDecodedToken();

const userType =  decodedToken?.userType;

return(

<div className="sidebar">

<div className='userDiv'>

<img src='./images/user.png'/>
<h5> {decodedToken?.fullName} </h5>
<p> {userType} </p>
</div>


{

userType == "Admin" ? (
<>
<Link to='/' className="sideItem"><img src="./images/demands.png" style={{width:"30px",height:"30px"}}/><p className={`${window.location.pathname === '/' ? 'activeLink' : ''}`}>Requests</p></Link>
<Link to='/Departs'  className="sideItem"><img src="./images/department.png" style={{width:"30px",height:"30px"}}/><p className={`${window.location.pathname === '/Departs' ? 'activeLink' : ''}`}>Departements</p></Link>
<Link to='/Employees' className="sideItem"><img src="./images/employee.png" style={{width:"35px",height:"35px"}}/><p className={`${window.location.pathname === '/Employees' ? 'activeLink' : ''}`}>Employees</p></Link>
<Link to='' className="sideItem"><img src="./images/setting.png"/><p>Settings</p></Link>
</>
 ): userType == "Employee"?(

<>
<Link to='/' className="sideItem" style={{marginBottom:"15vh"}}><img src="./images/MyDemands.png" style={{width:"30px",height:"30px"}}/><p className={`${window.location.pathname === '/' ? 'activeLink' : ''}`}>My Requests</p></Link>
<Link to='' className="sideItem" style={{marginBottom:"15vh"}}><img src="./images/setting.png"/><p>Settings</p></Link>
</>

 ): userType == "DepartHead"?(

<>
<Link to='/' className="sideItem"><img src="./images/demands.png" style={{width:"30px",height:"30px"}}/><p className={`${window.location.pathname === '/' ? 'activeLink' : ''}`}>Requests</p></Link>
<Link to='/MyRequests' className="sideItem"><img src="./images/MyDemands.png" style={{width:"30px",height:"30px"}}/><p className={`${window.location.pathname === '/MyRequests' ? 'activeLink' : ''}`}>My Requests</p></Link>
<Link to='' className="sideItem"><img src="./images/setting.png"/><p>Settings</p></Link>
</>    


 ):null
}





<div className="sideItem" onClick={handleLogout}><img src="./images/logout.png"/><p>Logout</p></div>





</div>

)





}