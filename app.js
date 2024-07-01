// app.js


// Desktop icons data
const installedApps = ['Terminal', 'README_FIRST'];
const desktopIcons = [
    { name: 'Terminal', icon: '⌨️' },
    { name: 'Browser', icon: '🌐' },
    { name: 'Email', icon: '📧' },
    { name: 'Smite', icon: '💬' },
    { name: 'README_FIRST', icon: '📄' },
    { name: 'Resource Monitor', icon: '📊' },
];
let windows = [];
let notifications = [];
let currentUser = 'QuantumBurger';
let currentDirectory = '~';

// Function to create desktop icons
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

// Function to open an application
function openApplication(appName) {
    if (installedApps.includes(appName)) {
        const window = createWindow(appName);
        if (appName === 'Terminal') {
            initializeTerminal(window.querySelector('.window-content'));
        } else if (appName === 'README_FIRST') {
            initializeReadme(window.querySelector('.window-content'));
        } else {
            // Placeholder for other installed applications
            window.querySelector('.window-content').innerHTML = `<p>${appName} application content goes here.</p>`;
        }
        windows.push(window);
        updateTaskbar();
    } else {
        showSystemModal("Application not installed. You have to file a request with BOFH.");
    }
}

// Function to create a new window
function createWindow(title) {
    const windowElement = document.createElement('div');
    windowElement.className = 'window';

    // Set size and position for terminal windows
    if (title === 'Terminal') {
        const windowWidth = Math.floor(window.innerWidth * 0.6); // 60% of viewport width
        const windowHeight = Math.floor(window.innerHeight * 0.4); // 40% of viewport height
        const leftPosition = Math.floor((window.innerWidth - windowWidth) / 2);
        const topPosition = Math.floor((window.innerHeight - windowHeight) / 2);

        windowElement.style.width = `${windowWidth}px`;
        windowElement.style.height = `${windowHeight}px`;
        windowElement.style.left = `${leftPosition}px`;
        windowElement.style.top = `${topPosition}px`;
    } else {
        // Default positioning for other windows
        windowElement.style.left = `${windows.length * 30 + 50}px`;
        windowElement.style.top = `${windows.length * 30 + 50}px`;
    }
    
    windowElement.innerHTML = `
        <div class="window-header">
            <span>${title}</span>
            <button class="close-btn">×</button>
        </div>
        <div class="window-content"></div>
    `;
    
    const closeBtn = windowElement.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => closeWindow(windowElement));
    
    makeWindowDraggable(windowElement);
    
    document.getElementById('windows-container').appendChild(windowElement);
    
    return windowElement;
}

// Function to close a window
function closeWindow(windowElement) {
    windowElement.remove();
    windows = windows.filter(w => w !== windowElement);
    updateTaskbar();
}

// Function to make a window draggable
function makeWindowDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let dragOffsetX, dragOffsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragOffsetX = e.clientX - windowElement.offsetLeft;
        dragOffsetY = e.clientY - windowElement.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - dragOffsetX}px`;
            windowElement.style.top = `${e.clientY - dragOffsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Function to update the taskbar
function updateTaskbar() {
    const openWindowsElement = document.getElementById('open-windows');
    openWindowsElement.innerHTML = '';
    windows.forEach(window => {
        const windowButton = document.createElement('div');
        windowButton.textContent = window.querySelector('.window-header span').textContent;
        windowButton.addEventListener('click', () => {
            window.style.zIndex = getTopZIndex() + 1;
        });
        openWindowsElement.appendChild(windowButton);
    });
}

// Function to get the top z-index
function getTopZIndex() {
    return Math.max(0, ...windows.map(w => parseInt(w.style.zIndex) || 0));
}

// Function to initialize the terminal
function initializeTerminal(terminalElement) {
    let commandHistory = [];
    let historyIndex = 0;

    const outputElement = document.createElement('div');
    outputElement.className = 'terminal-output';
    const inputContainer = document.createElement('div');
    inputContainer.className = 'terminal-input-container';
    const promptElement = document.createElement('span');
    promptElement.className = 'terminal-prompt';
    const inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.className = 'terminal-input';

    inputContainer.appendChild(promptElement);
    inputContainer.appendChild(inputElement);
    terminalElement.appendChild(outputElement);
    terminalElement.appendChild(inputContainer);

    updatePrompt(promptElement);

    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputElement.value.trim();
            commandHistory.push(command);
            historyIndex = commandHistory.length;
            processCommand(command, outputElement, promptElement);
            inputElement.value = '';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                inputElement.value = commandHistory[historyIndex];
            }
            e.preventDefault();
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                inputElement.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                inputElement.value = '';
            }
            e.preventDefault();
        }
    });

    // Display welcome message
    outputElement.innerHTML = `<div class="terminal-welcome">Welcome to DoomOS v1.0.0</div>`;
    outputElement.innerHTML += `<div class="terminal-welcome">Type 'help' for available commands.</div>`;

    inputElement.focus();
}

function updatePrompt(promptElement) {
    promptElement.innerHTML = `<span class="terminal-user">${currentUser}</span>:<span class="terminal-directory">${currentDirectory}</span>$&nbsp;`;
}

function processCommand(command, outputElement, promptElement) {
    outputElement.innerHTML += `<div class="terminal-command">${promptElement.innerHTML}${command}</div>`;
    let output = '';
    switch (command.toLowerCase()) {
        case 'help':
            output = `Available commands:
                      help - Display this help message
                      clear - Clear the terminal
                      date - Display current date and time
                      whoami - Display current user information
                      ls - List directory contents
                      cd [directory] - Change directory`;
            break;
        case 'clear':
            outputElement.innerHTML = '';
            return;
        case 'date':
            output = new Date().toString();
            break;
        case 'whoami':
            output = `Current user: ${currentUser}\nAccess level: Administrator`;
            break;
        case 'ls':
            output = 'Documents  Downloads  Pictures  Music  Videos';
            break;
        default:
            if (command.toLowerCase().startsWith('cd ')) {
                const newDir = command.split(' ')[1];
                currentDirectory = newDir === '~' ? '~' : `${currentDirectory}/${newDir}`;
                updatePrompt(promptElement);
                output = `Changed directory to: ${currentDirectory}`;
            } else {
                output = `Command not recognized: ${command}`;
            }
    }
    outputElement.innerHTML += `<div class="terminal-output-line">${output}</div>`;
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Function to update clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').textContent = timeString;
}

// Function to toggle notifications panel
function toggleNotificationsPanel() {
    const panel = document.getElementById('notifications-panel');
    panel.classList.toggle('hidden');
    updateNotificationsPanel();
}

// Function to add a notification
function addNotification(message) {
    notifications.push({ message, timestamp: new Date() });
    updateNotificationsPanel();
}

// Function to update notifications panel
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

// Function to initialize README_FIRST content
function initializeReadme(contentElement) {
    contentElement.innerHTML = `
        <h2>Welcome to The Doomsday Machine</h2>
        <p>This is a simulation of an AI development environment. Your task is to develop an AI while navigating ethical dilemmas and security challenges.</p>
        <p>Available applications:</p>
        <ul>
            <li><strong>Terminal:</strong> Use for system commands and AI development</li>
            <li><strong>Browser:</strong> Access simulated internet resources</li>
            <li><strong>Email:</strong> Receive messages and tasks</li>
            <li><strong>Smite:</strong> Messaging application for communication</li>
            <li><strong>Resource Monitor:</strong> Track system resources and AI development progress</li>
        </ul>
        <p>Good luck, and remember: with great power comes great responsibility.</p>
    `;
}
// New functions. ** In REVIEW this should be updated to describe what these functions do. **
function showSystemModal(message) {
    const modal = document.getElementById('system-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.classList.remove('hidden');
}

// New functions. ** In REVIEW this should be updated to describe what these functions do. **
function hideSystemModal() {
    const modal = document.getElementById('system-modal');
    if (modal) {
        modal.classList.add('hidden');
    } else {
        console.error('System modal not found');
    }
}
// New functions. ** In REVIEW this should be updated to describe what these functions do. **
function initializeModal() {
    const modalCloseButton = document.getElementById('modal-close');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', hideSystemModal);
    } else {
        console.error('Modal close button not found');
    }
}

// Initialize the desktop
function initializeDesktop() {
    createDesktopIcons();
    updateClock();
    setInterval(updateClock, 1000);

    document.getElementById('start-menu').addEventListener('click', () => {
        console.log('Start menu clicked');
        // Implement start menu functionality here
    });

    document.getElementById('notifications-icon').addEventListener('click', toggleNotificationsPanel);

    // Initialize the modal
    initializeModal();

    // Add some sample notifications
    addNotification('Welcome to The Doomsday Machine');
    addNotification('New email received');
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeDesktop);
