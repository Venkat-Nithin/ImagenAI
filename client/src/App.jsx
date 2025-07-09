import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './page';
import './App.css';

const App = () => (
  <BrowserRouter>
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="logo" />
      </Link>

      <Link to="/create-post" className="create-button">Create</Link>
    </header>

    <main className="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
