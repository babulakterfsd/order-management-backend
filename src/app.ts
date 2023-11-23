import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//routes
app.use('/api/users');

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Order Management System Server, made by Babul Akter.',
  });
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

export default app;
