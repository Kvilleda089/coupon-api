import { Request, Response } from 'express';
import { AppError, CouponDTO, CouponService } from '../../domain';


export class CouponController {
    private couponService = new CouponService();

    private handleError = (error: unknown, res: Response) => {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({error: error.message})
        }

        return res.status(500).json({error: 'Internal server Error'});
    }


    createCoupon = async (req: Request, res: Response) => {
        try {
            const couponDto: CouponDTO = req.body;
            const coupon = await this.couponService.generateCoupon(couponDto);
            res.status(201).json(coupon);
        } catch (error) {
            this.handleError(error, res);
        }
    };

    validateCoupon = async (req: Request, res: Response) => {
        try {
            const { code } = req.params;
            const validation = await this.couponService.validateCoupon(code);
            res.status(200).json(validation);
        } catch (error) {
            this.handleError(error, res);
        }
    };
}