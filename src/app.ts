import express, { Request, Response, NextFunction } from 'express'; // Import NextFunction
import { dataRoutes } from './routes/dataRoutes.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import { userRoutes } from './routes/userRoutes.js';
import cors from 'cors';
import bcrypt from "bcrypt";
import { prisma } from './prismaClient.js';
import { loginSchema } from './validations/zod.js';
import { z } from 'zod';

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/data', authenticateToken, dataRoutes); // Data routes
app.use('/api/user', userRoutes); // User create/login routes

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
  res.send(`Data Portal Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
