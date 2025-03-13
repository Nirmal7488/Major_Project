const mongoose = require("mongoose");

// const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/palm-trees-frame-a-beautiful-orange-sunset-eLYtlDkpkXw",
        set:(v)=>v===""? "https://unsplash.com/photos/palm-trees-frame-a-beautiful-orange-sunset-eLYtlDkpkXw":v
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;