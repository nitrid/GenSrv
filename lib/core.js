//*******************************************************/
// Core - 02.03.2021 - Ali Kemal KARACA
//*******************************************************/
import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
import sqllib from './sqllib.js'
import jwt from 'jsonwebtoken'

let config = {};

export default class core
{
    static instance = null;
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
        this.sql = new sqllib(config);
        this.plugins = {};

        if(!core.instance)
        {
            core.instance = this;
        }

        import('./plugins/plugins.js').then(module =>
        {
            Object.keys(module).forEach(element => 
            {
                this.plugins[element] = new module[element];
            });
        })
    }
    listen(port)
    {
        let http = this.app.listen(port);
        this.io = new io(http,{cors: {origin: '*'}})
        this.io_manager = new io_manager(this.io,this.config)
    }
}
export class io_manager
{
    static instance = null;
    constructor(pIo,pConfig)
    {
        this.io = pIo;
        config = pConfig;
        this.io.on('connection',this.io_connection);
        
        if(!io_manager.instance)
        {
            io_manager.instance = this;
        }
    }

    io_connection(pSocket)
    {
        console.log('Client connected to the WebSocket');

        pSocket.on('disconnect', () => 
        {
            console.log('Client disconnected');
        });
        pSocket.on('sql',(pQuery,pCallback) =>
        {
            let sql = new sqllib(config);
            sql.execute(pQuery,pCallback);
        })
    }
}
export class authentication
{
    static instance = null;
    constructor()
    {
        if(!authentication.instance)
        {
            authentication.instance = this;
        }
    }
}