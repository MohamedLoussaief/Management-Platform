import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt'
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
salary?: number;
leaveBalance?: number;
func?: string;

}




const userSchema = new Schema<IUser>({

userType:{type: String, enum: Object.values(UserType) ,required:true},
firstName:{type: String, required:true},
lastName:{type :String, required:true},
email:{type: String, required:true, unique:true },
password:{type: String, required:true},
salary:{type: Number},
leaveBalance: {type: Number},
func:{type: String}

}); 



// Define the static methods
interface IUserModel extends Model<IUser> {
    addingUser(email: string, password: string,
    userType:string, firstName:string, lastName:string,
    salary:number, leaveBalance:number, func:string): Promise<IUser>;

    login(email: string, password: string): Promise<IUser>;
}




// static addUser method
userSchema.statics.addingUser = async function(this:Model<IUser>, 
email:string, password:string, userType:string, firstName:string, lastName:string,
salary:number, leaveBalance:number, func:string){


// Validation

// field empty validation
if(!email || !password){
throw Error("All fields must be filled")
}

// email validation
if(!validator.isEmail(email)){

throw Error("Email is not valid")
    
}

// password validation
if(!validator.isStrongPassword(password)){

throw Error("Password not strong enough");     

}



const exists = await this.findOne({email})   

if(exists){

throw Error("Email already exists")

}

const salt:string = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt);
const user = await this.create({email, password:hash, 
userType, firstName, lastName, salary, leaveBalance, func})

return user;

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