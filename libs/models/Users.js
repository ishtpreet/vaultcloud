import mongoose from "mongoose";

var Schema = mongoose.Schema

var user = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false
    },
    
    createdAt:{
        type: Date,
        default: Date.now
    }
})

mongoose.models = {};

var Users = mongoose.model('User', user);

export default Users;