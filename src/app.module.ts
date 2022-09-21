import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { BannersModule } from './modules/banners/banners.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { BaseModule } from './modules/base/base.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local', 'env.dev.local'],
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AdminModule,
    ProductsModule,
    AuthModule,
    BaseModule,
    CustomersModule,
    BannersModule,
  ],
})
export class AppModule {}
