import request from "../models/request.js"
import { Request, Response } from "express"
import multer from "multer"


// Add request

const salaryAdvanceRequest = async (req:Request, res:Response)=>{

const {amount, id_emp}= req.body

try{

const salaryAdvance = await request.salaryRequest(amount, id_emp)

res.status(200).json({salaryAdvance})

}catch(error:any){

res.status(400).json({error: error.message})

}

} 


const payslipRequest = async (req:Request, res:Response)=>{


const {id_emp}=req.body

try{

const payslip = await request.payslipRequest(id_emp)

res.status(200).json({payslip})

}catch(error:any){

res.status(400).json({error:error.message})

}

}


const LeaveRequest = async (req:Request, res:Response)=>{

const {id_emp, userType, leaveType, startDate, endDate, substituteName}= req.body

try{

const leave = await request.LeaveRequest(id_emp, userType, leaveType, startDate, endDate, substituteName)

res.status(200).json({leave})

}
catch(error:any){

res.status(400).json({error: error.message})

}

} 



const workCertificateRequest = async(req:Request, res:Response)=>{


const {id_emp, cin, certificateReason} = req.body

try{

const workCertificate = await request.workCertificateRequest(id_emp, cin, certificateReason)

res.status(200).json({workCertificate})


}catch(error:any){

res.status(400).json({error: error.message})

}

}



const storage = multer.diskStorage({
destination: (req, file, cb) => {
cb(null, '../files/');
},
filename: (req, file, cb) => {
cb(null, file.originalname); 
}
})



const insuranceRequest = async(req:Request, res:Response)=>{

try{
    console.log(req.body.file)
const document = req.file  ? `/files/${req.file.filename}` : null   



const {id_emp} = req.body

console.log(id_emp)

const insurance = await request.insuranceRequest(id_emp, document)

res.status(200).json({insurance})

}catch(error:any){

res.status(400).json({error:error.message});

}


}



// Get requests of an employe
const employeRequests = async(req:Request, res:Response)=>{

const {id} = req.params

try{

const requests = await request.find({id_emp:id})

res.status(200).json(requests)

}catch(error:any){

res.status(500).json({error:error.message})    

}

}

// Delete employee request
const deleteRequest = async(req:Request, res:Response)=>{

const {id} = req.params

try{

const deleteRequest = await request.findByIdAndDelete({_id:id})  


if(!deleteRequest){

res.status(404).json({message:"Request not found"})
return;

}

res.status(200).json({message:"Request deleted succefully"})


}catch(error:any){

res.status(400).json({message:error.message})    

}

}



export {salaryAdvanceRequest, payslipRequest, LeaveRequest, workCertificateRequest, insuranceRequest, storage, 
employeRequests, deleteRequest}







