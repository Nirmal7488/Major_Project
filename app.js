const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate")

app.set("views",path.join(__dirname,"views"));
app.set("veiw engine","ejs");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate);

main()
.then(()=>{console.log("connection successful")})
.catch((err)=>{console.log(err)})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//Index Route
app.get("/listings",async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings})
})

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//Show Route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
})

//Create Route
app.post("/listings",async(req,res)=>{
    // let {title,description,image,price,location,country} = req.body;
    // let listing = req.body.listing;
    let newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings")
})

//Edit Route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})

//Update Route
app.put("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    let updateList = req.body.listing;
    await Listing.findByIdAndUpdate(id,updateList);
    res.redirect(`/listings/${id}`)
})

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})




// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"my new villa",
//         description:"by the beach"
//         ,price:1200
//         ,location:"pune, mumbai"
//         ,country:"India"
//     });
//     await sampleListing.save();
//     console.log("data saved");
//     res.send("successful test")
// })

app.get("/",(req,res)=>{
    res.render("listings/home.ejs");
})


app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})