import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import employeeRouter from './routes/employeeRouter.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'; //cookie parser
import cors from 'cors';
dotenv.config(); //enable .env config

const app = express();
const port = process.env.PORT; //read PORT variable in .env file
const db = process.env.DB; //read DB variable in .env file

// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: ['http://localhost:3000'],
    })
);


// Starting Server
app.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`)
});

// DB Connection
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }, async (err) => {
    if (err) {
        await console.error(err);
    }
    console.log(`Connected to MongoDB`);
})


// Set up Routes 
app.use("/auth", userRouter); //user routes
app.use("/employee", employeeRouter); // employee routes