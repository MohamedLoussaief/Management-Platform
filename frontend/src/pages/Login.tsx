import React from "react";
import {useNavigate} from 'react-router-dom';
import '../Styles/login.css';

const Login:React.FC =()=>{






const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{




    
}





return(
<div className="container-fluid d-flex justify-content-center align-items-center">

<form onSubmit={handleSubmit} className="container border  rounded-4 d-flex flex-column justify-content-center  align-items-center">

<h2 className="mb-5">Login</h2>



<div className="row">
<input type="email" placeholder="Email" id="email" value="" className="col mb-3 form-control"/>
</div>

<div className="row">
<input type="password" placeholder="Password" id="password" value="" className="col mb-3 form-control"/>
</div>

<div className="row mb-5">
<button type="submit" className="btn btn-primary">Sign in</button>
</div>

<p>Forgot <a href="">Password?</a></p>

</form>
</div>
);





}

export default Login;