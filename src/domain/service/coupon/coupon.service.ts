import { Database } from "../../../database/database";
import { Coupon, CouponDTO, AppError } from "../../";
import { validate } from 'class-validator';



export class CouponService {
    private couponRepository = Database.getInstance().getRepository(Coupon);

    async generateCoupon(couponDto: CouponDTO): Promise<Coupon> {
        try {
            console.log(couponDto)
            const errors = await validate(couponDto);
            if (errors.length > 0) {
                const errorMessages = errors.map(error =>
                    Object.values(error.constraints || {}).join(', ')
                ).join('; ');
                throw new AppError(400, `${errorMessages}`);
            }

            const coupon = this.couponRepository.create({
                code: couponDto.code,
                discountPercentage: couponDto.discountpercentage,
                expirationDate: new Date(couponDto.expirationDate),
                
            });

            return await this.couponRepository.save(coupon);
        } catch (error) {
            console.error('Error generating coupon:', error);
            handleAppError(error);
        }
    }

    async validateCoupon(code: string): Promise<{ valid: boolean; discountPercentage?: number }> {
        try {
            const coupon = await this.couponRepository.findOneBy({ code });
            
            if (!coupon) {
                throw new AppError(404, 'Coupon not found');
            }
    
            if (coupon.isActive === 'Inactivo') {
                return { valid: false };
            }
    
            if (new Date() > coupon.expirationDate) {
                return { valid: false };
            }
    
            return { valid: true, discountPercentage: coupon.discountPercentage };
        } catch (error) {
            console.error('Error validating coupon:', error);
            handleAppError(error);
        }
    }
}



function handleAppError(error:any): never{
    if (error instanceof AppError) {
        throw error;
    }
    throw new AppError(500, `Unexpected error: ${error}`); 
}