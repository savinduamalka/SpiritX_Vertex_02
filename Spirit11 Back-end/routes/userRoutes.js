import express from 'express';
import { signup, login, getAllUsers, logout } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/all-users', getAllUsers);
userRouter.post('/logout', logout);

export default userRouter;

