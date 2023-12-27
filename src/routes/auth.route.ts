import express from 'express';
const router = express.Router();

import { login, register } from '../controllers/auth.controller';

router.route('/register').post(register);
//router.post('/register', register)
router.route('/login').post(login);



export default router;