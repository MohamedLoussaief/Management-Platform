import { Request, Response } from "express";
import User from "../models/user.js"; 
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

res.status(200).json({email, token}); 

}catch(error:any){

res.status(400).json({error: error.message})

}


}


// add user
const addUser = async(req:Request, res:Response)=>{

const {email, password, userType, firstName, lastName, salary, leaveBalance, func} = req.body;

try{
const user = await User.addingUser(email, password, userType, firstName, 
lastName, salary, leaveBalance, func)


// Create a token
//const token = createToken(user._id);

res.status(200).json({email, user,/*token*/})

}
catch(error:any){

res.status(400).json({error: error.message})

}



}

export {loginUser, addUser}

