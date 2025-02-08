import { DataSource, EntityTarget, ObjectLiteral, Repository } from "typeorm";
import {envs} from '../config/envs';
import { Coupon } from "../domain";


export class Database {
    private static instance: Database;
    private dataSource: DataSource;

    private constructor(){
        this.dataSource = new DataSource({
            type: 'postgres',
            host: envs.DB_HOST,
            port: Number(envs.DB_PORT),
            username: envs.USER_DB,
            password: envs.DB_PASSWORD,
            database: envs.DB_NAME,
            entities: [Coupon],
            synchronize: false,
            logging: true
        })
    }

    public static getInstance(): Database {
        if (!Database.instance) {
          Database.instance = new Database();
        }
        return Database.instance;
      }
    
      public async initialize(): Promise<void> {
        try {
          await this.dataSource.initialize();
          console.log(`Connection database success...`);
        } catch (error) {
          console.error(`Error connection database: ${error}`);
          throw error;
        }
      }
    
      public getDataSource(): DataSource {
        return this.dataSource;
      }
    
      public getRepository<Entity extends ObjectLiteral>(entity: EntityTarget<Entity>): Repository<Entity> {
        return this.dataSource.getRepository(entity);
      }
}