const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let logs = [];

function addLog(message){
 const logMsg = `[${new Date().toLocaleTimeString()}] ${message}`;
 logs.push(logMsg);
 console.log(logMsg);
}

const passwordSchema = new mongoose.Schema({
 password:String,
 strength:String,
 score:Number,
 createdAt:{type:Date,default:Date.now}
});

mongoose.model('Password',passwordSchema);

app.post('/api/passwords',async(req,res)=>{
 try{
   const {password,strength,score}=req.body;

   addLog(`Password checked → Strength: ${strength}, Score: ${score}`);

   res.status(201).json({
     message:'Password evaluation saved successfully',
     data:{password,strength,score}
   });

 }catch(error){
   addLog(`Error: ${error.message}`);
   res.status(500).json({message:'Server error'});
 }
});

app.get('/api/health',(req,res)=>{
 addLog('Health API called');
 res.json({status:'OK'});
});

app.get('/logs',(req,res)=>{
 res.json(logs);
});

app.use(express.static(path.join(__dirname,'../frontend/dist')));

app.get('/',(req,res)=>{
 res.sendFile(path.join(__dirname,'../frontend/dist/index.html'));
});

app.listen(PORT,'0.0.0.0',()=>{
 addLog(`Server running on port ${PORT}`);
});
