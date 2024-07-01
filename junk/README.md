# The Doomsday Machine - Setup Instructions

## Prerequisites

Before you begin, ensure you have the following installed on your system:

1. Node.js (version 14.0.0 or higher)
2. npm (usually comes with Node.js)

## Setup Steps

1. **Create a new React project**

   Open a terminal and run the following commands:

   ```
   npx create-react-app doomsday-machine
   cd doomsday-machine
   ```

2. **Install additional dependencies**

   We're using Tailwind CSS for styling. Install it with:

   ```
   npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
   npx tailwindcss init -p
   ```

3. **Configure Tailwind CSS**

   Replace the content of `tailwind.config.js` with:

   ```javascript
   module.exports = {
     purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
     darkMode: false,
     theme: {
       extend: {},
     },
     variants: {
       extend: {},
     },
     plugins: [],
   }
   ```

   Then, replace the content of `src/index.css` with:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Create component files**

   In the `src` folder, create two new files: `Terminal.js` and `Desktop.js`.

5. **Add component code**

   Copy the code for the Terminal component into `Terminal.js` and the code for the Desktop component (including the Window component) into `Desktop.js`. These are the React components we created earlier.

6. **Update App.js**

   Replace the content of `src/App.js` with:

   ```jsx
   import React from 'react';
   import Desktop from './Desktop';

   function App() {
     return (
       <div className="App">
         <Desktop />
       </div>
     );
   }

   export default App;
   ```

7. **Start the development server**

   Run the following command:

   ```
   npm start
   ```

   This will start the React development server. The game should now be running on `http://localhost:3000`.

## Project Structure

- `/src`
  - `App.js`: Main application component
  - `Desktop.js`: Desktop environment component
  - `Terminal.js`: Terminal application component
  - `index.css`: Tailwind CSS imports
- `/public`: Public assets

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production

## Troubleshooting

If you encounter any issues during setup, try the following:

1. Ensure all prerequisites are correctly installed
2. Delete the `node_modules` folder and run `npm install` again
3. Clear your browser cache
4. Check the console for any error messages

If problems persist, please reach out for support.

## Next Steps

After setting up the project, you can start exploring and modifying the code. Here are some suggested next steps:

1. Try adding more functionality to the Terminal component
2. Implement additional applications for the desktop environment
3. Enhance the window management system with resizing and minimizing capabilities
4. Start implementing the game's narrative and progression system

Happy coding, and welcome to The Doomsday Machine project!
