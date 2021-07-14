import io from 'socket.io-client';
let x = new io('http://localhost')
x.emit('sql',
{
    query : 'SELECT DB_kod AS FIRM FROM VERI_TABANLARI'
},(data)=>
{
    console.log(data);
})