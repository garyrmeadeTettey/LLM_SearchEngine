// app/search/page.js
"use client";

import { useState, useEffect } from 'react';

function searchJson(data, query) {
  return data.filter(item =>
    Object.values(item).some(value =>
      value != null && value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the JSON data
    fetch('/data.json')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging line
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Error handling
      });
  }, []);

  useEffect(() => {
    // Search the data when the query changes
    if (query) {
      const filteredResults = searchJson(data, query);
      console.log('Search results for query:', query, filteredResults); // Debugging line
      setResults(filteredResults);
    } else {
      setResults(data); // Display all data when there's no query
    }
  }, [query, data]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <h1>Search JSON Data</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter search term"
      />
      <ul>
        {results.map(result => (
          <li key={result.id}>
            {result.name} - {result.occupation}
             {result.force}
             {result.images}
          </li>
        ))}
      </ul>
    </div>
  );
}
