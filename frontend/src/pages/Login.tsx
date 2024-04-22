import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import '../Styles/login.css';
import { useLogin } from "../hooks/useLogin";



const Login =()=>{

const [email, setEmail] = useState<string>("");
const [password, setPassword] = useState<string>("");
const {Login, isLoading, error} = useLogin()

//const navigate = useNavigate();



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{

e.preventDefault()

await Login(email, password)

//console.log(email, password)
    
}


return(
<div className="container-fluid d-flex justify-content-center align-items-center login-container">

<form onSubmit={handleSubmit} className="container border  rounded-4 d-flex flex-column justify-content-center  align-items-center form-container">

<h2 className="mb-5">Login</h2>



<div className="row">
<input type="email" placeholder="Email" id="email" 
onChange={(e)=>setEmail(e.target.value)}
className="col mb-3 input-control form-input"/>
</div>

<div className="row">
<input type="password" placeholder="Password" id="password" 
onChange={(e)=>setPassword(e.target.value)}
className="col mb-3 input-control form-input"/>
</div>

<div className="row mb-5">
<button type="submit" className="btn btn-primary" disabled={isLoading}>Sign in</button>
</div>
<div className="error">{error ?? error}</div>
<p>Forgot <a href="">Password?</a></p>

</form>
</div>
);

}

export default Login;