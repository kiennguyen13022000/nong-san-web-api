import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from 'src/modules/base/services/base.service';
import { CreateCartDto } from '../dto/create-cart.dto';
import { Cart, CartDocument } from '../schemas/cart.schema';

@Injectable()
export class CartsService extends BaseService{
    constructor(
        @InjectModel(Cart.name) private cartModel: Model<CartDocument>
    ){
        super();
        this.setModel(cartModel)
    }
}
