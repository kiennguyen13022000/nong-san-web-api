import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { authenticator } from 'otplib';
import { CustomerAuthDto } from "../dto/customer-auth.dto";
import { CustomerSecret, CustomerSecretDocument } from "../schemas/customer-secret.schema";
import { Customer, CustomerDocument } from "../schemas/customer.schema";
import { CustomerSecretService } from "./customer-secret.service";

const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_KEY,
  apiSecret: process.env.VONAGE_SECRET
})

@Injectable()
export class CustomerAuthService {
    constructor(
		@InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
		private customerSecretService: CustomerSecretService
	) {}

    async generateOtpCode(phone: number) {
        
        let customer =  await this.customerModel.exists({phone: phone});
        if (!customer) {
			customer = await this.customerModel.create({
				phone: phone
			});
        }
	
        const secret = authenticator.generateSecret();
        const token  = authenticator.generate(secret);

		await this.customerSecretService.create(customer._id, secret);


		// const from = "Vonage APIs"
		// const to = "84386325147"
		// const text = `Mã xác thực tài khoản của bạn là ${token}.`;

		// const opts = {
		// 	"type": "unicode"
		// }

		// vonage.message.sendSms(from, to, text, opts, (err, responseData) => {
		// 	if (err) {
		// 		console.log(err);
		// 	} else {
		// 		if(responseData.messages[0]['status'] === "0") {
		// 			console.log("Message sent successfully.");
		// 		} else {
		// 			console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
		// 		}
		// 	}
		// })

		return token;
    }

	async checkOtpCodeIsCorrect(customerAuthDto: CustomerAuthDto) {
		const customer = await this.customerModel.findOne({phone: customerAuthDto.phone}).exec();
		const customerSecret = await this.customerSecretService.findOne(customer._id);

		return authenticator.check(customerAuthDto.token, customerSecret.secret);
	}

	findCustomerByPhone(phone: string) {
		return this.customerModel.findOne({phone: phone}).exec();
	}
}