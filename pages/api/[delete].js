import dbConnect from "@/lib/mongodb";
import Shipment from "./models/Shipment";
import User from "./models/Users";

export default async function handler(req, res){
    const _id = req.query.delete
    await dbConnect()
    await Shipment.findByIdAndDelete({_id: req.query.delete}).exec()
    .then(async ship=>{
        await User.findByIdAndDelete({_id: ship.userId}).exec()
        .then((user)=>{
            res.json({
                message: `${ship.product} and ${user.first_name} ${user.last_name}'s data has been deleted`
            })
        })
    })
}