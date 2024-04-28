import express, { Request, Response } from 'express';
import { getBusDetails } from './controllers/BusControllers/busController';
import busRoutes from './routes/busRoutes';

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use('/api/v1/bus', busRoutes); 

app.get("*", (req : Request, res: Response) => {
  return res.send('404 Not Found');
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
