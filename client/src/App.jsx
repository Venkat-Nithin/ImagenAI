import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, CreatePost } from './page';
import './App.css';

const App = () => (
  <BrowserRouter>
    <main className="main-wrapper">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
