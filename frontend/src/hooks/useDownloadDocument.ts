import axios from "axios"
import { useAuthContext } from "./useAuthContext"
import FileDownload from 'js-file-download'



export const useDownloadDocument = ()=>{


const {user} = useAuthContext()



const downloadDocument = async(id:string)=>{

if(!user){
 return
}


try{

const res = await axios.get(`/download/document/${id}`,{responseType: 'blob', headers:
    {Authorization:`Bearer ${(user as { token: string } ).token}`} })

    const disposition = res.headers['content-disposition'];
    const fileName = disposition.split('filename=')[1].split(';')[0].replace(/"/g, '').split('-')[1]

FileDownload(res.data, fileName)


}catch(error:any){

console.error(error.response.data.msg)

}


}


return {downloadDocument}



}