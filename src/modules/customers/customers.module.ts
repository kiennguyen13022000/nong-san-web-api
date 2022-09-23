import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CustomerAuthController } from './controllers/customer-auth.controller';
import { CustomerSecret, CustomerSecretSchema } from './schemas/customer-secret.schema';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerAuthService } from './services/customer-auth.service';
import { CustomerSecretService } from './services/customer-secret.service';
import { CartsController } from './controllers/carts.controller';
import { CartsService } from './services/carts.service';
import { Cart, CartSchema } from './schemas/cart.schema';
 

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Customer.name, schema: CustomerSchema},
            { name: CustomerSecret.name, schema: CustomerSecretSchema},
            { name: Cart.name, schema: CartSchema}
        ]),
        AuthModule
    ],
    controllers: [
        CustomerAuthController, 
        CartsController
    ],
    providers: [
        CustomerAuthService, 
        CustomerSecretService, 
        CartsService
    ]
})
export class CustomersModule {}
