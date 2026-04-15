import express from 'express';
import cors from 'cors';
import ProductRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js'
import shoppingRoutes from './routes/ShoppingRoutes.js'
import cookieParser from "cookie-parser";

import dotenv from "dotenv";



const app = express();
dotenv.config({ quiet: true }); 

app.set('trust proxy', 1);

app.use(cors({
 origin: process.env.FRONTEND_URL,   
  credentials: true                
}));

app.get('/', (req, res) => {
  res.send('Backend activo  🚀');
});


app.use(express.json());
app.use(cookieParser());
app.use('/api', ProductRoutes);
app.use('/api', userRoutes);
app.use('/api', fileRoutes);
app.use('/api', shoppingRoutes);



export default app;

