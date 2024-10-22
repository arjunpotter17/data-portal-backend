import express from 'express';
import { getDataForUser } from '../controllers/dataController.js';

const router = express.Router();

// Route to get available mapped data
router.get('/', getDataForUser);

export { router as dataRoutes };
