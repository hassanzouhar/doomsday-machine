// windowManager.js
let windows = [];

export function createWindow(title) {
    const windowElement = document.createElement('div');
    windowElement.className = 'window';

    if (title === 'Terminal') {
        const windowWidth = Math.floor(window.innerWidth * 0.6);
        const windowHeight = Math.floor(window.innerHeight * 0.4);
        const leftPosition = Math.floor((window.innerWidth - windowWidth) / 2);
        const topPosition = Math.floor((window.innerHeight - windowHeight) / 2);

        windowElement.style.width = `${windowWidth}px`;
        windowElement.style.height = `${windowHeight}px`;
        windowElement.style.left = `${leftPosition}px`;
        windowElement.style.top = `${topPosition}px`;
    } else {
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
    windows.push(windowElement);
    
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
