const socket = io()
let name;
const form=document.getElementById('send-containerr')
const message=document.getElementById('messageInp')
const messageContainer= document.querySelector(".container")
var audio = new Audio('/tingg.mp3');

const append = (message, position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    audio.play();
}

form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const message = messageInp.value;
    append(`You:${message}`, 'right');
    socket.emit('send' , message);
    messageInp.value='';
})
name = window.prompt('Enter your name: ');
socket.emit('new-user-joined', name);

socket.on('user-joined' , name=>{
append(`${name} joined the chat` , 'right')
})
socket.on('receive' , data=>{
    append(`${data.name}: ${data.message}` , 'left')
    })
socket.on('left' , name=>{
        append(`${name} left the chat` , 'left')
        })   