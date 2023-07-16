const express = require('express');
const dbConnection = require('./db/config');
const dotenv = require('dotenv')
const cors = require('cors')
const Note = require("./db/Note")
const app = express();
app.use(express.json());
dbConnection();
dotenv.config();
app.use(cors());


// Add note in MongoDb
app.post("/addnote",async(req, resp)=>{
    let note = new Note(req.body) 
    let result = await note.save();
    resp.send(result)
})

// getting Data from MongoDb

app.get("/notes",async(req, res)=>{
    let nData = await Note.find();        
    if(nData.length>0){
        res.send(nData)
    }else{
        res.send({msg: "No record available here"})
    }
})

// deleting added note
app.delete("/notes/:id",async(req,res)=>{    

    let delUser = await Note.deleteOne({_id: req.params.id})
    res.send(delUser)

})

// Getting note from MongoDb on the basis of Id
app.get("/singleNote/:id",async(req,res)=>
{
    let result = await Note.findOne({_id: req.params.id})
    res.send(result) 
})

// updating note data

app.put("/noteDetail/:id",async(req,res)=>{
    let result = await Note.updateOne(        
            {_id: req.params.id},
            {$set: req.body}                  
    )
    res.send(result)
})


//port

const PORT = process.env.port || 8000

app.listen(PORT,()=>{
    console.log(`Server started at PORT ${PORT} in ${process.env.App_Mod}`)
})