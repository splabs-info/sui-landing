import { Box, LinearProgress, } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  background: 'transparent',
  borderRadius: 32,
  height: 24,
  boxShadow: '0px 0px 10px 2px rgba(152, 255, 230, 0.7)',
  marginTop: '16px',
  marginBottom: '16px',
  '& .MuiLinearProgress-bar': {
    background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
    borderRadius: 32,
  },
  position: 'relative',
  '::before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(0deg, #00C5D3 81.61%, #96E0DA 95.07%)',
    inset: '0px',
    zIndex: 1,
    borderRadius: 32,
    padding: '2px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },

  [theme.breakpoints.down('sm')]: {
    height: 16,
    '::before': {
      padding: '1px',
    },
    '& .MuiTypography-root': {
      fontSize: 14
    },
  }
}));

const CusBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    '& .MuiTypography-root': {
      fontSize: 14
    },
  }
}));
export const ProcessBarBox = ({ title, percent, subtitle, sx }) => {
  return (
    <CusBox sx={{ ...sx, }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1.5,
        }}
      >
        {title}
      </Box>

      <StyledLinearProgress
        variant="determinate"
        component="p"
        value={percent}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 1.5,
        }}
      >
        {subtitle}
      </Box>
    </CusBox>
  );
};
