import express, { Application } from 'express';
import cors from 'cors';
import { Database } from '../database/database';
import { envs } from '../config/envs';
import couponRouter from './coupon/coupon.router';

export class Server {
    private app: Application;
    private port: number;
    private database: Database

    constructor() {
        this.app = express();
        this.port = envs.PORT || 3000; 
        this.database = Database.getInstance(); 
        this.config();
        this.routes();
    }

    public async connectionDatabase(): Promise<void> {
        try {
            await this.database.initialize();
            console.log('Database connected successfully');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw new Error('Exiting application due to database connection error');
        }
    }

    private config(): void{
        this.app.use(express.json());
        this.app.use(cors({
            origin: '*', 
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'], 
        }));
    }

    private routes(): void{
        this.app.use('/coupun-api', couponRouter)
    }

    
    public async start(): Promise<void> {
        await this.connectionDatabase();
        this.app.listen(this.port, () => {
            console.log(`Server listening on http://localhost:${this.port}`);
        });
    }
}