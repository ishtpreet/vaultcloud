import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";

export default connectDB(async function create(req, res){

    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const user = await Users.findOne({email: session.user.email})
        if(user){

            // const recepientUser = await Users.findOne({email: req.query.email})
            const requests = await Requests.find({recepientEmail: user.email}).populate('createdBy',{password: 0, _id: 0})
            if(requests.length > 0){
                res.status(200).json({message: 'success', data: requests})
                return
            }
            return res.status(200).json({message: 'No Requests'})

        }
        return res.status(403).json({success: false, message: 'Invalid User'})


    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
    
})