import mongoose from "mongoose";

var Schema = mongoose.Schema;

var room = new Schema({
    name:{
        // TODO: generate a random name using random-name-generator NPM Package
        default: 'a' 
    },
    createdBy: {
        
    }
})