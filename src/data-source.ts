import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: +process.env.PGPORT!,
  username: process.env.PGUSER,
  password: process.env.PGPASS,
  synchronize: true,
  entities: [],
  database: "postgres",
});

export default AppDataSource;
