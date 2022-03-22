import { NextFunction, Request, Response } from "express";
import { singleton } from "tsyringe";

@singleton()
export default class ClientService {
    constructor(){}

    renderAbout = async(_req:Request,res:Response,_next:NextFunction) => {
        return res.render('pages/about.html',{});
    };
    renderContact = async(_req:Request,res:Response,_next:NextFunction) => {
        return res.render('pages/contact.html',{});
    };
    renderHome = async(_req:Request,res:Response,_next:NextFunction) => {
        return res.render('pages/index.html',{});
    };
}