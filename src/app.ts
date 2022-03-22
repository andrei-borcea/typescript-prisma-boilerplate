import express from 'express';
import async from 'async';
import { configure } from 'nunjucks';
import path from 'path';
import { PrismaClient } from '@prisma/client'
import Config from './config/config';
import { container, Lifecycle } from 'tsyringe';
import ClientService from './services/client';
import ApiService from './services/api';
import ClientRouter from './routes/routers/client';
import ApiRouter from './routes/routers/api';
import MainRouter from './routes';

class DemoApp {

    public app:express.Application;

    constructor(){
        this.app = express();

        //setup config
        container.register<Config>('config',{useClass:Config},{lifecycle:Lifecycle.Singleton});

        //setup services
        container.register<ClientService>('clientService',{useClass:ClientService},{lifecycle:Lifecycle.Singleton});
        container.register<ApiService>('apiService',{useClass:ApiService},{lifecycle:Lifecycle.Singleton});


        //setup routers
        container.register<ClientRouter>('clientRouter',{useClass:ClientRouter},{lifecycle:Lifecycle.Singleton});
        container.register<ApiRouter>('apiRouter',{useClass:ApiRouter},{lifecycle:Lifecycle.Singleton});
        container.register<MainRouter>('mainRouter',{useClass:MainRouter},{lifecycle:Lifecycle.Singleton});

        this.boot()
    }

    boot():void {
        //usare this perchè dentro waterfall viene perso il riferimento alla classe
        let self = this;
        //let config = container.resolve<Config>('config');
        async.waterfall([
            function attachDatabase(callback:any){
                try{
                    let database = new PrismaClient({
                        datasources:{
                            db:{
                                url:'postgresql://user:password@localhost:5444/app_data?schema=public'//config.getConnectionString()
                            }
                        }
                    });
                    container.register<PrismaClient>('db',{useValue:database});
                    callback(null,true);
                }catch(err:any){
                    callback(err);
                }
            },
            function setupApp(dbConnected:boolean,callback:any){
                self.app.use(express.json());
                self.app.use(express.urlencoded({extended: true}));
                self.app.set("views", path.join(__dirname, "./client/views"));
                self.app.use(express.static(__dirname + "/public"));
                configure(path.join(__dirname, "./client/views"), {
                    autoescape: true,
                    express: self.app,
                    watch: true
                });
                self.app.use('/',container.resolve<ClientRouter>('clientRouter').getRouter());
                self.app.use('/api',container.resolve<MainRouter>('mainRouter').getRouter());
                callback(null,dbConnected);
            }
        ],function(error:any,_result:any){
            if(error){
                console.error(error.toString());
                process.exit(-1);
            }
            console.log(`App boostrap complete...`);
        });
    }
}

export default DemoApp;