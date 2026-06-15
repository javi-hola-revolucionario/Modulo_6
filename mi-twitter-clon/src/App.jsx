import './App.css'

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (username) => {
    const u = { username };
    setUser(u);
    localStorage.setItem("user", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="app-shell">
        <nav className="main-nav">
          <Link to="/">Inicio</Link>
          <Link to="/profile">Perfil</Link>
          {user ? (
            <button onClick={logout} style={{ marginLeft: 8 }}>Salir</button>
          ) : (
            <Link to="/login" style={{ marginLeft: 8 }}>Entrar</Link>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/" element={<Home user={user} logout={logout} />} />
          <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}
