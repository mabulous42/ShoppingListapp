const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const myname = "Abbas Mustapha";
console.log(myname);

const arr = [20, 50, 35, 80, 130];
const sum = arr.reduce((total, index)=>{
    return (index + total)
})

console.log(sum);


app.get("/shopList", (req,res)=>{
    res.render("index");
})

let shopList = []
app.post("/shopList", (req,res)=>{
    let data = req.body;
    let subtotal = req.body.amount * req.body.quantity;
    data.subtotal = subtotal;
    shopList.push(data)
    let total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);
    console.log(total);
    console.log(shopList);
    res.render("index", {shopList, total})
})

app.get("/", (req,res)=>{
    res.send(myname)
})








const port = "7070";
app.listen(port, ()=>{
    console.log(`Server Started at port:${port}`);
})