import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import departRoutes from './routes/depart.js';
import requestRoutes from './routes/request.js';
import { updateLeaveBalances } from './controllers/user.js';
import cron from 'node-cron';
import cookieParser from 'cookie-parser';
import documentsRoutes from './routes/document.js';
dotenv.config({ path: '../.env' });
const app = express();
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/depart", departRoutes);
app.use("/request", requestRoutes);
app.use("/download", documentsRoutes);
// Schedule a cron job to run the leave balance update task at the beginning of each month
cron.schedule('0 0 1 * *', updateLeaveBalances);
// Connect to db
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected succefully");
}).catch((error) => { console.log("error with connecting", error); });
app.listen(process.env.PORT, () => {
    console.log(`I'm listening in port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map