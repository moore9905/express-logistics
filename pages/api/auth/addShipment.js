import OtpGenerator from 'otp-generator';
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/lib/mongodb';
import User from '../models/Users';
import Shipment from '../models/Shipment';
import State from '../models/State';
export default async function handler(req,
    res){
        await dbConnect()
        if(!req.body.userId) res.json({
            message: "please select an existing client",
            data: req.body
        })
        const number = OtpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true })
        const shipment = {
            ...req.body,
            status: "Delivering",
            number: `EV-${number}`
        }
        
    const newShipment = new Shipment(shipment)
    req.body.userId && await Shipment.create(newShipment)
    .then(ship=>{
                     State.create(new State({
                        shipmentId: ship._id,
                        index: 1,
                        state: "Package arrived at Local Facility",
                    }))
                    .then( state=> {
                         User.findOne({_id: req.body.userId})
                        .then(user=>{
                            res.json({
                                message: `${req.body.product} Added Successfully`,
                                data: {
                                    ...user,
                                    ...ship,
                                    ...state
                                }
                            })
                        })
                    })
                    })
}