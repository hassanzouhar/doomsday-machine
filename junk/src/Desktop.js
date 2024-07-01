import React, { useState, useEffect } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import Terminal from './Terminal';

const Window = ({ title, children, onClose, initialPos, initialSize }) => {
  const [position, setPosition] = useState(initialPos);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDragging = (e) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const drag = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const onResize = (event, { size }) => {
    setSize({ width: size.width, height: size.height });
  };

  return (
    <Resizable 
      width={size.width} 
      height={size.height}
      onResize={onResize}
      draggableOpts={{grid: [25, 25]}}
    >
      <div 
        className="absolute bg-gray-800 border border-cyan-500 shadow-lg rounded-lg overflow-hidden"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`, 
          width: `${size.width}px`, 
          height: `${size.height}px` 
        }}
        onMouseMove={drag}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
      >
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2 cursor-move flex justify-between items-center"
          onMouseDown={startDragging}
        >
          <span className="font-mono">{title}</span>
          <button onClick={onClose} className="focus:outline-none hover:text-red-500 transition-colors">×</button>
        </div>
        <div className="p-4 h-5/6 overflow-auto">
          {children}
        </div>
      </div>
    </Resizable>
  );
};

const MenuBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // This function would be called when a new notification is added
  const addNotification = (message) => {
    setNotifications([...notifications, message]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-2 flex justify-between items-center">
      <div className="flex-1">
        {/* Add other menu items here */}
      </div>
      <div className="flex items-center">
        <div className="mr-4 font-mono">
          {currentTime.toLocaleTimeString()}
        </div>
        <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="focus:outline-none hover:text-cyan-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          {showNotifications && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-gray-700 rounded-lg shadow-xl p-2">
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="mb-2 p-2 bg-gray-600 rounded">
                    {notification}
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">Nothing new here</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Desktop = () => {
  const [windows, setWindows] = useState([]);
  const [background, setBackground] = useState('/api/placeholder/1920/1080'); // Default placeholder background

  const openWindow = (app) => {
    const initialPos = { x: 50 + windows.length * 30, y: 50 + windows.length * 30 };
    const initialSize = { width: 500, height: 400 };
    setWindows([...windows, { ...app, initialPos, initialSize }]);
  };

  const closeWindow = (index) => {
    setWindows(windows.filter((_, i) => i !== index));
  };

  return (
    <div 
      className="h-screen overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30">
        <div className="p-4 grid grid-cols-6 gap-4">
          <button 
            onClick={() => openWindow({ title: 'Terminal', content: <Terminal /> })} 
            className="text-cyan-500 hover:text-cyan-400 transition-colors focus:outline-none"
          >
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="mt-1 text-xs">Terminal</span>
            </div>
          </button>
          {/* Add more app buttons here */}
        </div>
        {windows.map((window, index) => (
          <Window 
            key={index} 
            title={window.title} 
            onClose={() => closeWindow(index)}
            initialPos={window.initialPos}
            initialSize={window.initialSize}
          >
            {window.content}
          </Window>
        ))}
      </div>
      <MenuBar />
    </div>
  );
};

export default Desktop;
