import './App.css';
import React from 'react';
import { ThemeProvider } from './utilities/ThemeContext'; 
import 'primereact/resources/primereact.min.css';               
import 'primeicons/primeicons.css';                             
import 'primeflex/primeflex.css';                               
import LoginDashboard from './dashboards/LoginDashboard';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
    <ThemeProvider>
      <LoginDashboard />
    </ThemeProvider>
  </div>
  );
}

export default App;
