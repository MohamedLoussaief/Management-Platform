import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';
import User from './user.js';
import { format, addDays, eachDayOfInterval, isWeekend } from 'date-fns';

// Create schema
const Schema = mongoose.Schema;


enum RequestType{
Payslip="Payslip",
Insurance="Insurance Reimbursement",
SalaryAdvance = "Salary Advance",
WorkCertificate = "Work Certificate",
Leave = "Leave"
}


enum Status{
Awaiting="Awaiting",
ValidDepartHead="In progress: Validated by the head department",
ValidAdmin="Validated",
Canceled="Canceled"
}


enum LeaveType{
Paid="Paid", 
Unpaid="Unpaid"
}



// Request Schema
interface IRequest extends Document{
requestType:RequestType;
status:Status;
requestDate:Date;
amount:number;
document:string;
leaveType:LeaveType;
startDate:Date;
endDate:Date;
returnDate:Date;
substituteName:string;
certificateReason:string;
cin:string; 
deliveryDate:string;
id_emp:mongoose.Schema.Types.ObjectId;
}


const requestSchema = new Schema<IRequest>({
requestType:{type: String, enum: Object.values(RequestType), required:true},
status:{type: String, enum: Object.values(Status), required:true},
requestDate:{type: Date, default: function() {    
const tunisTime = new Date().toLocaleString('en-US', { timeZone: 'Africa/Tunis' });
return new Date(tunisTime);
}
},
amount:{type: Number},
document:{type: String},
leaveType:{type: String, enum: Object.values(LeaveType)},
startDate:{type: Date},
endDate:{type: Date},
returnDate:{type: Date},
substituteName:{type: String},
certificateReason:{type: String},
cin:{type: String},
id_emp: {type: mongoose.Schema.Types.ObjectId, ref: 'User' , required:true}
}
)


// Define static methods
interface IRequestModel extends Model<IRequest>{

salaryRequest(amount:number, id_emp:string):Promise<IRequest>

payslipRequest(id_emp:string):Promise<IRequest>

LeaveRequest(id_emp:string, leaveType:string, startDate:string,
endDate:string):Promise<IRequest>

workCertificateRequest(id_emp:string, cin:string, certificateReason:string):Promise<IRequest>

insuranceRequest(id_emp:string, document:string | null):Promise<IRequest>


} 


//Salary Advance Request
requestSchema.statics.salaryRequest = async function(this:Model<IRequest>, amount:number, id_emp:string){


if(!amount || !id_emp){

throw new Error("Please fill the empty field")

}


if(!validator.isNumeric(String(amount))){

throw new Error("Amount must be a number")

}


// Check if there's a salary advance request in the current month
const salaryReq = await this.findOne({id_emp: id_emp, requestType: "Salary Advance"}).select("requestDate").sort({requestDate:-1}).exec();

const requestDate = salaryReq?.requestDate as Date

const oneMonthAgo:Date = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

if( requestDate && (requestDate >= oneMonthAgo) ){

throw new Error("The salary advance request must be once a month")

}


// Check the amount 
if(amount > 1000){

throw new Error("The amount must not exceed 1000dt")

}

const employee = await User.findOne({_id:id_emp}).select("salary").exec()

const empSalary = employee?.salary 

if(empSalary && (empSalary/2) < amount){

throw new Error("The amount must not surpass 50% of the salary.")

}

const request = await this.create({amount, id_emp, status:"Awaiting", requestType:"Salary Advance"}) 
return request;


}


// Payslip request
requestSchema.statics.payslipRequest = async function(this:Model<IRequest>, id_emp){

if(!id_emp){

throw new Error("Please fill the empty field")

}


// Check if there's a payslip request in the current month
const payslipReq = await this.findOne({id_emp: id_emp, requestType: "Payslip"}).select("requestDate").sort({requestDate:-1}).limit(1).exec();

const requestDate = payslipReq?.requestDate as Date

const oneMonthAgo:Date = new Date();
oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)

if( requestDate && (requestDate >= oneMonthAgo) ){

throw new Error("The payslip request must be once a month")

}


const request = await this.create({id_emp, status:"Awaiting", requestType:"Payslip"}) 
return request;



}


// Leave request
requestSchema.statics.LeaveRequest = async function(this:Model<IRequest>, id_emp, leaveType, startDate,
endDate){

   
if(!id_emp || !leaveType || !startDate || !endDate){

throw new Error("Please fill the empty field")

}


if(leaveType !== LeaveType.Paid && leaveType !== LeaveType.Unpaid){

throw new Error("Leave type is not valid")

}


const currentDate = format(new Date(), 'yyyy-MM-dd')

if(!validator.isDate(startDate) || format(startDate, 'yyyy-MM-dd') !== startDate 
|| startDate < format(addDays(currentDate,2), 'yyyy-MM-dd')){

throw new Error("The start date is not valid")    

}

// Day of the start date
const dayStart = new Date(startDate).getDay() 

if(dayStart === 0 || dayStart === 6){

throw new Error("The start date is in the weekend days")     

}

if(!validator.isDate(endDate) || format(endDate, 'yyyy-MM-dd')!== endDate || endDate<startDate){

throw new Error("The end date is not valid") 

}

// Day of the end date 
const dayEnd = new Date(endDate).getDay()

if(dayEnd === 0 || dayEnd === 6){

throw new Error("The end date is in the weekend days")     
    
}


// check if there's a leave request already
const empLeaveRequest = await this.findOne({id_emp:id_emp, requestType:"Leave", 
status:{$in:[`${Status.Awaiting}`, `${Status.ValidDepartHead}`, `${Status.ValidAdmin}`]}}).select('endDate').sort({requestDate:-1}).limit(1).exec()
const empLeaveEndDate = empLeaveRequest?.endDate as Date

if(empLeaveRequest && empLeaveEndDate>new Date()){

throw new Error("You have already submitted a request for leave.") 
    
}


// Number of days off
const days = eachDayOfInterval({ start: startDate, end: endDate }).filter(day => !isWeekend(day)).length

// employee current leave balance
const empQuery = await User.findOne({_id:id_emp, userType:{ $in: ['Employee', 'DepartHead'] }}).select("leaveBalance").exec()

const empLeaveBalance = empQuery?.leaveBalance as number

if(leaveType == LeaveType.Paid && days>empLeaveBalance){
   
throw new Error("Insufficient leave balance") 

}



// Checking the department employees presence

const departQuery = await User.findOne({_id:id_emp}).select('id_depart').exec()

const id_depart = departQuery?.id_depart 

const empDepart = await User.find({id_depart}).exec()

const empIds = empDepart.map(emp=>emp._id)

const leaveRequests = await this.find({ id_emp: { $in: empIds }, requestType: "Leave", status: "Validated" }).exec();

let overlappingEmployees = [];

for(const request of leaveRequests){

const requestStartDate = new Date(request.startDate);
const requestEndDate = new Date(request.endDate);

if (new Date(startDate) <= requestEndDate && new Date(endDate) >= requestStartDate) {
    overlappingEmployees.push(request.id_emp); 
}

}

const empPresentNumber = (empDepart.length - 1) - overlappingEmployees.length

if(empPresentNumber < (empDepart.length)/2 ){

throw new Error("There's not enough employees present please choose another leave date")    

}





let returnDate = addDays(endDate, 1)

if(returnDate.getDay() === 6){
returnDate = addDays(returnDate, 2)
}else if(returnDate.getDay() === 0){
returnDate = addDays(returnDate, 1)
}



const request = await this.create({id_emp, status:"Awaiting", requestType:"Leave", 
leaveType, startDate, endDate, returnDate})

return request 

} 


// Work Certificate request 
requestSchema.statics.workCertificateRequest = async function(this:Model<IRequest>, id_emp, cin, certificateReason){


if(!id_emp || !cin || !certificateReason){

throw new Error("Please fill the empty field")

}

if(!validator.isNumeric(cin)){


throw new Error("The CIN must only contain numbers")

}

if(cin[0]!=="0" && cin[0]!=="1"){

throw new Error("The CIN must start with 0 or 1")

}


if(cin.length !== 8){

throw new Error("The CIN must be 8 digits")

}


// Checking if there's work certificate already
const empCertificateRequest = await this.findOne({id_emp:id_emp, requestType:"Work Certificate", 
status:{$in:[`${Status.Awaiting}`, `${Status.ValidDepartHead}`]}}).sort({requestDate:-1}).limit(1).exec()

if(empCertificateRequest){

throw new Error("You have already submitted a request for work certificate.")

}


const request = this.create({id_emp, status:"Awaiting", requestType:"Work Certificate", cin, certificateReason})

return request

}



// Insurance Reimbursement
requestSchema.statics.insuranceRequest = async function(this:Model<IRequest>, id_emp, document){

if(!id_emp){

throw new Error("Please fill the empty field")

}

if(!document){

throw new Error("Please upload a file")

}


// Checking if there's Insurance request already
const empInsuranceRequest = await this.findOne({id_emp:id_emp, requestType:"Insurance Reimbursement", 
status:{$in:[`${Status.Awaiting}`, `${Status.ValidDepartHead}`]}}).sort({requestDate:-1}).limit(1).exec()

if(empInsuranceRequest){

throw new Error("You have already submitted a request for insurance reimbursement.")

}

const request = await this.create({id_emp, status:"Awaiting", requestType:"Insurance Reimbursement", document})
return request 



}

export default mongoose.model<IRequest, IRequestModel>('Request', requestSchema); 




