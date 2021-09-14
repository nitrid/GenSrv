import core from '../../index.js'
class test
{
    constructor()
    {
        this.io_connection = this.io_connection.bind(this)
        core.default.instance.io_manager.io.on('connection',this.io_connection)
        
    }
    async io_connection(pSocket)
    {
        console.log((await core.default.instance.plugins._licence))
        pSocket.on('test',async (pParam,pCallback) =>
        {
            console.log(pParam.method)
        });
    }
}

export const _test = new test()