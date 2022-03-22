import { Router } from "express";
import { inject, singleton } from "tsyringe";
import ApiRouter from "./routers/api";


@singleton()
export default class MainRouter {
    constructor(
        @inject('apiRouter') private apiRouter:ApiRouter
    ){}

    getRouter():Router {
        let router = Router();
        router.use('/',this.apiRouter.getRouter());
        return router;
    }
}