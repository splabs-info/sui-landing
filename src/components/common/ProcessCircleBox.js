import { Box, } from '@mui/material';

import { styled } from '@mui/material/styles';

const CircleBox = styled(Box)(({ theme }) => ({
  height: '260px',
  width: '260px',
  position: 'relative',
  padding: '25px',
}));
const InnerCircleBox = styled(Box)(({ theme }) => ({
  height: '210px',
  width: '210px',
  borderRadius: '50%',
  border: '7px solid #336E76',
}));
const OuterCircleBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  '& svg': {
    transform: 'rotate(270deg)',
    height: "240px",
    width: "240px",
    animation: 'anim 2s linear forwards'
  },
}));

export const ProcessCircleBox = () => {

  return (
    <CircleBox>
      <InnerCircleBox />
      <OuterCircleBox>
        <svg >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor='#6D85DA' />
              <stop offset="100%" stopColor='#68E5B8' />
            </linearGradient>
          </defs>
          <circle cx="120" cy="120" r="100"
            stroke="url(#grad1)"
            strokeWidth='20px'
            strokeLinecap='round'
            fill='none'
            strokeDasharray='628' // 2r pi
            strokeDashoffset='157' // 2r pi - 2r pi * 50%
          />
        </svg>
      </OuterCircleBox>
    </CircleBox>
  );
};
