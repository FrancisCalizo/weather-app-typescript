import { useState, useEffect } from 'react';

const useFahrenheit = (tempInCelsius: number): number => {
  const [tempInFahrenheit, setTempInFahrenheit] = useState(0);

  useEffect(() => {
    let convertedTemp = Math.round(tempInCelsius * (9 / 5) + 32);
    setTempInFahrenheit(convertedTemp);
  }, [tempInCelsius]);

  return tempInFahrenheit;
};

export default useFahrenheit;
