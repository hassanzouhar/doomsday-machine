// js/apps/terminal.js

let currentUser = 'QuantumBurger';
let currentDirectory = '~';

export function initializeTerminal(contentElement) {
    let commandHistory = [];
    let historyIndex = 0;

    contentElement.innerHTML = `
        <div class="terminal-container">
            <div class="terminal-output"></div>
            <div class="terminal-input-line">
                <span class="terminal-prompt"></span>
                <input type="text" class="terminal-input" autofocus>
            </div>
        </div>
    `;

    const outputElement = contentElement.querySelector('.terminal-output');
    const inputElement = contentElement.querySelector('.terminal-input');
    const promptElement = contentElement.querySelector('.terminal-prompt');

    updatePrompt(promptElement);

    inputElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = inputElement.value.trim();
            if (command) {
                commandHistory.push(command);
                historyIndex = commandHistory.length;
                processCommand(command, outputElement, promptElement);
                inputElement.value = '';
            }
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
    outputElement.innerHTML += `<div class="terminal-command"><span class="terminal-prompt-inline">${promptElement.innerHTML}</span>${command}</div>`;
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
