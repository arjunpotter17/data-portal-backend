import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// Parse incoming JSON requests
app.use(express.json());

// Simple route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to data portal backend');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
