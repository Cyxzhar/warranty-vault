import { useState, useEffect } from 'react';

export function useSearch(delay = 300) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchTerm), delay);
    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedTerm('');
  };

  return { searchTerm, debouncedTerm, setSearchTerm, clearSearch };
}
