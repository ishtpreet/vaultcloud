import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";
import nodemailer from 'nodemailer'

export default connectDB(async function Check(req, res){

        const user = await Users.findOne({token: req.query.token}, {password: 0, token: 0})
        if(user){
            
                    res.status(200).json({message: 'success', data: user})
                    return
                    //   res.status(200).send({message:'e-Mail Sent!'})
                // 
            
            
            
        } else {
            // Not Signed in
            return res.status(403).json({success: false, message: 'Invalid User'})
    }
    
})