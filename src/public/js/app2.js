const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");


function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input")
    socket.emit("enter_room", { payload : input.value }, () => {
        console.log("server is done!");
    }); //event 이름, 보내고싶은 payload, 서버에 보낼 fn
    input.value = ""
}

form.addEventListener("submit", handleRoomSubmit);


