import { Router } from "express";
import { addDepart, getAllDepart, deleteDepart, updateDepart } from "../controllers/depart.js";
import {requireAuth, requireAdmin} from "../middlewares/authMiddleware.js"
const router = Router();


// require authorization for all departement routes
router.use(requireAuth)

router.use(requireAdmin)

// adding depart
router.post("/addDepart", addDepart)

// get depart
router.get("/getAllDepart", getAllDepart)

// delete depart
router.delete("/deleteDepart/:id", deleteDepart)


// update depart
router.put("/updateDepart/:id", updateDepart)

export default router;