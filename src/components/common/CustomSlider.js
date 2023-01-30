import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSlider = ({
  title,
  color,
  background,
  value,
  max,
  disabledMark,
  disabledBorder,
  style,
  refresh,
  reset,
  ...other
}) => {
  const [marks, setMarks] = useState([]);
  useEffect(() => {
    const step = parseInt(max / 500) - 1;
    var temp = [];
    for (var i = 0; i < step; i++) {
      temp.push((i + 1) * 500);
    }
    setMarks(temp);
  }, [max, value]);

  const BoxStyle = styled(Box)(({ theme }) => ({
    borderRadius: '16px',
    border: disabledBorder ? '' : '2px solid #EACCF8',
    margin: '0.5rem 0',
    height: '20px',
    padding: '0px',
    background: '#112A45',
    position: 'relative',
    boxShadow: '0 0 5px 2px rgba(255,255,255,0.3)',
    // '&::before': {
    //   content: "''",
    //   position: 'absolute',
    //   inset: '0px',
    //   borderRadius: '16px',
    //   padding: ' 1px',
    //   background: 'linear-gradient(90.22deg, #9FE2DC,#9A84F4)',
    //   WebkitMask:
    //     'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    //   WebkitMaskComposite: 'xor',
    //   zIndex: '0',
    // },
    // '&::after': {
    //   content: "''",
    //   position: 'absolute',
    //   top: '8px',
    //   height: '15px',
    //   width: '15px',
    //   border: '1px solid white',
    //   borderRadius: '2px',
    //   background:
    //     'linear-gradient(to right, #fc935f 0%, #FEAD4C 100%)',
    //   boxShadow: 'white 0 0 5px -1px',
    //   transform: 'rotate(45deg)',
    //   zIndex: '2',
    // },
    '& .horizontal-slider': {
      height: '100%',
      overflow: 'hidden',
      borderRadius: '50px',
      background: background ? background : 'rgba(0,0,0,0.1)',
      '& .example-thumb': {
        display: 'none',
      },
      '& .example-track-0': {
        height: '100%',
        background: `${color ? color : '#C3C9CE'}`,
      },
      '& .example-mark': {
        height: '100%',
        width: '1px',
        background: 'rgba(255,255,255,0.5)',
        '&:nth-of-type(0)': {
          display: 'none',
        },
      },
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0.5rem 0',
      height: '20px',
      padding: '4px',
      '&::before': {
        borderRadius: '10px',
        padding: ' 1px',
      },
      // '&::after': {
      //   top: '3px',
      //   height: '15px',
      //   width: '15px',
      // },
    }
  }));

  const CusStask = styled(Stack)({
    width: '100%',

  });

  return (
    <CusStask>
      {title}
      <BoxStyle {...other}>
        <ReactSlider
          className="horizontal-slider"
          marks={disabledMark ? null : marks}
          markClassName="example-mark"
          value={value}
          min={0}
          max={max}
          thumbClassName="example-thumb"
          trackClassName="example-track"
          disabled
        />
      </BoxStyle>
    </CusStask>
  );
};

CustomSlider.propTypes = {
  title: PropTypes.object,
  max: PropTypes.number,
  value: PropTypes.number,
  disabledMark: PropTypes.bool,
  style: PropTypes.object,
  refresh: PropTypes.bool,
};

export default CustomSlider;
