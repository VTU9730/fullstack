const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
app.use(cors())
app.use(bodyParser.json())
const db=require('mongodb')
// mongoose.connect("mongodb://0.0.0.0:27017/todoDB",{ useNewUrlParser: true, useUnifiedTopology: true })
//     .then(()=>console.log("db connected"))
//     .catch((err)=>console.log(err))
mongoose.connect("mongodb+srv://PRATHAP:VEERA6543@cluster0.98yxf.mongodb.net/todoDB",{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log("db connected"))
    .catch((err)=>console.log(err))
// mongodb+srv://PRATHAP:<password>@cluster0.98yxf.mongodb.net/?retryWrites=true&w=majority
// Schema for Todo
const todoSchema=new mongoose.Schema({
    todo:String,
})
// Created model for Todo
const Todo=new mongoose.model('Todo',todoSchema)

app.get('/',(req,res)=>{
    Todo.find()
        .then(todos=>res.send(todos))
        .catch(err=>res.send(err))
})
app.post('/',(req,res)=>{
    const todo=new Todo(req.body)
    todo.save().then(()=>console.log("todo inserted"))
    res.redirect('/')
})
app.post("/delete",(req,res)=>{
    const id=req.body.id
    console.log(id);
    Todo.deleteOne({"_id":id})
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    res.redirect('/')
})
app.listen(4000,()=>{
    console.log('server listening at 4070');
})

