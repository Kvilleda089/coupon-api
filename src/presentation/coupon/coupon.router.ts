import express from 'express';
import { CouponController } from '../coupon/coupon.controller';

const couponRouter = express.Router();
const couponController = new CouponController();

couponRouter.post('/generate-coupons', couponController.createCoupon);
couponRouter.get('/coupons/:code', couponController.validateCoupon);

export default couponRouter;