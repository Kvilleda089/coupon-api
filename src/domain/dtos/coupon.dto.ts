import { IsString, IsInt, IsDateString, IsBoolean } from 'class-validator';


export class CouponDTO {
    @IsString()
    code!: string;

    @IsInt()
    discountpercentage!: number;

    @IsDateString()
    expirationDate!: Date;
}