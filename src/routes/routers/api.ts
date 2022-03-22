import { Router } from "express";
import { singleton,inject } from "tsyringe";
import ApiService from "../../services/api";

@singleton()
export default class ApiRouter { 
    constructor(
        @inject('apiService') private apiService:ApiService
    ){}

    getRouter():Router{
        let router = Router();
        router.post('/create',this.apiService.createContactRequest);
        router.get('/:requesId',this.apiService.getContactRequest);
        router.delete('/:requestId',this.apiService.deleteContactRequest);
        router.get('/all',this.apiService.getAllContactRequests);
        return router;
    }
}