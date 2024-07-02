// main.js
import { initializeDesktop, openApplication } from './desktop.js';
import { loadState, saveState } from './utils/state.js';
import { showLoginScreen } from './login.js';

async function init() {
    try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
            await initializeDesktop();
            loadState();
            console.log('Desktop initialized successfully');
        } else {
            showLoginScreen();
        }
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);

window.addEventListener('beforeunload', saveState);

// Expose openApplication to the global scope if needed for HTML onclick handlers
window.openApplication = openApplication;