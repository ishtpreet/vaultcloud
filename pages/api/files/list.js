import connectDB from "../../../libs/utils/connectDB";
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

export default connectDB(async function list(req, res){
    // if (req.method !== "POST") {
    //     return res.status(405).json({ message: "Method not allowed" });
    //   }
    const session = await unstable_getServerSession(req, res, authOptions)
    if (session) {

    const user = await Users.findOne({email: session.user.email})
        if(user){
            try {
                var params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Prefix: `${user._id}/` 
                  };
                  const data = await s3.listObjectsV2(params).promise()
                //   console.log(data)
                  res.status(200).send({success: true, data: data})
            
              } catch (err) {
                console.log(err);
                res.status(400).json({ message: err });
              }

        }
    }
    else {
        // Not Signed in
        res.status(401)
    }
    // res.end()
})
