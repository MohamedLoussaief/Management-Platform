import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
// Create schema
const Schema = mongoose.Schema;
var UserType;
(function (UserType) {
    UserType["Admin"] = "Admin";
    UserType["Employee"] = "Employee";
    UserType["DepartHead"] = "DepartHead";
})(UserType || (UserType = {}));
const userSchema = new Schema({
    userType: { type: String, enum: Object.values(UserType), required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salary: { type: Number },
    leaveBalance: { type: Number },
    func: { type: String }
});
// static addUser method
userSchema.statics.addingUser = async function (email, password, userType, firstName, lastName, salary, leaveBalance, func) {
    // Validation
    // field empty validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    // email validation
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    // password validation
    if (!validator.isStrongPassword(password)) {
        throw Error("Password not strong enough");
    }
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash,
        userType, firstName, lastName, salary, leaveBalance, func });
    return user;
};
// static loginUser
userSchema.statics.login = async function (email, password) {
    // field empty validation
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    // checking email 
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    return user;
};
export default mongoose.model('User', userSchema);
//# sourceMappingURL=user.js.map