import { InputBase } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

function CustomInput({ handleDone, defaultValue, ...props }) {
  const [inputValue, setInputValue] = useState('0');
  const typingTimerRef = useRef(null);

  React.useEffect(() => {
    if (defaultValue !== inputValue) {
      setInputValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const handleInput = (value) => {
    console.log(value);
    handleDone(value);
  };

  useEffect(() => {
    if (inputValue) {
      clearTimeout(typingTimerRef.current);

      typingTimerRef.current = setTimeout(() => {
        handleInput(inputValue);
      }, 500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return <InputBase type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} {...props} />;
}

export default CustomInput;
