import {Router} from 'express'
import {loginUser, logout, refresh} from '../controllers/auth.js'



const router = Router();


// login route
router.post('/login', loginUser)


// refrech route
router.get('/refresh', refresh)


// logout route 
router.post('/logout', logout)



export default router