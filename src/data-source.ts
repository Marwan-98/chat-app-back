import { config } from 'dotenv';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';



config();
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: +process.env.PGPORT!,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['migration/*.ts'],
  subscribers: []
});





    export default AppDataSource