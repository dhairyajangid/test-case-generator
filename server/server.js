// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint with mock data
app.post('/api/generate-test-cases', async (req, res) => {
  try {
    const { ticketDescription } = req.body;
    
    if (!ticketDescription) {
      return res.status(400).json({ error: 'Ticket description is required' });
    }

    console.log('Received ticket description:', ticketDescription.substring(0, 50) + '...');
    console.log('Using mock test cases (OpenAI API quota exceeded)');
    
    // Generate mock response for the date range filter ticket
    const testCases = `# Test Cases for Date Range Filter on Search Results

## Valid Scenarios

### Test Case 1: Basic Date Range Filter
**Given** the user is on the search page
**When** the user enters a search term
**And** selects a "From Date" as "2023-01-01"
**And** selects a "To Date" as "2023-01-31"
**And** clicks the search button
**Then** only results from January 1-31, 2023 should be displayed
**And** results should be sorted by relevance

### Test Case 2: Single Date Filter (From Date only)
**Given** the user is on the search page
**When** the user enters a search term
**And** selects only a "From Date" as "2023-01-01"
**And** leaves the "To Date" empty
**And** clicks the search button
**Then** only results from January 1, 2023 to the current date should be displayed

### Test Case 3: Single Date Filter (To Date only)
**Given** the user is on the search page
**When** the user enters a search term
**And** leaves the "From Date" empty
**And** selects only a "To Date" as "2023-01-31"
**And** clicks the search button
**Then** only results up to January 31, 2023 should be displayed

## Invalid Scenarios

### Test Case 4: Invalid Date Range
**Given** the user is on the search page
**When** the user enters a search term
**And** selects a "From Date" as "2023-02-15"
**And** selects a "To Date" as "2023-01-15" (earlier than From Date)
**And** clicks the search button
**Then** an error message should be displayed: "From Date cannot be later than To Date"
**And** the search should not be executed

## Boundary Conditions

### Test Case 5: Same From and To Date
**Given** the user is on the search page
**When** the user enters a search term
**And** selects the same date for both "From Date" and "To Date"
**And** clicks the search button
**Then** only results from that specific date should be displayed

## Edge Cases

### Test Case 6: Clear Date Filters
**Given** the user has applied date filters to search results
**When** the user clicks on "Clear Filters" button
**Then** the date range fields should be reset
**And** search results should update to show all results without date filtering

### Test Case 7: Real-time Update
**Given** the user is on the search page with results displayed
**When** the user changes either date filter
**Then** the results should update in real-time without requiring a new search button click`;
    
    res.json({ testCases });
  } catch (error) {
    console.error('Error generating test cases:', error);
    res.status(500).json({ 
      error: 'Failed to generate test cases',
      details: error.message 
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});