import express, { Request, Response } from 'express';
import { getBusDetails } from './controllers/api/BusControllers/busController';
import busRoutes from './routes/busRoutes';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1/bus', busRoutes); 
app.use('/auth', authRoutes);
app.use("*", (req, res) => {
  res.status(404).json({
    error : "Route not found"
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;