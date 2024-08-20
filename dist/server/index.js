"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const routes_1 = __importDefault(require("../routes"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        (0, dotenv_1.configDotenv)();
        this.app = (0, express_1.default)();
        this.PORT = process.env.PORT || 3006;
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.routes();
        this.app.use((req, res, next) => {
            const error = new Error("Not Found");
            //error.status = 404;
            next(error);
        });
    }
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log("Listening on port " + this.PORT);
        });
    }
    routes() {
        this.app.use("/api", routes_1.default);
    }
}
exports.default = Server;
