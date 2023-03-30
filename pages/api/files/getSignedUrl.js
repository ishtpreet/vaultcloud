import connectDB from "../../../libs/utils/connectDB";
import Files from '../../../libs/models/Files';
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import Users from "../../../libs/models/Users";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
    region: "ap-south-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    signatureVersion: "v4",
  });

export default connectDB(async function upload(req, res){
    // if (req.method !== "POST") {
    //     return res.status(405).json({ message: "Method not allowed" });
    //   }
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {

    const user = await Users.findOne({email: session.user.email})
        if(user){
            try {
                // let { name, type } = req.body;
              
                const post = await s3.createPresignedPost({
                  Bucket: process.env.AWS_BUCKET_NAME,
                  Fields: {
                    key: `${user._id}/${req.query.file}`,
                    'Content-Type': req.query.fileType,
                  },
                  Expires: 60, // seconds
                  Conditions: [
                    ['content-length-range', 0, 1048576], // up to 1 MB
                  ],
                })
              
                res.status(200).json(post)
            
              } catch (err) {
                console.log(err);
                res.status(400).json({ message: err });
              }

            // var parentFolder = '/';
            // if(!req.files[0])
            // return res.status(200).send({message: 'No file Selected.'})
            // if(req.params.parentFolder)
            //     parentFolder = req.params.parentFolder;
            // // console.log(user.name+"  "+req.files[0].originalname)
            // const file = new Files({
            //     friendlyName:req.files[0].originalname,
            //     size:req.files[0].size,
            //     name:req.files[0].newName,
            //     path:req.files[0].key,
            //     publicUrl:req.files[0].location,
            //     fileType:req.files[0].contentType,
            //     userId:user.id,
            //     parentFolder:parentFolder,          
            // })
            // console.log(file)
            // file.save()
            // .then(()=>{
            //     res.status(200).send({msg:'File Uploaded'})
            // })
            // .catch((err)=>{
            //     res.status(200).send({msg:err})
            // })
            

        }
    }
    else {
        // Not Signed in
        res.status(401)
    }
    res.end()
})

// export const config = {
//     api: {
//       bodyParser: {
//         sizeLimit: "1mb", // Set desired value here
//       },
//     },
//   };