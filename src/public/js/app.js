const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("muteBtn");
const cameraBtn = document.getElementById("cameraBtn");
const cameraSelect = document.getElementById("cameras");

let myStream;
let muted = false;
let cameraoff = false;


async function getCameras() {
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kine === "videioinput");
        const curruntCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
            const option = document.createElement("option");
            option.value = camera.deviceId;
            option.innerText = camera.label;
            if (currentCamera.label === camera.label) {
                option.selected = true;
              }
            cameraSelect.appendChild(option);
        })
    }catch (e) {
        console.log(e);
    }
}
async function getMedia(deviceId) {
    const initialConstrains = {
        audio : true,
        video : {facingMode: "user"},
    };
    const cameraConstraints = {
        audio:true,
        video:{deviceId: { exact: deviceId}},
    };
    try{
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
        );
        myFace.srcObject = myStream;
        if(!deviceId) {
            await getCameras();
        }
    } catch (e) {
        console.log(e);
    }
}
getMedia();

function handleMuteClick() {
    myStream.getAudioTracks().forEach((track)=> (
        track.enabled =!track.enabled));
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}
function handleCameraClick() {
    myStream.getVideoTracks().forEach((track)=> (
        track.enabled =!track.enabled));
    if(cameraoff) {
        cameraBtn.innerText = "Turn Camera off"
        cameraoff = false;
    }
    else {
        cameraBtn.innerText = "Turn Camera On"
        cameraoff = true
    }
}

async function handleCameraChange() {
    await getMedia(cameraSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
cameraSelect.addEventListener("input", handleCameraChange);
