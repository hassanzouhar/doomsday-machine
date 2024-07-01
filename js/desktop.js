// desktop.js
import { createWindow, updateTaskbar } from './windowManager.js';
import { initializeTerminal } from './apps/terminal.js';
import { initializeEmail } from './apps/email.js';
import { initializeReadme } from './apps/readme.js';
import { addNotification, toggleNotificationsPanel } from './utils/notifications.js';

export const installedApps = ['Terminal', 'README_FIRST', 'Email'];
export const desktopIcons = [
    { name: 'Terminal', icon: '⌨️' },
    { name: 'Browser', icon: '🌐' },
    { name: 'Email', icon: '📧' },
    { name: 'Smite', icon: '💬' },
    { name: 'README_FIRST', icon: '📄' },
    { name: 'Resource Monitor', icon: '📊' },
];

export function initializeDesktop() {
    createDesktopIcons();
    updateClock();
    setInterval(updateClock, 1000);

    document.getElementById('start-menu').addEventListener('click', () => {
        console.log('Start menu clicked');
        // Implement start menu functionality here
    });

    document.getElementById('notifications-icon').addEventListener('click', toggleNotificationsPanel);

    initializeModal();

    addNotification('Welcome to The Doomsday Machine');
    addNotification('New email received');
}

export function openApplication(appName) {
    if (installedApps.includes(appName)) {
        const window = createWindow(appName);
        const contentElement = window.querySelector('.window-content');
        
        switch(appName) {
            case 'Terminal':
                initializeTerminal(contentElement);
                break;
            case 'README_FIRST':
                initializeReadme(contentElement);
                break;
            case 'Email':
                initializeEmail(contentElement);
                break;
            default:
                contentElement.innerHTML = `<p>${appName} application content goes here.</p>`;
        }
        
        updateTaskbar();
    } else {
        showSystemModal("Application not installed. You have to file a request with BOFH.");
    }
}

function createDesktopIcons() {
    const desktopIconsContainer = document.getElementById('desktop-icons');
    desktopIcons.forEach(icon => {
        const iconElement = document.createElement('div');
        iconElement.className = 'desktop-icon';
        iconElement.innerHTML = `
            <div class="icon-image">${icon.icon}</div>
            <span>${icon.name}</span>
        `;
        iconElement.addEventListener('click', () => openApplication(icon.name));
        desktopIconsContainer.appendChild(iconElement);
    });
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeString;
}

function showSystemModal(message) {
    const modal = document.getElementById('system-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

function initializeModal() {
    const modalCloseButton = document.getElementById('modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            document.getElementById('system-modal').classList.add('hidden');
        });
    } else {
        console.error('Modal close button not found');
    }
}