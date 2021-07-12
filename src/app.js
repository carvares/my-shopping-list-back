import express from "express";
import cors from "cors";

import connection from "./database.js";

const app = express();
app.use(express.json());
app.use(cors());

app.post('/list', async (req, res) => {
    const  {text}  = req.body;
    if(text.length === 0) return res.sendStatus(401);
    try {
        await connection.query('INSERT INTO list (item) VALUES($1)', [text])
        res.sendStatus(201)
    } 
    catch(e) {
        console.log(e)
        res.sendStatus(401)
    }
})

app.get('/list', async (req, res)=>{
    try{
        const list = await connection.query('SELECT * FROM list')
        res.send(list.rows).status(200)
    } catch(e){
        console.log(e);
        res.sendStatus(401);
    }
})
export default app;
