import request from "../models/request.js"
import depart from "../models/depart.js"
import user from "../models/user.js"
import { Request, Response } from "express"
import multer from "multer"
import fs from 'fs-extra'
import {format ,eachDayOfInterval, isWeekend } from "date-fns"

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

const {id_emp, leaveType, startDate, endDate}= req.body

try{

const leave = await request.LeaveRequest(id_emp, leaveType, startDate, endDate)

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
// Generate a unique filename by appending a timestamp
const timestamp = Date.now();
const extension = file.originalname.split('.').pop();
const uniqueFilename = `${timestamp}-${file.originalname}`;
cb(null, uniqueFilename);
}
});



const insuranceRequest = async(req:Request, res:Response)=>{

try{
  
const document = req.file  ? `${req.file.path}` : null   

const {id_emp} = req.body

const insurance = await request.insuranceRequest(id_emp, document)

res.status(200).json({insurance})

}catch(error:any){

req.file && await fs.unlink(req.file.path)    
res.status(400).json({error:error.message})

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

if(deleteRequest && deleteRequest.requestType==="Insurance Reimbursement"){

await fs.unlink(deleteRequest.document)

}

if(!deleteRequest){

res.status(404).json({message:"Request not found"})
return;

}

res.status(200).json({message:"Request deleted succefully"})


}catch(error:any){

res.status(500).json({message:error.message})    

}

}


// Get requests of a department or all the departments
const requests = async(req:Request, res:Response)=>{

const {id, userType} = req.params

try{

if(userType=="Admin"){

const status = ["In progress: Validated by the head department", "Awaiting"]  

const query = await request.aggregate([
{
$match: { status:{ $in: status } } 
},
{
$lookup: {
from: 'users', 
localField: 'id_emp',
foreignField: '_id',
as: 'userDetails'
}
},
{
$unwind: '$userDetails'
},
{
$lookup: {
from: 'departs', 
localField: 'userDetails.id_depart',
foreignField: '_id',
as: 'departmentDetails'
}
},
{
$unwind: '$departmentDetails'
},

{
$project: {
_id: 1,
requestType: 1,
status:1,
requestDate:1,
amount:1,
document:1,
leaveType:1,
startDate:1,
endDate:1,
returnDate:1,
substituteName:1,
certificateReason:1,
cin:1, 
'userDetails._id':1,
'userDetails.firstName': 1,
'userDetails.lastName': 1,
'userDetails.userType':1,
'departmentDetails.departName': 1,
'departmentDetails._id':1
}
}

]).exec()

res.status(200).json({query})

}
else if(userType=="DepartHead"){

const status = "Awaiting"

const userQuery = await user.findOne({_id:id}).exec()  

const id_depart = userQuery?.id_depart  

const query = await request.aggregate([
{
$match: {status} 
},
{
$lookup: {
from: 'users', 
localField: 'id_emp',
foreignField: '_id',
as: 'userDetails'
}
},
{
$unwind: '$userDetails'
},
{
$lookup: {
from: 'departs', 
localField: 'userDetails.id_depart',
foreignField: '_id',
as: 'departmentDetails'
}
},
{
$unwind: '$departmentDetails'
},
 
{
$redact: {
$cond: {
if: { $and: [
{ $eq: ['$userDetails.id_depart', id_depart] },
{ $ne: ['$userDetails.userType', 'DepartHead'] }
]},
then: '$$KEEP',
else: '$$PRUNE'
}
}
},

{
$project: {
_id: 1,
requestType: 1,
status:1,
requestDate:1,
amount:1,
document:1,
leaveType:1,
startDate:1,
endDate:1,
returnDate:1,
substituteName:1,
certificateReason:1,
cin:1, 
'userDetails._id':1,
'userDetails.firstName': 1,
'userDetails.lastName': 1,
'userDetails.userType':1,
'departmentDetails.departName': 1,
'departmentDetails._id':1
}
}
    
]).exec()

res.status(200).json({query})

}




}catch(error:any){

res.status(500).json({error:error.message})

}



}


// Validate a request 
const validateRequest = async(req:Request, res:Response)=>{

const {userType, requestType, leaveType, startDate, endDate, id_emp, substituteName} = req.body

const {id} = req.params

const status = userType==="Admin" ? "Validated":"In progress: Validated by the head department" 


const updateData:{status: string; substituteName?: string} = { status: status };
if (substituteName) {
updateData.substituteName = substituteName;
}


try{

if(requestType=="Leave" && leaveType == "Paid" && userType== "Admin"){

const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(day => !isWeekend(day)).length
                
const updateLeaveBalance = await user.findOneAndUpdate({_id:id_emp}, {$inc:{leaveBalance:-days}})

/*
if(!substituteName && userType=="DepartHead"){

throw new Error("Please choose the substitute name")

}
*/
                        
}

const query = await request.findByIdAndUpdate(id, updateData, { new: true })


res.status(200).json(query)

}catch(error:any){

res.status(500).json({error:error.message})

}


}


// Cancel a request
const cancelRequest = async(req:Request, res:Response)=>{
    
const {id} = req.params

try{

const query = await request.findByIdAndUpdate(id, {status:"Canceled"}, { new: true })

res.status(200).json(query)

}catch(error:any){

res.status(500).json({error:error.message})

}

}


// Validate payslip request
const validatePayslipRequest = async(req:Request, res:Response)=>{

const document = req.file  ? `${req.file.path}` : null 

const {userType} = req.body


const status = userType =="Admin"?"Validated":"In progress: Validated by the head department"


const {id} = req.params

try{

if(userType =="Admin" && !document){

throw new Error("Please upload the payslip document")

}


const query = await request.findByIdAndUpdate(id, {status:status, document:document}, { new: true })

res.status(200).json(query)

}catch(error:any){

res.status(500).json({error:error.message})

}

}



// Get substitute names
const substituteNames = async(req:Request, res:Response)=>{

const {id_emp, id_depart, startDate, endDate} = req.query    

try{

const empDepart = await user.find({id_depart, _id:{$ne:id_emp}}).exec()

let empIds = empDepart.map(emp=>emp._id.toString())

const leaveRequests = await request.find({ id_emp: { $in: empIds }, requestType: "Leave", status: "Validated" }).exec()


for(const request of leaveRequests){

const requestStartDate = new Date(request.startDate);
const requestEndDate = new Date(request.endDate);
    

if (new Date(String(startDate)) <= requestEndDate && new Date(String(endDate)) >= requestStartDate) {
    empIds = empIds.filter(empId => empId !== request.id_emp.toString())
}
    
}


const availableEmployees = await user.find({_id:{$in:empIds}}).exec()

res.status(200).json({availableEmployees})

}catch(error:any){

res.status(500).json({error:error.message})

}


}




export {salaryAdvanceRequest, payslipRequest, LeaveRequest, workCertificateRequest, insuranceRequest,  
employeRequests, deleteRequest, storage, requests, validateRequest, cancelRequest, 
validatePayslipRequest, substituteNames}







