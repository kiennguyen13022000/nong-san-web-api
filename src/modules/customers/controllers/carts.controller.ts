import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import ResponseData from 'src/helpers/response-data';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateCartDto } from '../dto/create-cart.dto';
import { CartsService } from '../services/carts.service';

@Controller('carts')
@ApiTags('[FE][Cart] Api liên quan đến giỏ hàng')
export class CartsController {
    constructor(private cartsService: CartsService) {}

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Lấy danh sách sản phẩm vào giỏ hàng',
        description: 'Lấy danh sách sản phẩm vào giỏ hàng',
        operationId: 'index'
    })
    @ApiParam({
        name: 'id',
        description: 'id của khách hàng'
    })
    @ApiOkResponse({description: 'Yêu cầu thành công'})
    @ApiBadRequestResponse({description: 'Yêu cầu thất bại'})
    async index(@Param('id') id: string) {
        const products = await this.cartsService.findWhere(
            [], 
            {customer: id}, 
            {
                path: 'product', 
                populate: ['thumbnail', 'status'],
                select: '_id name thumbnail weight price status quantitySold quantityInStock'
            }
        );

        const response = new ResponseData(
            true,
            {
                message: 'Lấy danh sách sản phẩm thành công',
                products: products
            },
            null,
        );

        return response;
    }

    @Post()
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Thêm sản phẩm vào giỏ hàng',
        description: 'Thêm 1 sản phẩm vào giỏ hàng',
        operationId: 'create'
    })
    @ApiOkResponse({description: 'Yêu cầu thành công'})
    @ApiBadRequestResponse({description: 'Yêu cầu thất bại'})
    async create(@Body() createCartDto: CreateCartDto) {
        const cartItem = await this.cartsService.create(createCartDto);

        const response = new ResponseData(
            true,
            {
                message: 'Thêm sản phẩm vào giỏ hàng thành công',
                cartItem: cartItem
            },
            null,
        );

        return response;
    }

    @Put(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Sửa số lượng sản phẩm vào giỏ hàng',
        description: 'Sửa số lượng sản phẩm vào giỏ hàng',
        operationId: 'update'
    })
    @ApiParam({
        name: 'id',
        description: 'id của sản phẩm trong giỏ hàng'
    })
    @ApiOkResponse({description: 'Yêu cầu thành công'})
    @ApiBadRequestResponse({description: 'Yêu cầu thất bại'})
    async update(@Param('id') id: string, @Body() createCartDto: CreateCartDto) {
        const cartItem = await this.cartsService.update(createCartDto, id);

        const response = new ResponseData(
            true,
            {
                message: 'Sửa giỏ hàng thành công',
                cartItem: cartItem
            },
            null,
        );

        return response;
    }

    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({
        summary: 'Xóa sản phẩm trong giỏ hàng',
        description: 'Xóa sản phẩm trong giỏ hàng',
        operationId: 'delete'
    })
    @ApiParam({
        name: 'id',
        description: 'id của sản phẩm trong giỏ hàng'
    })
    @ApiOkResponse({description: 'Yêu cầu thành công'})
    @ApiBadRequestResponse({description: 'Yêu cầu thất bại'})
    async delete(@Param('id') id: string) {
        await this.cartsService.delete(id);

        const response = new ResponseData(
            true,
            {
                message: 'Xóa thành sản phẩm trong giỏ hàng thành công',
            },
            null,
        );

        return response;
    }
}
