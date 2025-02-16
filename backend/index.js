import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(cors());
// app.use(
//     cors({
//     origin:'http://localhost:2000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders:['Content-Type'],
// })
// );

// Root Route
app.get("/", (req, res) => {
    console.log(req);
    return res.status(200).send("Welcome to MERN Stack");
});

app.use('/books', booksRoute);

    



mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('App is connect to database');
    app.listen(PORT, ()=>{
        console.log(`App is running on port: ${PORT}`);
    
    });
    
})
.catch((error )=>{
    console.log(error);
})
