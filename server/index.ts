import { Express } from "express";
import express from "express"
import { configDotenv }from "dotenv"
import Router from "../routes";
import cors from "cors";
import { Request } from "express";
import { Response } from "express";

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
      
    }
    startServer():void{
        this.app.listen(this.PORT, () => {
            console.log("Listening on port " + this.PORT);
        });
    }
    routes():void{
        this.app.use("/api",Router)

    }
    
    
}

export default Server