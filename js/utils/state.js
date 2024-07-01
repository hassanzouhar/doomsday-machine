// utils/state.js
import { openApplication } from '../desktop.js';

export function saveState() {
    const openApps = Array.from(document.querySelectorAll('.window')).map(window => {
        return {
            name: window.querySelector('.window-header span').textContent,
            position: {
                left: window.style.left,
                top: window.style.top
            },
            size: {
                width: window.style.width,
                height: window.style.height
            }
        };
    });

    localStorage.setItem('doomsdayMachineState', JSON.stringify(openApps));
}

export function loadState() {
    const savedState = localStorage.getItem('doomsdayMachineState');
    if (savedState) {
        const openApps = JSON.parse(savedState);
        openApps.forEach(app => {
            const window = openApplication(app.name);
            if (window) {
                window.style.left = app.position.left;
                window.style.top = app.position.top;
                window.style.width = app.size.width;
                window.style.height = app.size.height;
            }
        });
    }
}
