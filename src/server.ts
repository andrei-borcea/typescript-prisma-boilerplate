import 'reflect-metadata';
import DemoApp from './app';

let application = new DemoApp();

application.app.listen(4000,()=>{
    console.log(`Demo app listening on 4000`);
})