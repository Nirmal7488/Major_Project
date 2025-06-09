const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    mongoose.connect(URL)
}

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.error(err)
})

const initDB = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data)
    console.log("Data was initialized");
    
}

initDB();