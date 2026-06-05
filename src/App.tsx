import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import BodyContent from './components/BodyContent';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';

const App = () => (
  <BrowserRouter>
    <BodyContent>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BodyContent>
  </BrowserRouter>
);

export default App;
