import express, { json, request, response, urlencoded } from "express";
import morgan from "morgan";
import cors from 'cors';
import helmet from 'helmet'
import { config } from "dotenv";
import { AppDataSource } from './data-source';

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: false }));




app.listen(process.env.PORT, async () => {
    console.log('listening to ');
    try {

        await AppDataSource.initialize();
        console.log('connect to database');

    } catch (error) {


        throw new Error('${(error as error).message}');

    }
});

