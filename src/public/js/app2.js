const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function backendDone(msg) {
    console.log(`The backend says :`, msg );
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input")
    socket.emit("enter_room", input.value, backendDone);
    //1 =이벤트 네임, 중간 =보낼메세지, 마지막 =콜백함수
    input.value = ""
}
form.addEventListener("submit", handleRoomSubmit);