import { InputBase, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function CustomInput({ handleDone, ...props }) {
  const [inputValue, setInputValue] = useState('0');
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimer(); // Start the initial timer
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  function inputIdle() {
    console.log(inputValue);
    handleDone(inputValue);
  }

  function resetTimer() {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(inputIdle, 500);
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
    resetTimer();
  };

  function handleBlur() {
    resetTimer();
  }

  //   return <TextField type="number" value={inputValue} onChange={handleChange} onBlur={handleBlur} {...props} />;
  return (
    <InputBase
      type="number"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      {...props}
      //   sx={{
      //     color: 'white',
      //     fontSize: isMobile ? 16 : 40,
      //   }}
    />
  );
}

export default CustomInput;
