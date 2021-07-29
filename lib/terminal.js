import readline from 'readline'
import core from './core.js'

export default class terminal
{
    constructor()
    {
        this.rl = readline.createInterface(
        {
            input: process.stdin,
            output: process.stdout
        });
        this.rl.on('line', (input) => 
        {
            this.#command(input);
        });
        core.instance.io_manager.io.on('connection',(pSocket) =>
        {
            pSocket.on('terminal',(pParam) =>
            {
                this.#command(pParam);
                //core.instance.log.msg(pParam)
            })
        });
    }
    #command(pInput)
    {
        let TmpInput = pInput.split(' ')[0];
        
        if(TmpInput == "-try")
        {
            core.instance.sql.try()
        }
        else if(TmpInput == "-log")
        {
            if(pInput.split(' ').length > 1)
            {
                let TmpFileName = ""
                let TmpObj = {};

                if(pInput.split(' ')[1] != '')
                {
                    TmpFileName = pInput.split(' ')[1];
                }
                if(typeof pInput.split(' ')[2] != 'undefined' && pInput.split(' ')[2] != '')
                {
                    try
                    {
                        TmpObj = JSON.parse(pInput.split(' ')[2])                   
                    } catch(err) {}
                }
                core.instance.log.readLog(TmpFileName,TmpObj);
            }
            else
            {
                core.instance.log.readLog();
            }
        }
        else if(TmpInput == "-createDb")
        {
            if(pInput.split(' ').length > 1)
            {
                //createDb(PATH,DBNAME) 
                core.instance.sql.createDb(pInput.split(' ')[1],pInput.split(' ')[2]);
            }
        }
        else
        {
            core.instance.log.msg('Invalid command !',"Terminal");
        }
    }
}