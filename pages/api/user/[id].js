import dbConnect from "@/lib/mongodb"
import Shipment from "../models/Shipment"
import mongoose from "mongoose"
import User from "../models/Users"
import State from "../models/State"

export default async function handler(req, res){
    const {id} = req.query
    const code = new mongoose.Types.ObjectId(id)
    await dbConnect()
    await User.findOne({_id: id})
    .then(user=>{
      Shipment.findOne({userId:user._id}).then(ship=>{
        State.find({shipmentId: ship._id}).then(states=>{
          res.json({
            data: {
                _id: ship._id,
                number: ship.number,
                product: ship.product,
                start_location: ship.start_location,
                end_location: ship.end_location,
                sender: ship.sender,
                status: ship.status,
                states
            }
          })
        })
      })
    })
}