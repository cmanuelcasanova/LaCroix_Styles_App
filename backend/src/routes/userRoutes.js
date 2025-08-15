import express from 'express';
import { createUser, findAllTaskUsers, findUser, findUsers } from '../controllers/userController.js';

const router = express.Router();

router.get('/user/all/:id',findAllTaskUsers)
router.get('/user/:id',findUser)
router.get('/user',findUsers)
router.post('/user', createUser);

export default router;
