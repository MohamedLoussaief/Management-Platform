import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import FileDownload from 'js-file-download'



export const useGeneratePdf = ()=>{


const {user} = useAuthContext()



const generatePdf = async(id:string)=>{

if(!user){
 return
}


try{

const res = await axios.get(`/download/generate-pdf/${id}`,{responseType: 'blob', headers:
{Authorization:`Bearer ${(user as { token: string } ).token}`} })

const disposition = res.headers['content-disposition']

const fileName = disposition.split('filename=')[1]

FileDownload(res.data, fileName)

}catch(error:any){

console.error(error.response.data.msg)

}

}

return {generatePdf}

}