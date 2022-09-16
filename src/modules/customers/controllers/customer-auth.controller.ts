import { Body, Controller, HttpCode, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import ResponseData from 'src/helpers/response-data';
import { AuthService } from 'src/modules/auth/auth.service';
import { CustomerAuthDto } from '../dto/customer-auth.dto';
import { CustomerAuthService } from '../services/customer-auth.service';

@ApiTags('[FE][Auth] Api liên đến xác thực khách hàng')
@Controller('customer-auth')
export class CustomerAuthController {

    constructor(
        private customerAuthService: CustomerAuthService,
        private authService: AuthService,
    ) {}

    @Post('generate-otp-code/:phone')
    @ApiParam({
        name: 'phone',
        description: 'Số điện thoại'
    })
    @ApiOperation({
        summary: 'Tạo mã xác thực Otp',
        description: 'Tạo mã xác thực Otp',
        operationId: 'generateOtpCode'
    })
    @ApiCreatedResponse({description: 'Tạo mã otp thành công'})
    @ApiBadRequestResponse({description: 'Yêu cầu không hợp lệ'})
    async generateOtpCode(@Param('phone') phone: number) {
        const token = await this.customerAuthService.generateOtpCode(phone);
        const response = new ResponseData(
            true,
            {
                message: 'Tạo mã otp thành công',
                token: token
            },
            null,
        );
  
        return response;
    }

    @Post('check-otp-code')
    @ApiOperation({
        summary: 'Xác minh mã Otp',
        description: 'Xác minh mã Otp nếu đúng thì cho đăng nhập',
        operationId: 'checkOtpCodeIsCorrect'
    })
    @ApiBody({ type: CustomerAuthDto })
    @ApiOkResponse({description: 'Đăng nhập thành công'})
    @ApiUnauthorizedResponse({description: 'Xác thực chưa chính xác'})
    async checkOtpCodeIsCorrect(@Res() res: Response, @Body() customerAuthDto: CustomerAuthDto) {
        const isValid = await this.customerAuthService.checkOtpCodeIsCorrect(customerAuthDto);
        let response = null;

        if (isValid) {
            const token     = await this.authService.loginCustomer({phone: customerAuthDto.phone});
            const customer  = await this.customerAuthService.findOneWhere([], {phone: customerAuthDto.phone});
            response = new ResponseData(
                true,
                {
                    message: 'Kiểm tra mã otp thành công',
                    token: token,
                    customer: customer
                },
                null,
            );

            res.status(HttpStatus.OK).json(response);
        } else {

            response = new ResponseData(
                true,
                {
                    message: 'Mã otp không hợp lệ!!',
                    result: isValid
                },
                null,
            );
            
            res.status(HttpStatus.UNAUTHORIZED).json(response);
        }
         
    }
}
