const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const myname = "Abbas Mustapha";
console.log(myname);


app.get("/home", (req,res)=>{
    res.render("index");
})

app.get("/", (req,res)=>{
    res.send(myname)
})








const port = "7070";
app.listen(port, ()=>{
    console.log(`Server Started at port:${port}`);
})