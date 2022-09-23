import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCartDto {

    @IsNotEmpty()
    @ApiProperty()
    customer: string;

    @IsNotEmpty()
    @ApiProperty()
    product: string;

    @ApiProperty({
        default: 1
    })
    orderQuantity: number;
}