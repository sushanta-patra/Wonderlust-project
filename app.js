const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const mongoURL = "mongodb://127.0.0.1:27017/wonderlust";
const path = require("path");
const methodOverride = require("method-override")

async function main(){
    await mongoose.connect(mongoURL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//index route
app.get("/listings",async (req,res)=>{
    const allListing = await Listing.find({});
    const listing = res.render("listings/index.ejs",{allListing});
})  

//New route
app.get("/listing/new",(req,res)=>{
    res.render("listings/new");
})

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("listings/show.ejs",{list});
});

//Create route
app.post("/listings",async(req,res)=>{
    let listing = req.body.listing;
    const newListing = new Listing(req.body.listing);
    newListing.save();
    res.redirect("/listings");
})

//Edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let list = await Listing.findById(id);
    res.render("listings/edit.ejs",{list});    
})

//Update route
app.put(" m /listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    redirect("/listings");
})

// app.get("/testListing",async (req,res)=>{
//     let sampleListing = new Listing({
//         title:"My new Home",
//         description:"luxurios villa afordable",
//         price:12000,
//         location:"Vadodara,Gujrat",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfull testing");
// })


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