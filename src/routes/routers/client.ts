import { Router } from "express";
import { inject, singleton } from "tsyringe";
import ClientService from "../../services/client";

@singleton()
export default class ClientRouter {
    constructor(
        @inject('clientService') private clientService:ClientService
    ){}

    getRouter():Router {
        let router = Router();
        router.get('/',this.clientService.renderHome);
        router.get('/about',this.clientService.renderAbout);
        router.get('/contact',this.clientService.renderContact);
        return router;
    }
}