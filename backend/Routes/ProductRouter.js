import express from 'express'
import { ensureAuthentication } from '../Middleware/Auth.js';

const router = express.Router()

router.get('/' , ensureAuthentication, (req , res)=>{
    res.status(200).json([
        {
            name : "mobile",
            price : 10000
        },
        {
            name : "tv",
            price : 20000
        }
    ])
})

export default router;