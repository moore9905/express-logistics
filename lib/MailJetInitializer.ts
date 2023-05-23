import moment from "moment";

export default async function MailJetInit({form_data}: { form_data: any}){
	const Mailjet = require('node-mailjet');
const mailjet = Mailjet.apiConnect(
    "e9eaffa461afb81ea8a27096359b6174",
    "659637bc07b24b92ddc0f54e7f3d11f2",
);
    const request = await mailjet
	.post("send", {'version': 'v3.1'})
	.request({
		"Messages":[
			{
				"From": {
					"Email": "netmail279@gmail.com",
					"Name": "Tracking Personal Code"
				},
				"To": [
					{
						"Email": form_data.email,
						"Name": form_data.first_name + " " +form_data.last_name
					}
				],
				"TemplateID": 4388122,
				"TemplateLanguage": true,
				"Subject": "Tracking",
				"Variables": {
      "username": form_data.first_name + " " +form_data.last_name,
      "code": form_data.personal_code,
      "link": "Tracking Link"
				  }
			}
		]
	})
request
	.then(() => {
		return true
	})
	.catch(() => {
		return false
	})
}
