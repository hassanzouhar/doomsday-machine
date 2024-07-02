// js/utils/sound.js

const soundFiles = {
    criticalError: 'public/sounds/critical_error.mp3',
    error: 'public/sounds/error.mp3',
    newMessage: 'public/sounds/new_message.mp3',
    unlock: 'public/sounds/unlock.mp3'
};

const sounds = {};
const loadPromises = [];

// Preload sounds
Object.entries(soundFiles).forEach(([name, path]) => {
    sounds[name] = new Audio(path);
    const loadPromise = new Promise((resolve, reject) => {
        sounds[name].addEventListener('canplaythrough', resolve);
        sounds[name].addEventListener('error', reject);
    });
    loadPromises.push(loadPromise);
    sounds[name].load(); // This starts loading the audio file
});

export function playSound(soundName) {
    if (sounds[soundName]) {
        // If the audio is already playing, reset it
        if (!sounds[soundName].paused) {
            sounds[name].pause();
            sounds[name].currentTime = 0;
        }
        
        sounds[soundName].play().catch(e => {
            console.error(`Error playing sound ${soundName}:`, e);
        });
    } else {
        console.error(`Sound not found: ${soundName}`);
    }
}

// Function to wait for all sounds to load
export function waitForSoundsToLoad() {
    return Promise.all(loadPromises);
}