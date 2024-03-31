import { Router } from 'express';
import { loginUser, addUser } from '../controllers/user.js';
const router = Router();
// login route
router.post('/login', loginUser);
// Add user
router.post('/addUser', addUser);
export default router;
//# sourceMappingURL=user.js.map