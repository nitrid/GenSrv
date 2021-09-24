import server from 'gensrv'
import config from './config.js'
import fs from 'fs'
import path from 'path'

let gensrv = new server.default(config);
gensrv.listen(80);
//PLUGIN YAPISI ******************************/
fs.readdirSync('./plugins').forEach(async file => 
{
    if(path.extname(file).toLowerCase() == '.js')
    {
        import('./plugins/' + file).then(module =>
        {
            Object.keys(module).forEach(element => 
            {
                gensrv.plugins[element] = module[element];
            });
        })
    }
});
//*******************************************/