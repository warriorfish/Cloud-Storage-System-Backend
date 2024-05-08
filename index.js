const express = require('express');
const app = express()
const port = 6676

app.get('/',(req,res)=>{
    res.json({'msg':'hello world'})
})

app.listen(port,()=>{
    console.log(`running server on : http://127.0.0.1:${port}`)
})