const express = require("express");
const ejs = require("ejs");
const { default: mongoose } = require("mongoose")

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


// app.get("/shopList", (req,res)=>{
//     let total = 0
//     res.render("index", {shopList,total});
// })

// let shopList = []
// app.post("/shopList", (req,res)=>{
//     let total = 0;
//     let data = req.body;
//     let subtotal = req.body.amount * req.body.quantity;
//     data.subtotal = subtotal;
//     shopList.push(data)
//     total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);
//     console.log(total);
//     console.log(shopList);
//     res.render("index", {shopList, total})
// })

// app.post("/deleteItem", (req,res)=>{
//     let index = req.body.index;
//     shopList.splice(index,1);
//     total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);
//     res.render("index", {shopList, total})
// })

// app.get("/editItem/:id", (req,res)=>{
//     total=0;
//     let index = req.params.id;
//     let item = shopList[index].item;
//     let amount = shopList[index].amount;
//     let quantity = shopList[index].quantity;
//     res.render("editItem", {item, amount, quantity, index, total})
// })

// app.post("/editItem", (req,res)=>{
//     let id = req.body.index;
//     console.log(id);
//     let item = req.body.item;
//     let amount = req.body.amount;
//     let quantity = req.body.quantity;
//     let subtotal = amount * quantity;
//     let newData = {
//         item,
//         amount,
//         subtotal,
//         quantity
//     }
//     console.log(newData);
//     shopList.splice(id, 1, newData);
//     total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0);


//     console.log("edited list: " +shopList);
//     console.log("Newtotal: " +total);
//     res.render("index", {shopList,total});
// })

const userSchema = new mongoose.Schema({
    item: {type: String, required: true},
    amount: {type: Number, required: true},
    quantity: {type: Number, required: true},
    subtotal: {type: Number, default:0}
})

const shopListModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)//creating a user table with an instance of the schema

//CREATE operation
app.post("/shopList", async(req,res)=>{  
    const {item, amount, quantity} = req.body 
    let subtotal = amount * quantity;
    try {
        const newItem = new shopListModel({
            item,
            amount,
            quantity,
            subtotal
        })
        const result = await newItem.save();
        console.log(total);
        console.log(result);
        // const result = await shopListModel.create(title,text)
        res.redirect("/shopList")
    } catch (error) {
        console.log(error);
    }
})

//READ Operation
app.get("/shopList", async(req,res)=>{
    try {
        total = 0;
        const shopList = await shopListModel.find();
        total = shopList.reduce((total, index)=>{return index.subtotal + total}, 0)
        console.log(shopList);
        res.render("index", {shopList:shopList, total})
    } catch (error) {
        console.log(error);
    }
})

//UPDATE
app.get("/editItem/:id", async(req,res)=>{
    try {
        let id = req.params.id;
        const entry = await shopListModel.findOne({_id:id});
        const {_id, item, amount, quantity} = entry;
        console.log(_id, item, amount, quantity);  
        res.render("editItem", {item, amount, quantity, _id})      
    } catch (error) {
        console.log(error);
    }
})

app.post("/editItem", async(req,res)=>{
    try {
        console.log(req.body);
        const {item, amount, quantity, _id} = req.body;
        let subtotal = amount * quantity;
        const update = await shopListModel.findByIdAndUpdate({_id:_id}, {$set:{item:item, amount:amount, quantity:quantity, subtotal:subtotal}});
        console.log(update);
        res.redirect("/shopList");
    } catch (error) {
        console.log(error);
    }
})

//DELETE
app.post("/deleteItem", async(req,res)=>{
    try {
        let index = req.body.index;
        let total = 0
        console.log(index);
        const deleteItem = await shopListModel.findByIdAndDelete({_id:index});
        console.log(deleteItem);
        res.redirect("/shopList")
    } catch (error) {
        console.log(error);
    }
})




const uri = "mongodb+srv://mabulous42:United4ever12345@cluster0.ubjmkrq.mongodb.net/shoppingListApplication?retryWrites=true&w=majority"

const connect = async () => {
    mongoose.set("strictQuery", false)
    await mongoose.connect(uri).then(()=>{
        console.log("Mongoose is connected to MongoDB");
    }).catch((error)=>{
        console.log(error);
    })
}

connect();

const port = "7070";
app.listen(port, ()=>{
    console.log(`Server Started at port:${port}`);
})