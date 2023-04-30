import { unstable_getServerSession } from "next-auth/next"
import connectDB from "../../../libs/utils/connectDB";
import Rooms from '../../../libs/models/Room';
import Users from "../../../libs/models/Users";
import { authOptions } from "../auth/[...nextauth]"

export default connectDB(async function check(req, res){

      const session = await unstable_getServerSession(req, res, authOptions)
      if (session) {

        const user = await Users.findOne({email: session.user.email})
        // console.log(req.query)
        // const room = await Rooms.findOne({shortId: req.query.roomFriendlyId, 
        //     arrayfield: {
        //     $elemMatch: {
        //       createdBy: user._id
        //     }
        //   }})
        const room = await Rooms.findOne({shortId: req.query.roomFriendlyId})
        if(room && room!=undefined){
          if(String(room.createdBy) == String(user._id)){
            console.log("Matched - Owner")
            // console.log("room", room)
            if(room && room._id){
              //   console.log("yoo ", room.name, room.createdBy[0])
                    res.status(200).json({message: 'success', roomName: room.name, roomId: room._id, userName: user.name, userId: user._id, userEmail: user.email})
                    return
            }
          }
          else{
            // Check if the user is member of room!
            for(var i=0; i<=room.members.length; i++){
              // console.log(i)
              if(String(room.members[i]) === String(user._id)){
                console.log("Matched - Invited User")
                res.status(200).json({message: 'success', roomName: room.name, roomId: room._id, userName: user.name, userId: user._id, userEmail: user.email})
                return
              }
            }
            console.log("Invalid")
            res.status(200).json({message: 'fail'})
            return

          }
        }
      }
      console.log("session mismatch")
        
        res.status(200).json({message: 'fail'})
            
})