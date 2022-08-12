import * as dotenv from 'dotenv';
dotenv.config();

// configuration
export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';
export const SERVEPORT = process.env.PORT