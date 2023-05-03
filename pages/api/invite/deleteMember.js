import connectDB from "../../../libs/utils/connectDB";
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Requests from "../../../libs/models/Requests";
import Users from "../../../libs/models/Users";
import Rooms from "../../../libs/models/Room";

export default connectDB(async function deleteMember(req, res){

    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {
        const user = await Users.findOne({email: session.user.email})
        if(user){

            // const recepientUser = await Users.findOne({email: req.query.email})
            // console.log(req.query.Id, user.email)
            // const requests = await Requests.findOne({_id: req.query.Id, recepientEmail: user.email})
            // FIXME: Delete User from member array of Room
            const room = await Rooms.updateOne({_id: req.query.roomId},{
                $pullAll:{
                    members: [{_id: req.query.memberId}]
                }
            })
            if(room){
                    res.status(200).json({message: 'success', data: room})
                    return
                
            }
            // FIXME: Delete Request object with corresponding 
            // console.log(requests)
            // if(requests.roomId._id == req.query.roomId){
            //     // TODO: Check RoomId and add user to members array
            //     const room = await Rooms.findOneAndUpdate({_id: requests.roomId}, {$push:{members:[ user._id]}})
            //     console.log(room)
            //     // TODO: Change requests.accepted = true -> requests.save()
            //     requests.accepted = true
            //     await requests.save()
            //     return
            // }
            return res.status(200).json({message: 'Invalid Room Id'})

        }
        return res.status(403).json({success: false, message: 'Invalid User'})


    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
    
})