import express from 'express'
import dotenv from 'dotenv'
import "../backend/db/db.js"
import bodyParser from 'body-parser';
import cors from 'cors';
import AuthRouter from './Routes/AuthRouter.js';
import ProductRouter from './Routes/ProductRouter.js';
import FormRouter from "./Routes/FormRouter.js";
import SubmissionRouter from "./Routes/SubmissionRouter.js";


const app = express()
dotenv.config()


app.get('/' ,(req , res)=>{
    res.send("i am here")
})
app.use(express.json());

app.use(bodyParser.json());
app.use(cors())
app.use('/auth' , AuthRouter)
app.use('/products' , ProductRouter)
app.use("/forms", FormRouter);
app.use("/submissions", SubmissionRouter);

const PORT = process.env.PORT || 8090


app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})

