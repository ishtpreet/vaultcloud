const AWS =   require('aws-sdk');
const multer = require("multer");
const multerS3 = require("multer-s3");
// const uuidv4 = require('uuid-random');
const nanoid = require('nanoid')

const Users = require('../models/Users');


const S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
});

isAllowedMimetype = (mime) => ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/x-ms-bmp', 'image/webp'].includes(mime.toString());


fileFilter = (req, file, callback) => {
    const fileMime = file.mimetype; 
    if(isAllowedMimetype(fileMime)) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}
getUniqFileName = (originalname) => {
    const name = nanoid(11);
    const ext = originalname.split('.').pop();
    return `${name}.${ext}`;
}

const handleUploadMiddleware = multer({
    fileFilter,
    storage: multerS3({
        s3: S3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => {
            const fileName = getUniqFileName(file.originalname);
            Users.findOne({_id:req.userId},
                (err,user)=>{
                if(err){
                    return res.status(500).send({mesage:err})
                }
                if(user){

                    const s3_inner_directory = user._id; 
                    const finalPath = `${s3_inner_directory}/${fileName}`;
        
                    file.newName = fileName;
        
                    cb(null, finalPath);
                }
            })
        }
    })
});

module.exports =  handleUploadMiddleware;