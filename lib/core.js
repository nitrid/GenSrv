import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
import io_manager from './io_manager.js'

export default class core
{
    #root_path = path.resolve(path.dirname(''));
    app = express();

    constructor(config)
    {       
        //MADE FOR TESTING ***********/
        if(typeof config.test != 'undefined' && config.test)
        {
            this.#root_path += '../../bin'
        }
        //************************* */
        this.app.use('/',express.static(path.join(this.#root_path, "/www")));
        this.config = config;          
    }

    listen(port)
    {
        let http = this.app.listen(port);
        this.io = new io(http,{cors: {origin: '*'}})
        this.io_manager = new io_manager(this.io,this.config)
    }
}
