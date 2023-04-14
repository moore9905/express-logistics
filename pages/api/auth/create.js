import OtpGenerator from 'otp-generator';
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/lib/mongodb';
import User from '../models/Users';
import Shipment from '../models/Shipment';
import State from '../models/State';
import MailJetInit from '@/lib/MailJetInitializer';
export default async function handler(req,
    res){
        await dbConnect()
        const personal_code = OtpGenerator.generate(8, { upperCaseAlphabets: true, specialChars: true, lowerCaseAlphabets: true, digits: true })
         const number = OtpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true })
        const {
            email,
    first_name,
    last_name,
    location,

        } = req.body
        const user = {
            personal_code,
            email,
    first_name,
    last_name,
    location,
        }
    const newUser = new User(user)
    await User.findOne({email: req.body.email})
    .then(async(user)=>{
        if(user){
            res.json({
                message: `User with the email: ${user.email} exists please select ${user.first_name} ${user.last_name} from existing clients`,
                user
            })
        }
        else{
            const Mailjet = require('node-mailjet');
const mailjet = await Mailjet.apiConnect(
    "e9eaffa461afb81ea8a27096359b6174",
    "659637bc07b24b92ddc0f54e7f3d11f2",
);
console.log(email, first_name, last_name, personal_code)
    await mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "tracking.logistic.team@gmail.com",
					"Name": "James Darwin"
				},
				"To": [
					{
						"Email": email,
						"Name": first_name + " " +last_name
					}
				],
				"TemplateID": 4388122,
				"TemplateLanguage": true,
				"Subject": "Tracking Personal Code",
				"Variables": {
      "username": first_name + " " +last_name,
      "code": personal_code,
      "link": "Tracking Link"
				  }
			}
		]
	})
	.then(async () => {
        console.log("Mail Sent successfully")
        await User.create(newUser)
        .then(async (user)=>{
            await Shipment.create(new Shipment({
                userId: user._id,
                number: `EV-${number}`,
                status: "Pending",
                product: req.body.product,
                start_location: req.body.start_location, 
                end_location: req.body.end_location, 
            }))
            .then(async ship=>{
                await State.create(new State({
                    shipmentId: ship._id,
                    index: 1,
                    state: "Package arrived at Local Facility",
                }))
                .then(state=> {
                    res.json({
                        message: "Item Added Successfully",
                        data: {
                            ...user,
                            ...ship,
                            ...state
                        }
                    })
                })
            })
        })
	})
	.catch(() => {
		console.log("failed")
		return false
	})
        }
    })
}