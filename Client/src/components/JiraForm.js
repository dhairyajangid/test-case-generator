// src/components/JiraForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './JiraForm.css';

const JiraForm = ({ setTestCases, setIsLoading, setError }) => {
  const [ticketDescription, setTicketDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!ticketDescription.trim()) {
      setError('Please enter a Jira ticket description');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setTestCases('');
    
    try {
      const response = await axios.post('http://localhost:5000/api/generate-test-cases', {
        ticketDescription
      });
      
      setTestCases(response.data.testCases);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate test cases. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setTicketDescription('');
    setTestCases('');
    setError(null);
  };

  return (
    <div className="jira-form-container">
      <h2>Enter Jira Ticket Details</h2>
      
      <form onSubmit={handleSubmit} className="jira-form">
        <div className="form-group">
          <label htmlFor="ticket-description">Ticket Description:</label>
          <textarea
            id="ticket-description"
            value={ticketDescription}
            onChange={(e) => setTicketDescription(e.target.value)}
            placeholder="Paste your Jira ticket description here including title, description, and acceptance criteria..."
            rows={10}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-button">Generate Test Cases</button>
          <button type="button" onClick={handleClear} className="clear-button">Clear</button>
        </div>
      </form>
      
      <div className="example-section">
        <h3>Example Ticket</h3>
        <div className="example-ticket">
          <p><strong>Title:</strong> Add Date Range Filter to Search Results</p>
          <p><strong>Description:</strong> As a user, I want to filter search results by date range so that I can find content created within a specific time period.</p>
          <p><strong>Acceptance Criteria:</strong></p>
          <ul>
            <li>Add "From Date" and "To Date" fields to the search interface</li>
            <li>Validate that "From Date" is not after "To Date"</li>
            <li>Allow users to select only one date (either From or To)</li>
            <li>Update search results in real-time when date filters are applied</li>
            <li>Allow clearing of date filters</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JiraForm;