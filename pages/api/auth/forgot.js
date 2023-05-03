import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";
import nodemailer from 'nodemailer'

export default connectDB(async function Forgot(req, res){

        const user = await Users.findOne({email: req.query.email})
        if(user){
            if(user.token){
                user.token=''
            }
            user.token = Math.random().toString(36).substr(2, 5)
            await user.save()
            

                // TODO: Send EMail to -> req.query.email
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                           user: 'vaultcloud06@gmail.com',
                           pass: 'atmquqwlepzikfgw'
                       }
    
                   });
                   const mailOptions = {
                    from: 'vaultcloud06@gmail.com', // sender address
                    to: req.query.email, // list of receivers
                    subject: 'Password reset', // Subject line
                    html: '<p>Hi ,</p><p> We recieved a password reset request. </p><p>Click on the link to rest password. https://vaultcloud.netlify.app/fpass/'+user.token+'</p>'// FIXME: Change URL
                  };
                  transporter.sendMail(mailOptions, function (err, info) {
                    if(err)
                      return res.status(500).send({message:err})


                    res.status(200).json({message: 'success', data: []})
                    return
                    //   res.status(200).send({message:'e-Mail Sent!'})
                 });
                // 

            

            
            
        } else {
            // Not Signed in
            return res.status(403).json({success: false, message: 'Invalid User'})
    }
    
})