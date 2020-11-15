import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Breakdowns } from './Breakdowns';

const useFetchBreakdownsService = (lotCode: string, breakdownType: string) => {
  const [result, setResult] = useState<Service<Breakdowns>>({
    status: 'loading'
  });

  useEffect(() => {
    if (lotCode && breakdownType) {
      fetch(`http://localhost:3000/breakdown/${breakdownType}/${lotCode}`)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [lotCode, breakdownType]);

  return result;
};

export default useFetchBreakdownsService;