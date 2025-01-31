import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MatchList from './components/MatchList';
import MatchAnalysis from './components/MatchAnalysis';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MatchList />} />
            <Route path="/match/:id" element={<MatchAnalysis />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;