import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt'
import depart from './depart.js';
import validator from 'validator'

// Create schema
const Schema = mongoose.Schema;


enum UserType {
Admin = "Admin",
Employee = "Employee",
DepartHead = "DepartHead"
}


// User Schema
interface IUser extends Document{

userType: UserType;
firstName: string;
lastName: string;
email: string;
password: string;
confirmPassword?:string;
salary?: number;
leaveBalance?: number;
func?: string;
id_depart?:string;
}




const userSchema = new Schema<IUser>({

userType:{type: String, enum: Object.values(UserType) ,required:true},
firstName:{type: String, required:true},
lastName:{type :String, required:true},
email:{type: String, required:true, unique:true },
password:{type: String, required:true},
salary:{type: Number},
leaveBalance: {type: Number},
func:{type: String},
id_depart:{type: String},
}); 



// Define the static methods
interface IUserModel extends Model<IUser> {
    addingEmp(email: string, password: string, confirmPassword:string,
    userType:string, firstName:string, lastName:string,
    salary:number, leaveBalance:number, func:string, id_depart:string): Promise<IUser>;

    updateEmp(email: string, password: string, confirmPassword:string,
        userType:string, firstName:string, lastName:string,
        salary:number, leaveBalance:number, func:string, id_depart:string, id:string):Promise<IUser>;

    login(email: string, password: string): Promise<IUser>;
}



// Validation  function
const validEmp = async(userType:string, func:string, firstName:string, 
lastName:string, email:string, id_depart:string, salary:number, 
leaveBalance:number, password:string, confirmPassword:string)=>{

if(userType=="Employee" && !func){

throw Error("Please fill the empty fields")
        
}
        
        
        
// lastName, firstName validation
if(!validator.isAlpha(firstName, 'en-US', {ignore: " " })){
        
throw new Error("FirstName must contain only letters")
        
}
        
if(!validator.isAlpha(lastName, 'en-US', {ignore: " " })){
        
throw new Error("LastName must contain only letters")
            
}
        
// email validation
if(!validator.isEmail(email)){
        
throw Error("Email is not valid")
                
}


// Departement Validation
try{
const departExist = await depart.findOne({_id:id_depart})  
}catch{
throw Error("Department not found")
}
    
    
    
// userType validation
if(userType!=="Employee" && userType!=="DepartHead"){
    
throw Error("Role is not valid")
    
}
    
// func, salary, leaveBalance  validation
if(func && !validator.isAlpha(func, 'en-US', {ignore: " " })){
    
throw new Error("Function must contain only letters")
            
}
    
    
if(!validator.isNumeric(String(salary))){
    
throw new Error("Salary must be a number")
    
}
    
if(!validator.isNumeric(String(leaveBalance))){
    
throw new Error("Leave Balances must be a number")
        
}
    
    
// confirmPassword validation
if(password !== confirmPassword){
    
throw new Error("The confirmation password does not match the password entered previously.")
        
}
    
    
// password validation
if(password && (!validator.isStrongPassword(password))){
    
throw Error("Password not strong enough");     
        
}





}









// static addUser method
userSchema.statics.addingEmp = async function(this:Model<IUser>, 
email:string, password:string, confirmPassword:string, userType:string, firstName:string, lastName:string,
salary:number, leaveBalance:number, func:string, id_depart:string){



// field empty validation
if(!firstName || !lastName || !email || !id_depart || !userType 
|| !salary || !leaveBalance || !confirmPassword || !password){

throw Error("Please fill the empty fields")

}


const exists = await this.findOne({email})   

if(exists){

throw Error("Email already exists")

}

await validEmp(userType, func, firstName, 
lastName, email, id_depart, salary, 
leaveBalance, password, confirmPassword)



const salt:string = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt);
const user = await this.create({email, password:hash, 
userType, firstName, lastName, salary, leaveBalance, func, id_depart})

await depart.findByIdAndUpdate(
id_depart,
{ $inc: { nbEmp: 1 } }

)


return user;

}



// static update Employee
userSchema.statics.updateEmp = async function(this:Model<IUser>, 
email: string, password: string, confirmPassword:string, userType:UserType, firstName:string, lastName:string,
salary:number, leaveBalance:number, func:string, id_depart:string, id:string){


// field empty validation
if(!firstName || !lastName || !email || !id_depart || !userType 
    || !salary || !leaveBalance){
    
throw Error("Please fill the empty fields")
    
}


// email validation
const empEmail = await this.findById(id).select('email')  

if(empEmail && (email!==empEmail.email)){

const exists = await this.findOne({email})   

if(exists){
    
throw Error("Email already exists")
    
}

}


await validEmp(userType, func, firstName, 
lastName, email, id_depart, salary, 
leaveBalance, password, confirmPassword)


try{

const emp = await this.findById(id)

if(!emp){

return null

}



// Update fields
const updatedFields:Partial<IUser> = {
userType,
func,
firstName,
lastName,
email,
id_depart,
salary,
leaveBalance,
};


if(password){

const salt:string = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt);
(updatedFields as { password: string }).password = hash;

}
    

Object.assign(emp, updatedFields);

await emp.save()

return emp

    
}catch(error:any){
    
throw Error(error.mes)
    
}



}



// static loginUser
userSchema.statics.login = async function(this:Model<IUser>, email:string, password:string){

// field empty validation
if(!email || !password){
throw Error("All fields must be filled")
}


// checking email 
const user =  await this.findOne({email})

if(!user){

throw Error("Incorrect email")

}


const match = await bcrypt.compare(password, user.password)

if(!match){

throw Error("Incorrect password")

}

return user;

}




export default mongoose.model<IUser, IUserModel>('User', userSchema);