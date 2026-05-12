const express = require("express")
const ejs = require("ejs")
const PORT = 8010

const app = express()
app.set("views",__dirname+"/views")
app.use(express.static(__dirname+"/assets"))
app.set("view engine","ejs")

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/register",(req,res)=>{
    res.render("register")
})


app.listen(PORT,()=>{
    console.log(`App running on http://localhost:${PORT}/`)
})