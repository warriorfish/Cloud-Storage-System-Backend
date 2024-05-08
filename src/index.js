const express = require('express');

if(!process.env.PROD){
    require('dotenv').config()
}

const app = express();
const port = process.env.SERVER_PORT;

app.get('/',(req,res)=>{
    res.json({'msg':'hello world'})
})

app.listen(port,()=>{
    console.log(`running server on : http://127.0.0.1:${port}`)
})