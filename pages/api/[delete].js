import dbConnect from "@/lib/mongodb";
import Shipment from "./models/Shipment";
import User from "./models/Users";

export default async function handler(req, res){
    const _id = req.query.delete
    console.log(_id)
    await dbConnect()
    
    console.log(req.body)
    await Shipment.findByIdAndDelete({_id: req.query.delete}).exec()
    .then(async ship=>{
        res.json({
            message: `${ship.product} has been deleted`
        })
    })
}