const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;
let roomName;

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handlMessageSubmit(event) {
    event.preventDefault();
    const input  = room.querySelector("input");
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You : ${value}`);
    });
    input.value = "";
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText =`Room ${roomName}`;
    const form = room.querySelector("form");
    form.addEventListener("submit", handlMessageSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input")
    socket.emit("enter_room", input.value, showRoom);
    //1 =이벤트 네임, 중간 =보낼메세지, 마지막 =콜백함수
    roomName = input.value;
    input.value = ""
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("someone joined!");
});

socket.on("bye", () => {
    addMessage("someone left !");
});

socket.on("new_message", addMessage);