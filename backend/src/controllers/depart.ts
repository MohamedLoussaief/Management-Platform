import Depart from "../models/depart.js"
import { Request, Response } from "express"



// Add Update Depart
const addDepart = async(req:Request, res:Response)=> {
    
const {departName} = req.body

try{
const depart = await Depart.addDepart(departName) 

res.status(200).json({depart})

}catch(error:any){

res.status(400).json({error: error.message})

}
}



// get Depart
const getDepart = async(req:Request, res:Response)=>{

try{

const departs = await Depart.find();

res.status(200).json(departs)

}catch(error:any){

res.status(500).json({error:error.message})


}



}








export {addDepart, getDepart};



