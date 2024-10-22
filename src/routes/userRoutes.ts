import express from 'express';
import { getUserCreate, getUserLogin } from '../controllers/userController.js';


const router = express.Router();

// login, signup routees
router.post('/create', getUserCreate);
router.post('/login', getUserLogin);

export { router as userRoutes };
