import connectDB from "../../../libs/utils/connectDB";
import Rooms from '../../../libs/models/Room';
import Users from "../../../libs/models/Users";

export default connectDB(async function check(req, res){

        const user = await Users.findOne({email: req.query.email})
        const room = await Rooms.findOne({shortId: req.query.roomFriendlyId, 
            arrayfield: {
            $elemMatch: {
              createdBy: user._id
            }
          }})
          if(room){
            //   console.log("yoo ", room.name, room.createdBy[0])
                  res.status(200).json({message: 'success', roomName: room.name, roomId: room._id})
                  return
          }
        
        res.status(403).json({message: 'fail'})
            
})