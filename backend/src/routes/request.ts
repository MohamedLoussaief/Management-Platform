import {Router} from "express"
import {salaryAdvanceRequest, payslipRequest, LeaveRequest, workCertificateRequest, insuranceRequest, 
storage, employeRequests, deleteRequest} from "../controllers/request.js"
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

router.post("/insuranceReimbursement", upload.single('file'), insuranceRequest)

router.get("/employeRequests/:id", employeRequests)

router.delete("/deleteRequest/:id", deleteRequest)

export default router