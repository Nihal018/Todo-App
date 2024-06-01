/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/Task.tsx",
    "./components/TaskList.tsx",
    "./screens/Home.tsx",
    "./screens/AllTasks.tsx",
    "./<custom directory>/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
