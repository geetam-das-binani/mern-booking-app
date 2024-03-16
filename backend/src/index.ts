import express from 'express';
import cors from 'cors';
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import { errorMiddleware } from './middlewares/error.middleware';
import cookieParser from 'cookie-parser'
import path from 'path'


const app=express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));   
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
app.use(express.static(path.join(__dirname, '../../frontend/dist')))
app.use('/api/v1',userRoutes)
app.use(errorMiddleware)
mongoose.connect(process.env.DB_URL as string)
.then(()=>{console.log('connected to db')

app.listen(7000,()=>console.log('server is running on port 7000')
)
})
.catch((err)=>{console.log(err)
    process.exit();
})

