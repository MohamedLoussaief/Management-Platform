import {Router} from 'express'
import {loginUser, addEmp, updateEmp, getAllEmp, deleteEmp} from '../controllers/user.js'
import {requireAuth, requireAdmin} from "../middlewares/authMiddleware.js"

const router = Router();

// login route
router.post('/login', loginUser)

// require authorization 
router.use(requireAuth)


router.use(requireAdmin)

// Add Employee route
router.post('/addEmp', addEmp)


// Update Employee route
router.put("/updateEmp/:id", updateEmp)


// get all employees route
router.get("/getAllEmp", getAllEmp)


// delete employee route
router.delete("/deleteEmp/:id/:id1", deleteEmp)


export default router;