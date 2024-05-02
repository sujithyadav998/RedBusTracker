import express, { Request, Response } from 'express';
import busRoutes from './routes/busRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/auth', authRoutes);

app.use('/api/v1/bus', busRoutes); 
app.use('/api/v1/user', userRoutes);

app.use("*", (req, res) => {
  res.status(404).json({
    error : "Route not found"
  })
})

export default app;