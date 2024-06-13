const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {blogmodel} = require("./model/blog")
const bcrypt = require("bcryptjs")

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://Nevin:nevintensonk@cluster0.0rfrr.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0')


const generateHashedPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password,salt)
}

app.post("/signup",async(req,res)=>{
    let input = req.body
    let hashedPwd = await generateHashedPassword(input.password)
    let blog = new blogmodel(input)
    console.log(blog)
    res.json({Status:"success"})
    console.log(hashedPwd)
    input.password = hashedPwd
    
    blog.save()
})

app.listen(8002,()=>{
    console.log("server started")
})