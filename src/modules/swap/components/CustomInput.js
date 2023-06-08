import { InputBase } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function CustomInput({ handleDone, ...props }) {
  const [inputValue, setInputValue] = useState('');
  const typingTimerRef = useRef(null);

  const handleInput = (value) => {
    console.log('Input value:', value);
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
