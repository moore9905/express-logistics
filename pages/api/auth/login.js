import clientPromise from '@/lib/mongodb';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from '../models/Users';
import dbConnect from '@/lib/mongodb';

const key = "La_Mia_Luna_is_the_woman_of_my_dreams"
export default async function handler(
    req,
    res
) {
    await dbConnect()
    const {tracking_code} = req.body
    await User.findOne({personal_code: tracking_code})
    .then((user)=>{
        if(user){
                const payload = {
                    email: user.email,
                    _id: user._id,
                    password: user.password,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    initials: user.initials,
                    location: user.location,
                    isClient: true
                }
                
                res.status(200).json({message: "Login Successful", data: jwt.sign(payload, key) })
        }
        else {
            res.json({
                message: "Invalid tracking code",
                data: tracking_code
            })
        }
    })
}
