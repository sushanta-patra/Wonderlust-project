const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const mongoURL = "mongodb://127.0.0.1:27017/wonderlust";

async function main(){
    await mongoose.connect(mongoURL);
}

app.get("/testListing",async (req,res)=>{
    let sampleListing = new Listing({
        title:"My new Home",
        description:"luxurios villa afordable",
        price:12000,
        location:"Vadodara,Gujrat",
        country:"India",
    })
    await sampleListing.save();
    console.log("sample was saved");
    res.send("successfull testing");
})


main().then(()=>{
    console.log("DB connect");
}).catch((err)=>{
    console.log(err);
})



app.get("/",(req,res)=>{
    res.send("Hi I am root");
})

app.listen(8080,()=>{
    console.log("server listing");
})