import { useEffect, useState } from 'react';
import { Service } from './Service';
import { WineDetail } from './WineDetail';

const useFetchWineDetailService = (lotCode: string) => {
  const [result, setResult] = useState<Service<WineDetail>>({
    status: 'loading'
  });

  useEffect(() => {
    if (lotCode) {
      fetch(`http://localhost:3000/wine-detail/${lotCode}`)
        .then(response => response.json())
        .then(response => setResult({ status: 'loaded', payload: response }))
        .catch(error => setResult({ status: 'error', error }));
    }
  }, [lotCode]);

  return result;
};

export default useFetchWineDetailService;