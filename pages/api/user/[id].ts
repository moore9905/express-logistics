import dbConnect from "@/lib/mongodb"
import Shipment from "../models/Shipment"
import mongoose from "mongoose"

export default async function handler(req, res){
    const {id} = req.query
    const code = new mongoose.Types.ObjectId(id)
    await dbConnect()
    await Shipment.aggregate([
        {
        $match: { userId: { $gte: code } },
      },
        {
          $lookup: {
            from: "states", 
            localField: "_id",
            foreignField: "shipmentId",
            as: "states",
          },
        },
        {
            $project: {
                _id: 1,
                number: 1,
                product: 1,
                start_location: 1,
                end_location: 1,
                status: 1,
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