const express = require('express');
const {NoteModel}  = require(`../model/notes.model`)
const noteRouter = express.Router()


noteRouter.get("/",async(req , res)=>{
    const notes = await NoteModel.find()
    res.send(notes)
    res.send("All the notes")
})

noteRouter.post("/create",async(req, res)=>{
    const payload = req.body
    try{
        const note =  new NoteModel(payload)
        await note.save()
        res.send({"msg":"Note created successfully"})

    }catch(err){
        res.send({"msg":"error" , "err":err.message})
    }

})
noteRouter.delete("/delete/:id",async(req, res)=>{
    const noteId = req.params.id
    await NoteModel.findByIdAndDelete({_id:noteId})
    res.send({"msg":`NoTE with id ${noteId} is deleted`})
    res.send("Deleted")

})

module.exports ={
    noteRouter
}