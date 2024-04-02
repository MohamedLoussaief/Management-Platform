import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import departRoutes from './routes/depart.js';
dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());
// routes
app.use("/user", userRoutes);
app.use("/depart", departRoutes);
// Connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected succefully");
}).catch((error) => { console.log("error with connecting", error); });
app.listen(process.env.PORT, () => {
    console.log(`I'm listening in port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map