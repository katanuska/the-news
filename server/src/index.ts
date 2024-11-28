import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import authRoutes from './auth/authRoutes';
import articleRoutes from './articles/articleRoutes';
import favoriteRoutes from './favorite/favoriteRoutes';
import { validateTokenMiddleware } from './auth/validateTokenMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // To parse cookies
app.use(bodyParser.json());
app.use(validateTokenMiddleware);

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/favorite', favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
