const socket = new WebSocket( `ws://${window.location.host}`) //서버로의 연결
const ulMessage = document.querySelector("ul");
const formMessage = document.querySelector("#message"); 
const nickMessage = document.querySelector("#nickname");


function makeMessage(type, payload) {
    const msg = {type, payload}
    return JSON.stringify(msg);
}

socket.addEventListener("open", ()=> {
    console.log("Connected to server");
})
socket.addEventListener("message", (message) =>{
    const li = document.createElement("li");
    li.innerText = message.data;
    formMessage.append(li);
})

socket.addEventListener("close", ()=> {
    console.log("disconnected server");
})

function handleSubmit(event) {
    event.preventDefault();
    const input = formMessage.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    const li = document.createElement("li");
    li.innerText = `You : ${input.value}`;
    formMessage.append(li);
    input.value="";
}
function handleNick(event) {
    event.preventDefault();
    const input = nickMessage.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
}
formMessage.addEventListener("submit", handleSubmit);
nickMessage.addEventListener("submit", handleNick);