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

}





// addUpdateDepart 
departSchema.statics.addDepart = async function(this:Model<IDepart>, departName:string){


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

const depart = await this.create({departName}) 

return depart;

}





export default mongoose.model<IDepart, IDepartModel>('Depart', departSchema);



