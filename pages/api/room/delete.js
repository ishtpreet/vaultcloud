import connectDB from "../../../libs/utils/connectDB";
import Rooms from '../../../libs/models/Room';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Users from "../../../libs/models/Users";

export default connectDB(async function del(req, res){
    // TO delete SET flag to true
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        await Rooms.findOneAndDelete({_id: req.query.id})
        res.status(200).json({message: 'success'})
        return
    }
    res.status(200).json({message: 'failure'})
})