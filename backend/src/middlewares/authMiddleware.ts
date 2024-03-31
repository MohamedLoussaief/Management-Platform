import  jwt, { JwtPayload }  from "jsonwebtoken";
import User from "../models/user.js"
import { Request, Response, NextFunction} from "express";



interface AuthenticatedRequest extends Request {
    user?: any; 
}



const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction)=>{

// verify authorization
const {authorization} = req.headers;

if(!authorization){

return res.status(401).json({error:'Authorization token is required'})

}

const token = authorization.split(' ')[1]

try{

const {_id}= jwt.verify(token, process.env.SECRET as string) as JwtPayload

req.user = await User.findOne({_id}).select('_id')
next()


}catch(error){

console.log(error)
res.status(401).json({error:'Request is not authorized'})

}


} 
