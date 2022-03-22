import { IAPPConfig } from "../interfaces/IAppConfig";


export default class Config {

    config:IAPPConfig;

    constructor(){
        this.config = {
            APP_PORT:process.env.APP_PORT || '3000',
            DB_SETTINGS:{
                HOST:process.env.DB_HOST || 'postgresql',
                USER:process.env.DB_USER || 'user',
                PASSWORD:process.env.DB_PASSWORD || 'password',
                DATABASE:process.env.DB || 'demo',
                PORT:process.env.DB_PORT || '5444'
            }
        };
    }

    getConnectionString():string {
        return `postgresql://${this.config.DB_SETTINGS.USER}:${this.config.DB_SETTINGS.PASSWORD}@${this.config.DB_SETTINGS.HOST}:${this.config.DB_SETTINGS.PORT}/${this.config.DB_SETTINGS.DATABASE}?schema=public`;
    }
}