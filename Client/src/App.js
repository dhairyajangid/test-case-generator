// src/App.js
import React, { useState } from 'react';
import './App.css';
import JiraForm from './components/JiraForm';
import TestCases from './components/TestCases';

function App() {
  const [testCases, setTestCases] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Jira Test Case Generator</h1>
        <p>Convert Jira tickets into comprehensive test cases using AI</p>
      </header>
      
      <main className="App-main">
        <JiraForm 
          setTestCases={setTestCases} 
          setIsLoading={setIsLoading} 
          setError={setError} 
        />
        
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Generating test cases...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {testCases && !isLoading && (
          <TestCases testCases={testCases} />
        )}
      </main>
      
      <footer className="App-footer">
        <p>AI-Powered Test Case Generator</p>
      </footer>
    </div>
  );
}

export default App;