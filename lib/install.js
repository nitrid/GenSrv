import fs from 'fs-extra'

if(!fs.existsSync('../../config.js'))
{
    fs.copy('./bin/config.js', '../../config.js', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../server.js'))
{
    fs.copy('./bin/server.js', '../../server.js', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../terminal.js'))
{
    fs.copy('./bin/terminal.js', '../../terminal.js', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../package.json'))
{
    fs.copy('./bin/package.json', '../../package.json', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../setup'))
{
    fs.copy('./bin/setup', '../../setup', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../www'))
{
    fs.mkdirSync('../../www');
}
if(!fs.existsSync('../../www/corelib'))
{
    fs.copy('./bin/www/corelib', '../../www/corelib', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
if(!fs.existsSync('../../www/admin'))
{
    fs.copy('./bin/www/admin', '../../www/admin', (err)=>
    {
        if(err != null)
            console.log(err)
    });
}
