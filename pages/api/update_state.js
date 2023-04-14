import { NextApiRequest, NextApiResponse } from "next";
import State from "./models/State";
import dbConnect from "@/lib/mongodb";

export default async function handler(
  req,
  res
){
        await dbConnect()
    await State.create(new State(req.body))
    .then(stt=>{
        res.json({
            message: "State Updated Successfully",
            data: stt
        })
    })
}