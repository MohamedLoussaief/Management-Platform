import { Router } from "express";
import { addDepart, getDepart } from "../controllers/depart.js";

const router = Router();

// adding depart
router.post("/addDepart", addDepart)

// get depart
router.get("/getDepart", getDepart)



export default router;