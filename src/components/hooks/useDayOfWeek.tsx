import { useEffect, useState } from 'react';

const useDayOfWeek = (dayNumber: number, type: 'short' | 'long'): Day => {
  const [dayOfWeek, setDayOfWeek] = useState<Day>('');

  useEffect(() => {
    // Get Day of Week Name From Number
    switch (dayNumber) {
      case 0:
        type === 'short' ? setDayOfWeek('Mon') : setDayOfWeek('Monday');
        break;
      case 1:
        type === 'short' ? setDayOfWeek('Tue') : setDayOfWeek('Tuesday');
        break;
      case 2:
        type === 'short' ? setDayOfWeek('Wed') : setDayOfWeek('Wednesday');
        break;
      case 3:
        type === 'short' ? setDayOfWeek('Thu') : setDayOfWeek('Thursday');
        break;
      case 4:
        type === 'short' ? setDayOfWeek('Fri') : setDayOfWeek('Friday');
        break;
      case 5:
        type === 'short' ? setDayOfWeek('Sat') : setDayOfWeek('Saturday');
        break;
      case 6:
        type === 'short' ? setDayOfWeek('Sun') : setDayOfWeek('Sunday');
        break;
      default:
        setDayOfWeek('');
    }
  }, [dayNumber, type]);

  return dayOfWeek;
};

export default useDayOfWeek;
