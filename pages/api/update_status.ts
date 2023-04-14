import dbConnect from "@/lib/mongodb";
import Shipment from "./models/Shipment";

export default async function handler(req, res){
    await dbConnect()
    const {
        _id,
        status, start_location, product
    } = req.body
    console.log(req.body)
    await Shipment.findOneAndUpdate({_id}, {
                  $set: {status, start_location, product}
              }, {
                  new: true,
                  runValidators: true,
                  upsert: true,
                  returnOriginal: false,
                  returnNewDocument: true
              }).exec()
    .then(ship=>{
        res.json({
            message: `the state of ${ship.product} has been updated to ${status}`
        })
    })
}