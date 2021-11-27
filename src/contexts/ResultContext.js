import React, { useContext, useState, createContext } from 'react';

export const ResultContext = createContext();
const baseURL = 'https://google-search3.p.rapidapi.com/api/v1';

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const getResults = async (url) => {
    setIsLoading(true);

    const response = await fetch(`${baseURL}${url}`, {
      method: 'GET',
      headers: {
        'x-user-agent': 'desktop',
        'x-proxy-location': 'US',
        'x-rapidapi-host': 'google-search3.p.rapidapi.com',
        'x-rapidapi-key': '45f7b25eddmsh8c7455dee9e8461p123abajsn2c6afd1cb708',
      },
    });
    const data = await response.json();

    if (url.startsWith('/news')) {
      setResults(data.entries);
    } else if (url.startsWith('/images')) {
      setResults(data.image_results);
    } else if (url.startsWith('/search')) {
      setResults(data.results);
    }

    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{
        getResults,
        results,
        searchTerm,
        setSearchTerm,
        isLoading,
        setResults,
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
