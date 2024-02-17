import { useState, useEffect } from 'react';

const useProductData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 1000) + 500;
    setTimeout(async () => {
      try {
        const response = await fetch('/productData.json');
        if (!response.ok) {
          throw new Error('server error');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }, randomDelay);
  }, []);

  return { data, isLoading, isError };
};

export default useProductData;
