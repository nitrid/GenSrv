import core from '../core.js'

export default class print
{
    constructor()
    {
        console.log("core.instance")
        core.instance.io_manager.io.on('connection',(socket) =>
        {
            socket.on('print',(pQuery,pCallback) =>
            {
                pCallback('deneme')
                console.log(pQuery)
            })
        })
    }
}