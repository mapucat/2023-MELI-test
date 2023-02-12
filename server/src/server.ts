import express, { Express, Request, Response } from 'express';
import { getConfig } from './helpers/get-config/get-config';

const app: Express = express();
const port = getConfig('port');

app.get('/', (req: Request, res: Response)=>{
    res.send('Hello world');
});

app.listen(port, ()=> {
    console.log(`[Server]: I am running at https://localhost:${port}`);
});