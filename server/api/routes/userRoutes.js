import express from 'express'
const router = express.Router();
import { registerUser, loginUser, getUser ,SendUPIMoney,takeloan,payloan} from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';


router.get('/', verifyToken, getUser)
router.post('/signup', registerUser);
router.post('/signin', loginUser);
router.post('/sendupimoney', verifyToken, SendUPIMoney);
router.post('/loan', verifyToken, takeloan);
router.post('/payloan', verifyToken, payloan);

export default router;

