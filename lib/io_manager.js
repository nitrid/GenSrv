import sqllib from './sqllib.js'

let config = {};
export default class io_manager
{
    constructor(pIo,pConfig)
    {
        this.io = pIo;
        config = pConfig;
        this.io.on('connection',this.io_connection);
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