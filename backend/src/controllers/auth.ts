import { Request, Response } from "express"
import User from "../models/user.js"
import dotenv from 'dotenv'
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken"





// Define a type for the payload
interface DecodedToken extends JwtPayload {
_id: string;
fullName: string;
userType: string;
}



// creating token
const createToken= ({_id, fullName, userType}:DecodedToken, expireDate:string, secret:string)=>{

return jwt.sign({_id, fullName, userType}, secret, {expiresIn:expireDate})

} 



// login user
const loginUser = async(req:Request, res:Response)=>{


const {email, password} = req.body

try{

const user = await User.login(email, password)

const fullName = user.firstName + ' ' + user.lastName

// Create Access Token
const token = createToken({_id: user._id, fullName, userType: user.userType}, '15m', process.env.ACCESS_TOKEN_SECRET as string)


// Create refresh Token
const refreshToken = createToken({_id: user._id, fullName, userType: user.userType}, '7d', process.env.REFRESH_TOKEN_SECRET as string)


// Create secure cookie with refresh token
res.cookie('jwt', refreshToken, {

httpOnly: true, //accessible only by web server 
secure: true, //https
sameSite: 'none', //cross-site cookie 
maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match refresh Token

})


res.status(200).json({token}) 

}catch(error:any){

res.status(400).json({error: error.message})

}

}


const refresh = async(req:Request, res:Response)=>{

const cookies = req.cookies

if(!cookies?.jwt) return res.status(401).json({message:'Unauthorized'}) 

const refreshToken = cookies.jwt

jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, 
async(err: VerifyErrors | null, decoded:any | undefined) => {

if(err) return res.status(403).json({ message: 'Forbidden' })
    

const foundUser = await User.findOne({ _id:decoded._id }).exec()


if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })


const fullName = foundUser.firstName + ' ' + foundUser.lastName


const token = createToken({_id: foundUser._id, fullName, userType: foundUser.userType}, 
'15m', process.env.ACCESS_TOKEN_SECRET as string)


res.json({token})
    
}) 

}


const logout = async(req:Request, res:Response)=>{

const cookies = req.cookies

if (!cookies?.jwt) return res.sendStatus(204) //No content
res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
res.json({ message: 'Cookie cleared' })

}


export {loginUser, logout, refresh}