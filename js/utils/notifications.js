// utils/notifications.js
let notifications = [];

export function addNotification(message) {
    notifications.push({ message, timestamp: new Date() });
    updateNotificationsPanel();
}

export function toggleNotificationsPanel() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('hidden');
    updateNotificationsPanel();
}

function updateNotificationsPanel() {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '';
    notifications.forEach(notification => {
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.textContent = `${notification.timestamp.toLocaleTimeString()}: ${notification.message}`;
        notificationsList.appendChild(notificationElement);
    });
}
