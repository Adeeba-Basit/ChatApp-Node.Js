const socket = io("http://localhost:8000")

var name = prompt("Enter Your Name to Join the Chat :")
socket.emit("user-joined", name)

var firstDiv = document.querySelector(".first")

function generateMassege(message, side) {
    var p = document.createElement("p")
    if (side === "left") {
        p.classList.add("para")
        p.classList.add("card")
        p.classList.add("float-start")
    }
    else if (side === "right"){
        p.classList.add("para")
        p.classList.add("card")
        p.classList.add("float-end")
    }
    else
       p.classList.add("mid-para")
    
   p.innerHTML=message
   firstDiv.appendChild(p)
}

socket.on("new-user-joined",name=>{
    generateMassege(`${name} Joined the Chat`,"mid")
})

function sendmessage(){
    var message = document.getElementById("message").value
    document.getElementById("message").value = ""
    socket.emit("send",message)

    generateMassege(`${message} : You`,"right")
}

socket.on("recieve",data=>{
    generateMassege(`${data.message} : ${data.message}`,"left")
})

socket.on("user-left",name=>{
    generateMassege(`${name} Left the Chat`,"mid")
})