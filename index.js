const express=require("express");
const app=express();
const path=require("path")
const mongoose = require('mongoose');
const chat=require("./models/chat.js")
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// let chat1=new chat({
//     from:"neha",
//     to:"sneha",
//     msg:"I am a looser",
//     Created_at:new Date()

// })
// chat1.save().then((res)=>{
//     console.log(res);
// })
app.get("/",(req,res)=>{
    res.send("root is working");
});
app.get("/chats",async(req,res)=>{
        let chats=await chat.find()
        console.log(chats);
        res.render("index.ejs",{chats});
    })
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let cht=await chat.findById(id);
    res.render("edit.ejs",{cht});
})

app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newmsg}=req.body;
    let updatedchat= await chat.findByIdAndUpdate(id,{msg:newmsg},{runValidators:true,new:true});
    console.log(req.body);
    console.log(updatedchat);
    res.redirect("/chats");
})
app.post("/chats",(req,res)=>{
  let{from,to,msg}=req.body;
  let newChat=new chat({
    from:from,
    to:to,
    msg:msg,
    Created_at:new Date()
  })
  newChat.save().then((res)=>{
    console.log("chat was saved");
  }).catch((err)=>{
    console.log(err);
  });
  res.redirect("/chats")
})
app.delete("/chats/:id",(req,res)=>{
    let {id}=req.params;
    let chattobedeleted=chat.findByIdAndDelete(id);
    console.log(chattobedeleted);
    res.redirect("/chats");

})
    // async function main() {
    //   await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    
    // }
      // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
    
    
//     let chat1=new chat({
//         from:"neha",
//         to:"sneha",
//         msg:"I am a looser",
//         Created_at:new Date()
    
//     })
//     chat1.save().then((res)=>{
//         console.log(res);
//     })
// })

app.listen(8080,()=>{
    console.log("server is listening to port 8080")
})