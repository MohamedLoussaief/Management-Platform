import { Request, Response } from "express"
import path from "path"
import { fileURLToPath } from 'url'
import request from "../models/request.js"
import user from "../models/user.js"
import PDFDocument from 'pdfkit'
import { generateWorkCertificate } from "../services/workCertificatePdf.js"
import depart from "../models/depart.js"
import { leaveDocument } from "../services/leaveDocumentPdf.js"


const downloadDocument = async(req:Request, res:Response)=>{

const {id} = req.params

try{

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const userRequest = await request.findById(id)


const document = path.join(__dirname, `../../files`, `${userRequest?.document}`)

res.download(document)



}catch(error:any){

res.status(500).json({msg:"Server error"})

}


}




export const generatePdf = async(req:Request, res:Response)=>{

const {id} = req.params

const doc = new PDFDocument()

let fileName = ""

try{

const userRequest = await request.findById(id)

const userData = await user.findById(userRequest?.id_emp)

const userDepart = await depart.findById(userData?.id_depart)


userRequest?.requestType=="Work Certificate"?fileName = "work_certificate.pdf": fileName="Leave_Document.pdf"


res.setHeader('Content-Type', 'application/pdf')

res.setHeader('Content-Disposition', `inline; filename=${fileName}`)


doc.pipe(res)

userRequest?.requestType=="Work Certificate"?generateWorkCertificate(doc, 
    userData?.firstName+" "+userData?.lastName , userRequest.cin, 
    userData?.func, userData?.registrationDate, userRequest.certificateReason):leaveDocument(doc, userData?.firstName, userData?.lastName, 
        userDepart?.departName, userRequest?.leaveType, userRequest?.startDate, userRequest?.endDate, userRequest?.returnDate, userRequest?.substituteName)



}catch(error:any){


res.status(500).json({msg:"Server error"})

}



}













export default downloadDocument 