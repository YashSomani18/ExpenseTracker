import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import morgan from "morgan";
import connectToDb from "./config/connectToDb.js";
import userRoute from './routes/userRoute.js';
import transactionRoute from './routes/transactionRoute.js';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();

// Connect to Database
connectToDb();

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoute);
app.use('/api/v1/transactions', transactionRoute);

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static files
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
