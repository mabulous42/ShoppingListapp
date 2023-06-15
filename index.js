const express = require("express");
const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const myname = "Abbas Mustapha";
console.log(myname);

app.get("/", (req,res)=>{
    res.send(myname)
})
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
    let total = 0;
    let data = req.body;
    let subtotal = req.body.amount * req.body.quantity;
    data.subtotal = subtotal;
    shopList.push(data)
    total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);
    console.log(total);
    console.log(shopList);
    res.render("index", {shopList, total})
})

app.post("/deleteItem", (req,res)=>{
    let index = req.body.index;
    shopList.splice(index,1);
    total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);
    res.render("index", {shopList, total})
})

app.get("/editItem/:id", (req,res)=>{
    let index = req.params.id;
    let item = shopList[index].item;
    let amount = shopList[index].amount;
    let quantity = shopList[index].quantity;
    res.render("editItem", {item, amount, quantity, index})
})

app.post("/editItem", (req,res)=>{
    let id = req.body.index;
    console.log(id);
    let item = req.body.item;
    let amount = req.body.amount;
    let quantity = req.body.quantity;
    let subtotal = amount * quantity;
    let newData = {
        item,
        amount,
        subtotal,
        quantity
    }
    console.log(newData);
    shopList.splice(id, 1, newData);
    total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);


    console.log("edited list: " +shopList);
    console.log("Newtotal: " +total);
    res.render("index", {shopList,total});
})






const port = "7070";
app.listen(port, ()=>{
    console.log(`Server Started at port:${port}`);
})