import React from 'react';
import {Sidebar} from "../component/Sidebar" 
import '../Styles/departs.css'
import usePopup from '../hooks/usePopup';
import Popup from '../component/Popup';

const Departs = ()=>{

const {isPopupOpen, openPopup, closePopup} = usePopup()

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
              <th><button className='add' onClick={openPopup}>+Add Departement</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Finance</td>
              <td>25</td>
              <td><a>Update</a>/<a >Delete</a></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Human Resources</td>
              <td>30</td>
              <td><a>Update</a>/<a>Delete</a></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Marketing</td>
              <td>20</td>
              <td><a>Update</a>/<a>Delete</a></td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>

    <Popup isOpen={isPopupOpen} onClose={closePopup}/>
    </div>


)

}

export default Departs;

