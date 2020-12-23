import fs from 'fs-extra'

fs.copy('./bin/config.js', '../../config.js', (err)=>
{
    if(typeof err != 'undefined')
        console.log(err)
});
fs.copy('./bin/server.js', '../../server.js', (err)=>
{
    if(typeof err != 'undefined')
        console.log(err)
});
fs.copy('./bin/package.json', '../../package.json', (err)=>
{
    if(typeof err != 'undefined')
        console.log(err)
});
fs.copy('./bin/setup', '../../setup', (err)=>
{
    if(typeof err != 'undefined')
        console.log(err)
});