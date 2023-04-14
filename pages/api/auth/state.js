import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import State from "../models/State";

export default async function handler(req,
    res){
        await dbConnect()
        await State.find({shipmentId: req.body.shipmentId})
        .then(async ship=>{
            await State.create(new State({...req.body, index: ship.index+1}))
        .then((user)=>{
            res.json({
                message: "State Updated successfully",
                user
            })
        })
        })
}