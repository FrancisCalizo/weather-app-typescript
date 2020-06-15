import React from 'react';
import styles from '../assets/ToggleCountry.module.css';

interface Props {
  isGlobal: boolean;
  setIsGlobal: (isGlobal: boolean) => void;
  setSearchCity: (input: string) => void;
}

const ToggleCountry: React.FC<Props> = ({
  isGlobal,
  setIsGlobal,
  setSearchCity,
}) => {
  const handleChange = () => {
    if (isGlobal) {
      setSearchCity('Miami');
    } else {
      setSearchCity('Barcelona');
    }

    localStorage.setItem('isGlobal', JSON.stringify(!isGlobal));
    setIsGlobal(!isGlobal);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full mb-24">
        <label htmlFor="toogleA" className="flex items-center cursor-pointer">
          <div className="relative">
            <input
              id="toogleA"
              type="checkbox"
              className="hidden"
              checked={isGlobal}
              onChange={handleChange}
            />
            <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div
              className={`${styles.toggle__dot} absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0`}
            ></div>
          </div>
          <div className="ml-3 text-gray-700 font-medium"></div>
          Global
        </label>
      </div>
    </div>
  );
};

export default ToggleCountry;
