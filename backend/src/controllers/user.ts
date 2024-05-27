import { Request, Response } from "express";
import User from "../models/user.js";
import depart from "../models/depart.js"; 
import dotenv from 'dotenv'
import jwt from "jsonwebtoken"

dotenv.config({ path: '../.env' })



// creating token
const createToken= (_id: string, firstName:string, lastName:string, userType:string)=>{

return jwt.sign({_id, firstName, lastName, userType}, process.env.SECRET as string, {expiresIn:'3d'})

} 



// login user
const loginUser = async(req:Request, res:Response)=>{


const {email, password} = req.body

try{

const user = await User.login(email, password)

//create token
const token = createToken(user._id, user.firstName, user.lastName, user.userType)

res.status(200).json({token}); 

}catch(error:any){

res.status(400).json({error: error.message})

}


}


// Add Employee
const addEmp = async(req:Request, res:Response)=>{

const {email, password, userType, firstName, lastName, salary, leaveBalance, 
func, id_depart, confirmPassword} = req.body;

try{
const user = await User.addingEmp(email, password, confirmPassword, userType, firstName, lastName,
    salary, leaveBalance, func, id_depart)



res.status(200).json(user)

}
catch(error:any){

res.status(400).json({error: error.message})

}

}


// Update Employee
const updateEmp = async(req:Request, res:Response)=>{

const {email, password, confirmPassword, userType, 
firstName, lastName, salary, leaveBalance, 
func, id_depart} = req.body

const {id} = req.params

try{

const updatedEmp = await User.updateEmp(email, password, confirmPassword, userType, firstName, lastName,
salary, leaveBalance, func, id_depart, id)

if(!updatedEmp){
console.log
res.status(400).json({message:"Employee not found"})  
return;  
}

res.status(200).json(updatedEmp)


}catch(error:any){

res.status(400).json({error:error.message})

}


}


// Delete Employee
const deleteEmp = async(req:Request, res:Response)=>{

try{
// id_employee , id_departement
const {id, id1} = req.params

const deleteEmp = await User.findByIdAndDelete(id);

await depart.findByIdAndUpdate(
id1,
{ $inc: { nbEmp: -1 } }
    
)

if(!deleteEmp){

res.status(404).json({message:"Employee not found"})
return;

}

res.status(200).json({message:"Employee deleted succefully"})

}catch(error:any){

console.error(error);
res.status(400).json({message:error.message})

}

}



// Get All Employees 
const getAllEmp = async(req:Request, res:Response)=>{


try{

const Emp = await User.find({ userType: { $in: ["Employee", "DepartHead"] } });
        
res.status(200).json(Emp)
        
}catch(error:any){
        
res.status(500).json({error:error.message})
        
}

}


// update employee leave balance every month
const updateLeaveBalances = async()=>{

try {

const updateQuery = { $inc: { leaveBalance: 2.5 } };


await User.updateMany({ userType: { $in: ['Employee', 'DepartHead'] } }, updateQuery);

console.log('Leave balances updated successfully.');
} catch (error) {
console.error('Error updating leave balances:', error);
}

}

export {loginUser, addEmp, updateEmp, deleteEmp, getAllEmp, updateLeaveBalances}

