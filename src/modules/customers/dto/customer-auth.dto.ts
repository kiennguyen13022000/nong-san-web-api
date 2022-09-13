import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CustomerAuthDto {
    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    token: string;
}