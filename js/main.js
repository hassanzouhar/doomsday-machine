// main.js
import { initializeDesktop, openApplication } from './desktop.js';
import { loadState, saveState } from './utils/state.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeDesktop();
    loadState();
});

window.addEventListener('beforeunload', saveState);

// Expose openApplication to the global scope if needed for HTML onclick handlers
window.openApplication = openApplication;
