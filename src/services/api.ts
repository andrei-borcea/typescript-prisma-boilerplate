import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { container, singleton } from "tsyringe";


@singleton()
export default class ApiService {
    constructor(){}

    createContactRequest = async(req:Request,res:Response,_next:NextFunction) => {
        try{
            let db = container.resolve<PrismaClient>('db');
            let contactRequest = await db.contactRequest.create({
                data:req.body
            });
            return res.status(200).json({
                error:false,
                data:contactRequest,
                msg:''
            })
        }catch(err:any){
            console.error(err.toString());
            return res.status(422).json({
                error:true,
                data:null,
                msg:err.toString()
            })
        }
    }

    getContactRequest = async(req:Request,res:Response,_next:NextFunction) => {
        try{
            let db = container.resolve<PrismaClient>('db');
            let contactRequest = await db.contactRequest.findUnique({
                where:{
                    id:parseInt(req.params.requestId)
                }
            })
            return res.status(200).json({
                error:false,
                data:contactRequest,
                msg:''
            })
        }catch(err:any){
            console.error(err.toString());
            return res.status(422).json({
                error:true,
                data:null,
                msg:err.toString()
            })
        }
    }

    deleteContactRequest = async(req:Request,res:Response,_next:NextFunction) => {
        try{
            let db = container.resolve<PrismaClient>('db');
            let contactRequest = await db.contactRequest.delete({
                where:{
                    id:parseInt(req.params.requesId)
                }
            })
            return res.status(200).json({
                error:false,
                data:contactRequest,
                msg:''
            })
        }catch(err:any){
            console.error(err.toString());
            return res.status(422).json({
                error:true,
                data:null,
                msg:err.toString()
            })
        }
    }

    getAllContactRequests = async(_req:Request,res:Response,_next:NextFunction) => {
        try{
            let db = container.resolve<PrismaClient>('db');
            let contactRequest = await db.contactRequest.findMany();
            return res.status(200).json({
                error:false,
                data:contactRequest,
                msg:''
            })
        }catch(err:any){
            console.error(err.toString());
            return res.status(422).json({
                error:true,
                data:null,
                msg:err.toString()
            })
        }
    }
}