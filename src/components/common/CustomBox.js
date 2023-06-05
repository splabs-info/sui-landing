import styled from "@emotion/styled";
import { Box } from "@mui/material";


export const ContentBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(98.21deg, rgba(104, 230, 184, 0.1) -9.15%, rgba(109, 133, 218, 0.1) 102.32%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '15px',
  padding: 40,
  color: '#fff',
  '&.xui-info': {
    height: '90%',
  },
  '&.ref-link': {
    padding: '20px 40px',
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
    padding: '12px 0',
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
  },
}));

export const SpaceBetweenBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.down("sm")]: {
  },
}));

