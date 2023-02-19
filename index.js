const express = require('express');
const app = express();
app.use(express.json())
const {connection} = require("./server/db")
const {userRouter} = require("./routes/User.routes")
const {noteRouter} = require("./routes/note.route")
const cors = require("cors")
const {authenticate} = require("./middleware/check")
app.use(cors({
    origin: "*"
}))
app.get("/" , (req , res)=>{
    res.sendFile("HomePage")
})
app.use("/users" , userRouter)
app.use(authenticate)
app.use("/notes" , noteRouter)
app.listen(4500 , async() =>{
    try{
   await connection;
   console.log("Connected to db")
    }catch(err){
        console.log("Something went wrong")
        console.log(err)
        
    }
    console.log(`Running on the port 4500 `)
});