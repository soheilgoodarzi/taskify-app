import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TasksProvider } from './contexts/TasksProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);