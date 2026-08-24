import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <h1 className="text-xl font-bold text-slate-800">Credora</h1>
            </div>
            <nav>
              <a href="/" className="text-slate-600 hover:text-blue-600 transition-colors">Home</a>
            </nav>
          </div>
        </header>

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        
        <footer className="bg-slate-900 text-slate-400 py-8 mt-auto text-center">
          <p>© 2026 Credora. Hackathon MVP.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
