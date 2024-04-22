import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useAuthContext} from './hooks/useAuthContext'
import useDecodedToken from './hooks/useDecodedToken'
import Departs from "./pages/Departs" 
import Employees from "./pages/Employees"

function App() {
const [isLoading, setIsLoading] = useState(true);
const decodedToken = useDecodedToken();
const {user} = useAuthContext();
 

useEffect(() => {
  
setIsLoading(false);
  
}, [user, decodedToken]);


if (isLoading) {
  return <></>
}


const userType = decodedToken?.userType;

return (
<BrowserRouter>
<Routes>

<Route path="/" element={user ? <Dashboard/> : <Navigate to="/login"/> }/>
<Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
<Route path="/Departs"  element={user && userType=="Admin" ? <Departs/> : <Navigate to="/"/>} />
<Route path="/Employees" element={user && userType=="Admin" ? <Employees/> : <Navigate to="/"/>}/>

</Routes>
</BrowserRouter>
  
  
  );
}

export default App;
