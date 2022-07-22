const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const path = require('path')

const app = express()


//middleware
app.use(cors())
app.use(express.json())
const verifyJWT =(req,res,next)=>{

    const token = req.headers['x-access-token']
 
    if(!token){
     res.json({auth:'no token'})
    }else{
     jwt.verify(token,'thisIsSecret',(err,decoded)=>{
         if(err){
             res.json({auth:'failed'})
         }else{
             console.log(token);
            req.userId = decoded.id
            next()
         }
     })
    }
 
 }

 

app.listen(5000)

console.log('server start');


app.get('/',(req,res)=>{
    res.send('server is listening in port 5000')
})