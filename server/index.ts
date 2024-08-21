import { Express } from "express";
import express from "express"
import { configDotenv }from "dotenv"
import Router from "../routes";
import cors from "cors";
import { Request } from "express";
import { Response } from "express";
import cron from 'node-cron';
import axios from 'axios';
class Server{
    public app:Express
    private PORT
    constructor(){
        configDotenv()
        this.app=express()
        this.PORT=process.env.PORT || 3006
        this.app.use(cors())
        this.app.use(express.json())
        this.routes() 
        this.app.use((req:Request, res:Response, next) => {
            const error = new Error("Not Found");
            //error.status = 404;
            next(error);
          });
        this.startCronJob();
      
    }
    startServer():void{
        this.app.listen(this.PORT, () => {
            console.log("Listening on port " + this.PORT);
        });
    }
    routes():void{
        this.app.use("/api",Router)

    }

    private startCronJob(): void {
        const BASE_URL = "https://sistemaalquilermono.onrender.com/api/test"
        cron.schedule('*/5 * * * *', async () => {
            try {
                console.log('Manteniendo la aplicación despierta...');
                await axios.get(BASE_URL);
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error al intentar mantener la app despierta:', error.message);
                } else {
                    console.error('Error desconocido:', error);
                }
            }
            
        });
    }
    
    
}

export default Server