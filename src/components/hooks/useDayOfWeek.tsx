import { useEffect, useState } from 'react';

const useDayOfWeek = (dayNumber: number): Day => {
  const [dayOfWeek, setDayOfWeek] = useState<Day>('');

  useEffect(() => {
    // Get Day of Week Name From Number
    switch (dayNumber) {
      case 0:
        setDayOfWeek('Mon');
        break;
      case 1:
        setDayOfWeek('Tue');
        break;
      case 2:
        setDayOfWeek('Wed');
        break;
      case 3:
        setDayOfWeek('Thu');
        break;
      case 4:
        setDayOfWeek('Fri');
        break;
      case 5:
        setDayOfWeek('Sat');
        break;
      case 6:
        setDayOfWeek('Sun');
        break;
      default:
        setDayOfWeek('');
    }
  }, [dayNumber]);

  return dayOfWeek;
};

export default useDayOfWeek;
