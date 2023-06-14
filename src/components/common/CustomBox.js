import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const ContentBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.07) -8.02%, rgba(109, 133, 218, 0.07) 98.69%)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '15px',
  padding: 40,
  color: '#fff',
  '&.height-100': {
    height: '100%',
  },
  '&.xui-info': {
    padding: '40px 40px 40px 56px',
  },
  '&.ref-link': {
    padding: '12px 24px',
    height: 'max-content',
  },
  '& .border-bottom': {
    padding: '16px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    '&:last-of-type': {
      paddingBottom: 0,
      borderBottom: 'unset'
    },

    '&:first-of-type': {
      paddingTop: 0,
    }, '& p:last-of-type': {
      fontWeight: 'bold',
      textAlign: 'right',
      marginLeft: 16,
    },
  },
  '& .sale-info': {
    padding: '7px 0',
    '&:last-of-type': {
      paddingBottom: 0,
      borderBottom: 'unset'
    },

    '&:first-of-type': {
      paddingTop: 0,
    }, '& p:last-of-type': {
      fontWeight: 'bold',
      textAlign: 'right',
      marginLeft: 16,
    },
  },

  [theme.breakpoints.down("sm")]: {
    padding: 20,
    '&.ref-link': {
      padding: 20,
    },
    '&.xui-info': {
      padding: '20px 20px 20px 32px',
      fontSize: 14,
    },
  },
}));

export const SpaceBetweenBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down("sm")]: {
  },
}));

