import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
    "id": Number,
    "name": String,
    "title": String,
    "price": String,
    "catagory": String,
    "img": String,
    "description": String
});

const Car = mongoose.model('Car', carSchema);

export default Car;