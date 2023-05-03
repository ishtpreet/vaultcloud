import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";
import nodemailer from 'nodemailer'

export default connectDB(async function create(req, res){

    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const user = await Users.findOne({email: session.user.email})
        if(user){
            // console.log(req.query.email)
            const recepientUser = await Users.findOne({email: req.query.email})
            if(recepientUser){
                // console.log("Hi", recepientUser._id)
                const inviteRequest = new Requests({
                    recepientEmail: recepientUser.email,
                    roomName: req.query.roomName,
                    createdBy: user._id,
                    recepientID: recepientUser._id,
                    roomId: req.query.Id
                })
                await inviteRequest.save()
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
                    subject: user.name+' invited you!', // Subject line
                    html: '<p>Hi ,</p><p>'+user.name+' invited you to join his room <b>'+req.query.roomName+'</b></p><p>Click on the link to access the invite. https://vaultcloud.netlify.app</p>'// FIXME: Change URL
                  };
                  transporter.sendMail(mailOptions, function (err, info) {
                    if(!err){
                        res.status(200).json({message: 'success', data: inviteRequest})
                        return
                    }
                    res.status(500).send({message:err})
                    return
                    //   res.status(200).send({message:'e-Mail Sent!'})
                 });
                // 
            }
            else{
                return res.status(400).json({success: false, message: 'Invalid Email'})
            }
        }
        else{
            return res.status(403).json({success: false, message: 'Invalid User'})
        }


    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
    
})