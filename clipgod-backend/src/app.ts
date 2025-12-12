import express from 'express';
import { supabase } from './config/env';
import routes from './routes/index';
import { authMiddleware } from './middleware/auth';

const app = express();
app.use(express.json());
app.use(authMiddleware); // Supabase auth for all routes
app.use('/api/v1', routes);

app.listen(3000, () => console.log('Server running on port 3000'));
