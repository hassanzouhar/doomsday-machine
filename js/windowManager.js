// windowManager.js
let windows = [];

export function createWindow(appName) {
    const windowsContainer = document.getElementById('windows-container');
    const windowElement = document.createElement('div');
    windowElement.className = 'window';
    windowElement.innerHTML = `
        <div class="window-title-bar">
            <span class="window-title">${appName}</span>
            <button class="window-close-button">X</button>
        </div>
        <div class="window-content"></div>
    `;
    windowsContainer.appendChild(windowElement);

    const closeButton = windowElement.querySelector('.window-close-button');
    closeButton.addEventListener('click', () => {
        windowsContainer.removeChild(windowElement);
    });

    return windowElement;
}

export function closeWindow(windowElement) {
    windowElement.remove();
    windows = windows.filter(w => w !== windowElement);
    updateTaskbar();
}

export function updateTaskbar() {
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

function getTopZIndex() {
    return Math.max(0, ...windows.map(w => parseInt(w.style.zIndex) || 0));
}

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
