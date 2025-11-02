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


const allowedOrigins = [
  'https://miapp.vercel.app',
  /^https:\/\/.*\.vercel\.app$/ // permite previews
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      allowedOrigins.some((o) =>
        typeof o === 'string' ? o === origin : o.test(origin)
      )
    ) {
      callback(null, true);
    } else {
      callback(new Error('CORS bloqueado'));
    }
  },
  credentials: true
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});



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

