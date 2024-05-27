import {Router} from "express"
import {salaryAdvanceRequest, payslipRequest, LeaveRequest, workCertificateRequest, insuranceRequest, 
employeRequests, deleteRequest, storage, requests, validateRequest, cancelRequest, 
validatePayslipRequest, substituteNames} from "../controllers/request.js"
import {requireAuth} from "../middlewares/authMiddleware.js"
import multer from "multer"

const router = Router();

const upload = multer({ storage: storage });

// require authorization 
//router.use(requireAuth)


// Salary Advance Request
router.post("/salaryAdvance", salaryAdvanceRequest)

router.post("/payslip", payslipRequest)

router.post("/Leave", LeaveRequest)

router.post("/workCertificate", workCertificateRequest)

router.post("/insuranceReimbursement", upload.single('file') ,insuranceRequest)

router.get("/employeRequests/:id", employeRequests)

router.delete("/deleteRequest/:id", deleteRequest)

router.get("/AllRequests/:userType/:id", requests)

router.put("/validateRequest/:id", validateRequest)

router.put("/cancelRequest/:id", cancelRequest)

router.put("/validatePayslipRequest/:id", upload.single('file'), validatePayslipRequest)

router.get("/substituteNames", substituteNames)


export default router