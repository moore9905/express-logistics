import dbConnect from "@/lib/mongodb";
import Shipment from "./models/Shipment";
import State from "./models/State";

export default async function handler(req, res){
    await dbConnect()
    const {
        _id,
        status, start_location, product
    } = req.body
    await Shipment.findOneAndUpdate({_id}, {
                  $set: {status, start_location, product}
              }, {
                  new: true,
                  runValidators: true,
                  upsert: true,
                  returnOriginal: false,
                  returnNewDocument: true
              }).exec()
    .then(async ship=>{
        if(req.body.status==="Delivered"){
            await State.find({shipmentId: _id})
            .then(async sttship=>{

                await State.create(new State({
                shipmentId: _id,
                state: req.body.status,
                index: sttship.length + 1
              }))
            })
    .then(stt=>{
        res.json({
            message: `the state of ${ship.product} has been updated to ${status}`,
            // data: stt
        })
    })
        }
        else if(req.body.status==="Cancelled"){
            await State.find({shipmentId: _id})
            .then(async sttship=>{

                await State.create(new State({
                shipmentId: _id,
                state: req.body.status,
                index: sttship.length + 1
              }))
            })
    .then(stt=>{
        res.json({
            message: `the state of ${ship.product} has been updated to ${status}`,
            // data: stt
        })
    })
        }
        else{
            res.json({
                message: `the state of ${ship.product} has been updated to ${status}`
            })
        }
    })
}