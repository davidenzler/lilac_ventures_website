import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Homepage from './Homepage';
import NavBar from './NavBar';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import logo from './logo.svg';
import './App.css';

import History from './History';
import Values from './Values';
import Mission from './Mission';
function App() {
  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <NavBar />
        </header>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/history" element={<History/>} />
          <Route path="/values" element={<Values/>} />
          <Route path="/mission" element={<Mission/>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
