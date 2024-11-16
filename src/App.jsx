import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentList from './components/DocumentList';
import DocumentEditor from './components/DocumentEditor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentList />} />
        <Route path="/document/:id" element={<DocumentEditor />} />
      </Routes>
    </Router>
  );
};

export default App;