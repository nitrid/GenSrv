import express from 'express'
import path from 'path'
import {Server as io} from 'socket.io'
import sqllib from './sqllib.js'
import jwt from 'jsonwebtoken'

let config = {};
let instance = null;

export default class core
{
    #root_path = path.resolve(path.dirname(''));
    app = express();
    static instance = null;

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
        this.io_manager = null;

        if(!instance)
        {
            instance = this;
        }
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
    constructor(pIo,pConfig)
    {
        this.io = pIo;
        config = pConfig;
        this.io.on('connection',this.io_connection);
        core.prototype.mahir = "asdasjkdaksdsadnksajdnajskndjkasdnkjasndkajsndjkas";
        let m = new core(pConfig)
        console.log(m)
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
    constructor()
    {

    }
}