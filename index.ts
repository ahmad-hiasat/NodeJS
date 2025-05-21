import express from 'express';
import * as fs from "node:fs";
import path from "node:path";
import Data from "./TheClasses/Data";
import pool from "./models/db";
const PORT = 8082;
const app = express();



const ODATA = new Data(path.join(__dirname,'data','data.json'));
app.use(express.json());
app.get('/data', (req, res) => {
   res.send(ODATA.getDATA());
})
app.delete('/data/:id', (req, res) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        res.sendStatus(400);
        res.send('error id');
    }else if (id <= ODATA.getDATA().length) {
        ODATA.deleteData(id);
        res.sendStatus(200);
        res.send(ODATA.getDATA());
    }
})
app.post('/data', (req, res) => {
    ODATA.postData(req.body);
    res.send(ODATA.getDATA());
})
app.patch('/data/:id', (req, res) => {
    const id = +req.params.id;
    if(isNaN(id)) {
        console.log('error id');
        res.sendStatus(400);
    }else if (id <= ODATA.getDATA().length) {
        ODATA.PATCHData(id , req.body);
        res.sendStatus(200);
        res.send(ODATA.getDATA());    }
})
app.get('/' , (req, res) => {

    res.send(`<a href="/data">show data</a>`);
})
app.get('/data/DataBase', async (req, res) => {
    try {
        const thedata = await pool.query("SELECT * FROM products;")
        res.json({
            thedata:thedata.rows,
            length:thedata.rowCount,

        });

    }catch (e) {
        console.log(e);
    }
})
app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}\n`);


})