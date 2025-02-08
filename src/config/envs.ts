import dotenv from  'dotenv';
import * as env from 'env-var';

dotenv.config();
export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    DB_URL: env.get('DB_URL').required().asString(),
    DB_HOST: env.get('DB_HOST').required().asString(),
    DB_PORT: env.get('DB_PORT').required().asPortNumber(),
    DB_NAME: env.get('DB_NAME').required().asString(),
    USER_DB: env.get('USER_DB').required().asString(),
    DB_PASSWORD: env.get('DB_PASSWORD').required().asString(),


}