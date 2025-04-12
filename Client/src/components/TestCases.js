// src/components/TestCases.js
import React from 'react';
import './TestCases.css';

const TestCases = ({ testCases }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(testCases)
      .then(() => {
        alert('Test cases copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <div className="test-cases-container">
      <div className="test-cases-header">
        <h2>Generated Test Cases</h2>
        <button onClick={handleCopyToClipboard} className="copy-button">
          Copy to Clipboard
        </button>
      </div>
      
      <div className="test-cases-content">
        <pre>{testCases}</pre>
      </div>
    </div>
  );
};

export default TestCases;