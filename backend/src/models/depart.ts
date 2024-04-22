import mongoose, { Document, Model } from 'mongoose';
import validator from 'validator';

// Create schema
const Schema = mongoose.Schema;

interface IDepart extends Document{
departName : string,
nbEmp?: Number
}

// departSchema
const  departSchema = new Schema<IDepart>({

departName:{type:String,required:true, unique:true},
nbEmp:{type:Number, default:0}

})


// Define the static methods
interface IDepartModel extends Model<IDepart>{

addDepart(departName:string):Promise<IDepart>
updateDepart(departName:string, id:string):Promise<IDepart>

}


// Departement validation
const validateDepart = async function(this:Model<IDepart>, departName:string){

if(!departName){
throw new Error("Please provide a departement name")        
}
        
        
if(!validator.isAlpha(departName, 'en-US', {ignore: " " })){
throw new Error("Departement name must contain only letters");
}
                
const exists = await this.findOne({departName})
                
if(exists){
throw new Error("Departement name already exists") 
}

    
} 



// Add Departement 
departSchema.statics.addDepart = async function(this:Model<IDepart>, departName:string){

await validateDepart.call(this, departName);
const depart = await this.create({departName}) 
return depart;

}


// Update Departement
departSchema.statics.updateDepart = async function(this:Model<IDepart>, departName:string, id:string){

await validateDepart.call(this, departName);

try{ 

const depart = await this.findById(id);

if (!depart) {
return null
}

depart.departName = departName

await depart.save()

return depart

}catch{

return null

}

}


export default mongoose.model<IDepart, IDepartModel>('Depart', departSchema);



