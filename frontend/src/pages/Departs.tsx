import React, { useState } from 'react';
import {Sidebar} from "../component/Sidebar" 
import '../Styles/departs.css'
import usePopup from '../hooks/usePopup';
import Popup from '../component/Popup';
import {useAllDeparts} from '../hooks/useAllDeparts'
import useDeleteDepart from '../hooks/useDeleteDepart';

const Departs = ()=>{

const {isPopupOpen, openPopup, closePopup, action, actionPopup, idDepart,
id, currentDepartName, departName} = usePopup()

const {departs, isloading, error} = useAllDeparts(); 

const {deleteDepart} = useDeleteDepart();

const handleDelete=(id: string)=>{

if(window.confirm("Are you sure you want to delete this departement") == true){

deleteDepart(id);

}

}


return(
<div className='departbody'>
<Sidebar/>


<div className="container-fluid departs">
      <h1 className='h1Depart'>Departements</h1>
      <div className="table-responsive" >
        <table className="table">



          <thead>
            <tr>
              <th>#</th>
              <th>Department Name</th>
              <th>Number of Employees</th>
              <th>Action</th>
              <th><button className='add' onClick={()=>{openPopup(); actionPopup("add")}}>+Add Departement</button></th>
            </tr>
          </thead>
          <tbody>
           
{
departs.map((depart, index)=>(<tr key={depart._id}>

<td>{index+1}</td>  
<td>{depart.departName}</td>  
<td>{String(depart.nbEmp)}</td>  
<td className="action"><a onClick={()=>{openPopup(); actionPopup("update"); idDepart(depart._id);
currentDepartName(depart.departName) } }>Update</a>/<a onClick={()=>handleDelete(depart._id)}>Delete</a></td>
</tr>))


}

            
          </tbody>
        </table>
      </div>
    </div>

    <Popup isOpen={isPopupOpen} onClose={closePopup} action={action} id={id} depart={departName}  />
    </div>


)

}

export default Departs;

