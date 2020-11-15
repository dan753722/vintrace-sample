import { useEffect, useState } from 'react';
import { Service } from './Service';
import { SearchResults } from './SearchResults';

const useFetchSearchResultsService = (filter: string) => {
  const [result, setResult] = useState<Service<SearchResults>>({
    status: 'loading'
  });

  useEffect(() => {
    if (filter) {
      fetch(`http://localhost:3000/search?filter=${filter}`)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: { results: response } }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [filter]);

  return result;
};

export default useFetchSearchResultsService;
