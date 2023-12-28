import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectToDb from "./config/connectToDb.js";
import userRoute from './routes/userRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import path from "path";

dotenv.config();

//Connect to Database
connectToDb();

const app = express();


//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());



//routes
//user route in the main node file
app.use('/api/v1/users',userRoute);

//TRansaction route in the main node file
app.use('/api/v1/transactions',transactionRoute);


//static files
app.use(express.static(path.join(__dirname ,'./client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"))
})
const PORT =  process.env.PORT || 8080;


app.listen(PORT , ()=>{
    console.log(`Server is running on ${PORT}`);
})