const socket = io();

const clientTotal = document.getElementById("client-total")

const messageCotainer = document.getElementById('message-container')
// const userName = document.getElementById('userName')
const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const userInfo = document.getElementById('users-info')
const messageInput = document.getElementById('message-input')

const messageTune = new Audio('notification.mp3')

function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;
    socket.emit('sendMessage', message);
    messageInput.value = '';
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('clients-total', (data) => {

    clientTotal.innerHTML = `Total Clients : ${data}`

})

socket.on('users-info', (data) => {
    userInfo.innerHTML = ` user-connected : ${data}`

})

function sendMessage() {
    if (messageInput.value == "") return

    const data = {
        name: nameInput.value,
        message: messageInput.value,
        dateTime: new Date(),

    }

    socket.emit('message', data)
    addMessagetoUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) => {
    addMessagetoUI(false, data)
    messageTune.play()
    console.log(data)
})

function addMessagetoUI(isOwnMessage, data) {
    clearFeedBack()
    const element = `<li class="${isOwnMessage ? "message-right" : "message-left"}">

                        <p class="message">
                        ${data.message} 
                        <span>${data.name} ${moment(data.dateTime).fromNow()}</span>
                        </p>
                    </li>`

    messageCotainer.innerHTML += element
    scrollToBottom()
}

function scrollToBottom() {
    messageCotainer.scrollTo(0, messageCotainer.scrollHeight)
}

messageInput.addEventListener('focus', (e) => {
    socket.emit('feedback', {
        feedback: `✍ ${nameInput.value} is typing a message`,
    })
})

messageInput.addEventListener('keypress', (e) => {

    socket.emit('feedback', {
        feedback: `✍ ${nameInput.value} is typing a message`,
    })

})

messageInput.addEventListener('blur', (e) => {
    socket.emit('feedback', {
        feedback: " ",
    })
})

socket.on('feedback', (data) => {

    clearFeedBack()
    const element = `

      <li class="message-feedback">
                        <p class="feedback" id="feedback">
                            ${data.feedback}
                        </p>
                    </li>`

    messageCotainer.innerHTML += element
})

function clearFeedBack() {
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element)
    });
}
