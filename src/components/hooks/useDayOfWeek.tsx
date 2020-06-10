import { useEffect, useState } from 'react';

const useDayOfWeek = (dayNumber: number): Day => {
  const [dayOfWeek, setDayOfWeek] = useState<Day>('');

  useEffect(() => {
    // Get Day of Week Name From Number
    switch (dayNumber) {
      case 0:
        setDayOfWeek('Sun');
        break;
      case 1:
        setDayOfWeek('Mon');
        break;
      case 2:
        setDayOfWeek('Tue');
        break;
      case 3:
        setDayOfWeek('Wed');
        break;
      case 4:
        setDayOfWeek('Thu');
        break;
      case 5:
        setDayOfWeek('Fri');
        break;
      case 6:
        setDayOfWeek('Sat');
        break;
      default:
        setDayOfWeek('');
    }
  }, [dayNumber]);

  return dayOfWeek;
};

export default useDayOfWeek;
