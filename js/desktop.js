// js/desktop.js
import { createWindow, updateTaskbar } from './windowManager.js';
import { initializeTerminal } from './apps/terminal.js';
import { initializeEmail } from './apps/email.js';
import { initializeReadme } from './apps/readme.js';
import { addNotification, toggleNotificationsPanel } from './utils/notifications.js';
import { playSound, waitForSoundsToLoad } from './utils/sound.js';
import { logout } from './login.js';

export const installedApps = ['Terminal', 'README_FIRST', 'Email'];
export const desktopIcons = [
    { name: 'Terminal', icon: '⌨️' },
    { name: 'Browser', icon: '🌐' },
    { name: 'Email', icon: '📧' },
    { name: 'Smite', icon: '💬' },
    { name: 'README_FIRST', icon: '📄' },
    { name: 'Resource Monitor', icon: '📊' },
];

export async function initializeDesktop() {
    console.log('Initializing desktop...');
    document.body.innerHTML = `
        <div id="desktop">
            <div id="desktop-icons"></div>
            <div id="windows-container"></div>
            <div id="taskbar">
                <div id="start-menu">Start</div>
                <div id="open-windows"></div>
                <div id="system-tray">
                    <div id="notifications-icon">🔔</div>
                    <div id="clock">00:00</div>
                </div>
            </div>
        </div>
        <div id="start-menu-popup" class="hidden">
            <div class="start-menu-item" id="logout-button">Log Out</div>
        </div>
        <div id="system-modal" class="modal hidden">
            <div class="modal-content">
                <h2>System Message</h2>
                <p id="modal-message"></p>
                <button id="modal-close">OK</button>
            </div>
        </div>
        <div id="notifications-panel" class="hidden">
            <h3>Notifications</h3>
            <div id="notifications-list"></div>
        </div>
    `;

    createDesktopIcons();
    updateClock();
    setInterval(updateClock, 1000);

    document.getElementById('start-menu').addEventListener('click', toggleStartMenu);
    document.getElementById('logout-button').addEventListener('click', logout);
    document.getElementById('notifications-icon').addEventListener('click', toggleNotificationsPanel);

    initializeModal();

    addNotification('Welcome to The Doomsday Machine');
    addNotification('New email received');

    try {
        await waitForSoundsToLoad();
        console.log('All sounds loaded successfully');
    } catch (error) {
        console.warn('Some sounds failed to load. Sound effects may not play correctly.', error);
    }

    console.log('Desktop initialization complete');
}

function toggleStartMenu() {
    const startMenuPopup = document.getElementById('start-menu-popup');
    startMenuPopup.classList.toggle('hidden');
}

export function openApplication(appName) {
    console.log(`Attempting to open application: ${appName}`);
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
        console.log(`Application ${appName} is not installed. Showing system modal.`);
        playSound('error');
        showSystemModal(`Application "${appName}" is not installed. You have to file a request with BOFH.`);
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
    console.log('Desktop icons created');
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeString;
}

export function showSystemModal(message) {
    console.log('Showing system modal with message:', message);
    const modal = document.getElementById('system-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

function initializeModal() {
    const modal = document.getElementById('system-modal');
    const modalCloseButton = document.getElementById('modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', () => {
            console.log('Closing system modal');
            modal.classList.add('hidden');
        });
    } else {
        console.error('Modal close button not found');
    }
    console.log('Modal initialized');
}