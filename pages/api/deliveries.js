import dbConnect from "@/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import User from "./models/Users";
import Shipment from "./models/Shipment";
import State from "./models/State";

export default async function handler(req, res){
    await dbConnect()
    await Shipment.aggregate([
        {
          $lookup: {
            from: "states", 
            localField: "_id",
            foreignField: "shipmentId",
            as: "states",
          },
        },
        {
            $lookup: {
                from: "users", 
                localField: "userId",
                foreignField: "_id",
                as: "user",
            },
        },
        {   $unwind:"$user" },
        {
            $project: {
                _id: 1,
                number: 1,
                product: 1,
                start_location: 1,
                end_location: 1,
                sender: 1,
                status: 1,
                user: "$user",
                states: "$states"
            }
        }
      ])
      .then(ships=>{
        res.json({
            message: "All deliveries returned",
            data: ships
        })
      })
}