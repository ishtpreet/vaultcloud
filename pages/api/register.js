import bcrypt from 'bcrypt'
import connectDB from "../../libs/utils/connectDB";
import Users from '../../libs/models/Users'

export default connectDB(async function register(req, res){

    const body = req.body
    const user = await Users.findOne({ email: body.email })
    if (user) {
    res.status(200).json({ message: 'already registered' })
    return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(body.password, salt)
    const newUser = new Users({ email: body.email, password: hashPass, name: body.name })
    await newUser.save()
    res.status(200).json({ message: 'success' })
    
})