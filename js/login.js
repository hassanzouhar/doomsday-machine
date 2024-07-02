// js/login.js

import { playSound } from './utils/sound.js';
import { initializeDesktop } from './desktop.js';

const users = [
    { username: 'QuantumBurger', password: 'password123' },
    // Add more users as needed
];

export function showLoginScreen() {
    const loginHTML = `
        <div id="login-screen">
            <div class="login-container">
                <h2>DoomOS Login</h2>
                <div class="input-container">
                    <input type="text" id="username" placeholder="Username" />
                    <label for="username">Username</label>
                </div>
                <div class="input-container">
                    <input type="password" id="password" placeholder="Password" />
                    <label for="password">Password</label>
                </div>
                <button id="login-button">Login</button>
                <p id="login-error" class="error hidden">Invalid username or password</p>
            </div>
        </div>
    `;

    document.body.innerHTML = loginHTML;

    document.getElementById('login-button').addEventListener('click', attemptLogin);
    document.getElementById('password').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') attemptLogin();
    });

    // Add animation classes after a short delay
    setTimeout(() => {
        document.querySelector('.login-container').classList.add('animate-in');
    }, 100);
}

function attemptLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        playSound('unlock');
        localStorage.setItem('loggedInUser', username);
        document.querySelector('.login-container').classList.add('animate-out');
        setTimeout(() => {
            initializeDesktop();
        }, 500); // Wait for animation to complete
    } else {
        playSound('error');
        document.getElementById('login-error').classList.remove('hidden');
        shakeLoginContainer();
    }
}

function shakeLoginContainer() {
    const container = document.querySelector('.login-container');
    container.classList.add('shake');
    setTimeout(() => {
        container.classList.remove('shake');
    }, 500);
}

export function logout() {
    localStorage.removeItem('loggedInUser');
    showLoginScreen();
}