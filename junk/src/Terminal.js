import React, { useState, useEffect, useRef } from 'react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState(['Welcome to the Nexus Innovations Terminal.', 'Type "help" for a list of commands.']);
  const outputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
    }
  };

  const processCommand = (cmd) => {
    setOutput([...output, `> ${cmd}`]);
    switch (cmd.toLowerCase()) {
      case 'help':
        setOutput([...output, `> ${cmd}`, 'Available commands:', '- help: Display this help message', '- clear: Clear the terminal', '- date: Display current date and time', '- whoami: Display current user information']);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'date':
        setOutput([...output, `> ${cmd}`, new Date().toString()]);
        break;
      case 'whoami':
        setOutput([...output, `> ${cmd}`, 'Current user: QuantumBurger', 'Access level: Administrator']);
        break;
      default:
        setOutput([...output, `> ${cmd}`, `Command not recognized: ${cmd}`]);
    }
  };

  return (
    <div className="bg-black text-green-500 p-4 h-full font-mono text-sm">
      <div ref={outputRef} className="h-5/6 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-gray-900">
        {output.map((line, index) => (
          <div key={index} className="mb-1">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="mr-2 text-cyan-500">{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleInput}
          className="bg-transparent text-green-500 focus:outline-none flex-grow"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
