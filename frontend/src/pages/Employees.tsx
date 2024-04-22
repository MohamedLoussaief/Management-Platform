import React, { useState, useEffect } from "react";
import { Sidebar } from "../component/Sidebar";
import "../Styles/employee.css"
import usePopup from "../hooks/usePopup";
import PopupEmp from "../component/PopupEmployee";
import useAllEmp from "../hooks/useAllEmp";
import {useAllDeparts} from '../hooks/useAllDeparts'
import useDeleteEmp from "../hooks/useDeleteEmp";


const Employees = ()=>{


const {isPopupOpen, openPopup, closePopup, action, actionPopup, empInfo ,currentEmpInfo} = usePopup()

const {departs} = useAllDeparts();

const { employees, isloading, error } = useAllEmp() 

const [selectedDepartment, setSelectedDepartment] = useState('All');

const {deleteEmp} = useDeleteEmp()


const handleDeleteEmp=(id: string, id1:string)=>{

  if(window.confirm("Are you sure you want to delete this employee") == true){
  
  deleteEmp(id, id1);
  
  }
  
  }






const handleDepartmentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
  setSelectedDepartment(event.target.value);
};


const filteredEmployees = selectedDepartment === 'All' ?
employees :
employees.filter(employee => employee.id_depart === selectedDepartment);



return (<div className='employbody'>
<Sidebar/>


<div className="employees">
      <h1 className='h1employees'>Employees</h1>
      <div className="table-responsive custom-table">
        <table className="table">



          <thead>
            <tr>
              <th>#</th>
              <th>FullName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Salary</th>
              <th>Leave Balances</th>
              <th>Function</th>
              <th>Action</th>
              <th>
              <select value={selectedDepartment} onChange={handleDepartmentChange}>

{departs && (
  <>
    <option value="All">All</option>   
    {departs.map((depart, index) => (
      <option key={depart._id} value={depart._id}>{depart.departName}</option>
    ))}
  </>
)}


                </select>
                </th>
              <th><button className='add1' onClick={()=>{openPopup(); actionPopup("add")}}>+Add</button></th>
            </tr>
          </thead>
          <tbody>
          
{


filteredEmployees.map((employee, index)=>(<tr key={employee._id}>

<td>{index+1}</td>
<td> {employee.firstName} {employee.lastName} </td>  
<td>{employee.email}</td>
<td>{   employee.userType!=="DepartHead"?employee.userType:"Head of the department"}</td>
<td> {employee.salary} </td>
<td> {employee.leaveBalance} </td>
<td> {employee.func} </td>
<td className="action"><a onClick={()=>{openPopup(); actionPopup("update");currentEmpInfo({id:`${employee._id}`,
      firstName:`${employee.firstName}`,
      lastName:`${employee.lastName}`,
      email:`${employee.email}`,
      idDepart:`${employee.id_depart}`,
      selectedRole:`${employee.userType}`,
      func:`${employee?.func}`,
      salary:employee.salary,
      leaveBalances:employee.leaveBalance })}}>Update</a>/<a onClick={()=>{handleDeleteEmp(employee._id, employee.id_depart)}} >Delete</a></td>
</tr>))




}
      
          </tbody>
        </table>
      {!departs ? <p style={ {color:"red", textAlign:"center"} }>Please add departements to add employees</p>:
      filteredEmployees.length==0 && isloading==false? <p style={ {color:"rgb(0, 136, 255)", textAlign:"center"} }>No employees found</p>:"" }   
      </div>
    </div>
     
<PopupEmp isOpen={isPopupOpen} onClose={closePopup} action={action} empInfo={empInfo} />    

    </div>);

}

export default Employees