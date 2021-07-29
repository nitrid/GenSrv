import io from 'socket.io-client';
import readline from 'readline';

let socket = new io('http://localhost')

let rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => 
{
    socket.emit('terminal',input)
});
socket.on('terminal',(pData) =>
{
    console.log(pData)
})