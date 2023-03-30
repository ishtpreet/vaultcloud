import mongoose from "mongoose";
import { nanoid } from 'nanoid';

const files = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default: nanoid(11)
    },
    friendlyName:{
        type:String,
        required:true,
    },
    parentFolder:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    fileType:{
        type:String,
        required:true
    },
    publicUrl:{
        type:String,
        required:true,
    },
    userId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
},
{
    timestamps:{
        createdAt: "CreatedAt"
}
})

mongoose.models = {};

var Files = mongoose.model('Files', files);

export default Files;