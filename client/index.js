import {io} from 'socket.io-client'


const socket = io('http://localhost:3000');
socket.on('connect',()=>{
    console.log(`you connected with id ${socket.id}`)
})

const recievedContent = document.getElementById('recieved');
const sendBtn = document.getElementById('send-btn');
const joinBtn = document.getElementById('join-btn');
sendBtn.addEventListener('click',()=>{
    const messageInput = document.getElementById('message');
    const roomInput = document.getElementById('room');
    if (messageInput.value){
        socket.emit('send-message',messageInput.value,roomInput.value);
        const newMessage = document.createElement('div');
        newMessage.style.cssText = `padding:0.25rem;`
        newMessage.textContent = `${socket.id} : ${messageInput.value}`;
        recievedContent.appendChild(newMessage);
    }
})

joinBtn.addEventListener('click',()=>{
    const roomInput = document.getElementById('room');
    socket.emit('join-room',roomInput.value);
})

socket.on('receive-message',(message)=>{
    displayMessage(message);
})

const displayMessage = (message)=>{
    const newMessage = document.createElement('div');
    newMessage.style.cssText = `padding:0.25rem;`
    newMessage.textContent = `${message}`;
    recievedContent.appendChild(newMessage);
}