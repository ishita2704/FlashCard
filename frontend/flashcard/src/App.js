import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import './App.css';

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  return (
    <div className="App">
      <h1>FlashCard Learning Tool</h1>
      <div className="navigation">
        <button onClick={() => setIsAdmin(true)}>Admin Mode</button>
        <button onClick={() => setIsAdmin(false)}>User Mode</button>
      </div>
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}

export default App;
