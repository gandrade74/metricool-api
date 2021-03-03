import express from 'express';
import { authValidator } from '../validators/auth';
import { authenticate } from '../controllers/authController';

const router = express.Router();

router.post('/', authValidator, authenticate);

export default router;
