import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'

export default connectDB(async function reset(req, res){

        const user = await Users.findOne({token: req.body.token})
        if(user){
            if(user.token){
                user.token=''
            }
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(req.body.password, salt)
            user.password = hashPass
            await user.save();
            res.status(200).json({message: 'success', data: user})
        } 
        else {
            // Not Signed in
            return res.status(403).json({success: false, message: 'Invalid User'})
    }
    
})