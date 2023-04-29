import mongoose from "mongoose";


var Schema = mongoose.Schema;

var request = new Schema({
    roomName:{
        type: String,
        require: true
    },
    recepientEmail:{
        type: String,
        require: true
    },
    recepientID: {
        type: String,
        require: true
    },
    accepted:{
        type: Boolean,
        default: false,
    },
    roomId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
    {
        timestamps: {
            createdAt: 'createdAt'
        }
    }

)

mongoose.models = {};

var Requests = mongoose.model('Request', request);

export default Requests;