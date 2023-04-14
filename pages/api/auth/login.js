import clientPromise from '@/lib/mongodb';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const key = "La_Mia_Luna_is_the_woman_of_my_dreams"
export default async function handler(
    req,
    res
) {
    const client = await clientPromise;
    const db = client?.db("tracker")
    const {email, password} = req.body
    await db.collections("users").findOne({email})
    .then((user)=>{
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const payload = {
                    email: user.email,
                    password: user.password,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    initials: user.initials,
                    location: user.location
                }
                jwt.sign(payload, key)
            }
        }
    })
    res.status(200).json({message: "Login Successful" })
}
