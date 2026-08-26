import { useState } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(false);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    setFlag(value.trim().length === 0);
  };

  return {
    value,
    flag,
    onChange,
  };
};

export default useInput;
