import mongoose from "mongoose";
// import { randomName } from "random-name-generator";
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';
import { nanoid } from 'nanoid'


var Schema = mongoose.Schema;

var room = new Schema({
    name:{
        // TODO: generate a random name using random-name-generator NPM Package
        type: String,
        default: uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] }) 
    },
    members:[{

        type: mongoose.Schema.Types.ObjectId,
        ref: "User"

    }],
    shortId: {
        type: String,
        default: nanoid(6)
        },
    createdBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
},
    {
        timestamps: {
            createdAt: 'CreatedAt'
        }
    }

)

mongoose.models = {};

var Rooms = mongoose.model('Room', room);

export default Rooms;