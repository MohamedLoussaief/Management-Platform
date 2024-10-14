import { Router } from "express";
import downloadDocument, { generatePdf } from "../controllers/document.js"

const router = Router();



router.get("/document/:id", downloadDocument)

router.get("/generate-pdf/:id", generatePdf)



export default router