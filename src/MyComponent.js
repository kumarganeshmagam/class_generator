import React, { useEffect, useState } from 'react';

function MyComponent( sentvalue ) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://api.example.com/data');
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (error) {
        console.log('Error:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null; // Or display an error message
  }

  return (
    <div>
      {/* Render the data */}
    </div>
  );
}

export default MyComponent;
