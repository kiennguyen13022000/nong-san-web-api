import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CustomerAuthController } from './controllers/customer-auth.controller';
import { CustomerSecret, CustomerSecretSchema } from './schemas/customer-secret.schema';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerAuthService } from './services/customer-auth.service';
import { CustomerSecretService } from './services/customer-secret.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema},
            { name: CustomerSecret.name, schema: CustomerSecretSchema},
        ]),
        AuthModule
    ],
    controllers: [CustomerAuthController],
    providers: [CustomerAuthService, CustomerSecretService]
})
export class CustomersModule {}
