import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

import Users from "../../../libs/models/Users";
import connectDB from "../../../libs/utils/connectDB";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: 'credentials',
            credentials:{
                name: {label: "Name", type: "text", placeholder: "Please Enter Name"},
                email: {label: "Email", type: 'email', placeholder: 'abc@example.com'},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req){
                // console.log(credentials, req)

                const name = credentials.name
                const email = credentials.email
                const password = credentials.password
                
                const user = await Users.findOne({email: email})
                if(!user){
                    throw new Error("You haven't registered yet")
                }
                if(user){
                    return signinUser({password, user})
                }

                if (user) {
                  // Any object returned will be saved in `user` property of the JWT
                  return user
                } else {
                  // If you return null then an error will be displayed advising the user to check their details.
                  return null
                }
            }
        })
    ]
}

const signinUser = async ({ password, user }) => {
    if (!user.password) {
    throw new Error("Please enter password")
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
    throw new Error("Password Incorrect.");
    }
    return user;
}

export default connectDB(NextAuth(authOptions));