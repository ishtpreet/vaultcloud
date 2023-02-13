import mongoose from 'mongoose';

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  try{

    await mongoose.connect(process.env.MONGODB_URI, {
       useUnifiedTopology: true,
       useNewUrlParser: true
     })
     console.log("Database connected!")
  }
  catch(err){

    console.log(err)
  }
  return handler(req, res);
};

export default connectDB;