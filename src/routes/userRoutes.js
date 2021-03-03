import express from 'express';
import { createUserValidator } from '../validators/user';
import { createUser } from '../controllers/userController';

const router = express.Router();

router.post('/', createUserValidator, createUser);

export default router;
