import dbConnect from "@/lib/mongodb";
import User from "../models/Users";

export default async function handler(req,res){
    await dbConnect()
    await User.find()
    .then(users=>{
        res.json({
            message: "Users retrieved successfully",
            data: users
        })
    })
}