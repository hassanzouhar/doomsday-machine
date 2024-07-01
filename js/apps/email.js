// apps/email.js
let emails = [
    {
        id: 1,
        from: "system@doomsdaymachine.com",
        to: "quantumburger@doomsdaymachine.com",
        subject: "Welcome to Doomsday Machine",
        date: "2023-06-01T09:00:00",
        body: "Welcome to the Doomsday Machine project. Your task is to develop an AI that will change the world. Use caution and wisdom in your endeavors.",
        read: false
    },
    // ... other email objects ...
];

function getEmails() {
    return emails;
}

function getEmail(id) {
    return emails.find(email => email.id === id);
}

function markEmailAsRead(id) {
    const email = getEmail(id);
    if (email) {
        email.read = true;
    }
}

function sendEmail(to, subject, body) {
    const newEmail = {
        id: emails.length + 1,
        from: "quantumburger@doomsdaymachine.com",
        to: to,
        subject: subject,
        date: new Date().toISOString(),
        body: body,
        read: true
    };
    emails.unshift(newEmail);
    return newEmail;
}

export function initializeEmail(contentElement) {
 contentElement.innerHTML = `
        <div class="email-app">
            <div class="email-sidebar">
                <button id="compose-email">Compose</button>
                <div class="email-list"></div>
            </div>
            <div class="email-content"></div>
        </div>
    `;

    const emailList = contentElement.querySelector('.email-list');
    const emailContent = contentElement.querySelector('.email-content');
    const composeButton = contentElement.querySelector('#compose-email');

    function renderEmailList() {
        emailList.innerHTML = '';
        getEmails().forEach(email => {
            const emailElement = document.createElement('div');
            emailElement.className = `email-item ${email.read ? 'read' : 'unread'}`;
            emailElement.innerHTML = `
                <div class="email-subject">${email.subject}</div>
                <div class="email-from">${email.from}</div>
                <div class="email-date">${new Date(email.date).toLocaleString()}</div>
            `;
            emailElement.addEventListener('click', () => displayEmail(email.id));
            emailList.appendChild(emailElement);
        });
    }

    function displayEmail(id) {
        const email = getEmail(id);
        if (email) {
            markEmailAsRead(id);
            emailContent.innerHTML = `
                <h2>${email.subject}</h2>
                <p><strong>From:</strong> ${email.from}</p>
                <p><strong>To:</strong> ${email.to}</p>
                <p><strong>Date:</strong> ${new Date(email.date).toLocaleString()}</p>
                <div class="email-body">${email.body}</div>
                <button class="reply-button">Reply</button>
            `;
            const replyButton = emailContent.querySelector('.reply-button');
            replyButton.addEventListener('click', () => composeEmail(email.from, `Re: ${email.subject}`));
            renderEmailList();
        }
    }

    function composeEmail(to = '', subject = '') {
        emailContent.innerHTML = `
            <h2>Compose Email</h2>
            <input type="text" id="email-to" placeholder="To" value="${to}">
            <input type="text" id="email-subject" placeholder="Subject" value="${subject}">
            <textarea id="email-body" placeholder="Message"></textarea>
            <button id="send-email">Send</button>
        `;
        const sendButton = emailContent.querySelector('#send-email');
        sendButton.addEventListener('click', () => {
            const newTo = emailContent.querySelector('#email-to').value;
            const newSubject = emailContent.querySelector('#email-subject').value;
            const newBody = emailContent.querySelector('#email-body').value;
            sendEmail(newTo, newSubject, newBody);
            renderEmailList();
            emailContent.innerHTML = '<p>Email sent!</p>';
        });
    }

    composeButton.addEventListener('click', () => composeEmail());

    renderEmailList();
}
