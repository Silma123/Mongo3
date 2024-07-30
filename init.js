const mongoose = require("mongoose");
const chat=require("./models/chat.js")

main().then(()=>{
    console.log("connection successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


let allchat=[
    {
        from:"sumit",
        to:"rohit",
        msg:"I am a failure",
        Created_at:new Date()
    },
    {
        from:"priya",
        to:"supriya",
        msg:"pari na kichu",
        Created_at:new Date()
    },
    {
        from:"rohit",
        to:"mohit",
        msg:"gordhov gordhov",
        Created_at:new Date()
    }
]
chat.insertMany(allchat);
