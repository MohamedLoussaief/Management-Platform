import mongoose from 'mongoose';
import validator from 'validator';
// Create schema
const Schema = mongoose.Schema;
// departSchema
const departSchema = new Schema({
    departName: { type: String, required: true, unique: true },
    nbEmp: { type: Number, default: 0 }
});
// Departement validation
const validateDepart = async function (departName) {
    if (!departName) {
        throw new Error("Please provide a departement name");
    }
    if (!validator.isAlpha(departName, 'en-US', { ignore: " " })) {
        throw new Error("Departement name must contain only letters");
    }
    const exists = await this.findOne({ departName });
    if (exists) {
        throw new Error("Departement name already exists");
    }
};
// Add Departement 
departSchema.statics.addDepart = async function (departName) {
    await validateDepart.call(this, departName);
    const depart = await this.create({ departName });
    return depart;
};
// Update Departement
departSchema.statics.updateDepart = async function (departName, id) {
    await validateDepart.call(this, departName);
    try {
        const depart = await this.findById(id);
        if (!depart) {
            return null;
        }
        depart.departName = departName;
        await depart.save();
        return depart;
    }
    catch {
        return null;
    }
};
export default mongoose.model('Depart', departSchema);
//# sourceMappingURL=depart.js.map