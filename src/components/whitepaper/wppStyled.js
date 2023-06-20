import { Box, Button, Link, Typography, alpha, styled } from "@mui/material";


export const WppContentBox = styled(Box)(({ theme }) => ({
  padding: "0",
  marginLeft: '3rem',
  "& ul": {
    paddingLeft: 32
  },
  "& li": {
    color: 'white'
  },
  "& a": {
    color: '#00C5D3'
  },
  "& .CheckList": {
    listStyle: 'none',
    paddingLeft: '1rem',
  },
  "& .icon-tabler-square-check path": {
    color: '#1DD7D1'
  },
  "& .icon-tabler-square-check rect": {
    color: '#1DD7D1'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '0',
  }
}));
export const TitleText = styled(Typography)(({ theme }) => ({
  color: 'white',
  paddingTop: '2rem',
  fontFamily: "SVN-Gilroy-heavy",
  "&:fist-of-type": {
    paddingTop: '1rem',
  },
}));

export const NormalText = styled(Typography)(({ theme }) => ({
  // textIndent: '1rem',
  color: alpha('#fff', 0.7),
  paddingTop: '0.5rem',
  fontSize: '0.98rem',
  "& img": {
    marginBottom: 32,
    marginTop: 16,
    borderRadius: '20px',
    border: '1px solid #48595A'
  },
  "& b": {
    color: alpha('#fff', 0.85)
  },
  "& highline": {
    color: alpha('#1DD7D1', 0.85),
    fontStyle: 'italic'
  },
}));

export const NormalTextList = styled(Typography)(({ theme }) => ({
  color: alpha('#fff', 0.7),
  paddingTop: '0.5rem',
  fontSize: '0.98rem',
  display: 'flex',
  "& .icon": {
    marginRight: '0.5rem',
    minWidth: '24px'
  },

}));
export const BrandKitBox = styled(Box)(({ theme }) => ({
  color: '#fff',
  "& img": {
    border: 'none',
    borderRadius: '0px',
    marginTop: 0,
    marginBottom: 0
  },

}));
export const DownloadBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(314.02deg, rgba(153, 171, 238, 0.1) -5.63%, rgba(33, 93, 137, 0.1) 88.83%)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 20px rgba(158, 214, 255, 0.15)',
  backdropFilter: 'blur(35px)',
  borderRadius: '10px',
  padding: '10px',
  '& .title': {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: 500,
    paddingLeft: 8,
  }

}));

export const DownloadButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(255, 255, 255, 0.12)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: 12,
  fontWeight: 500,
  '& svg': {
    marginRight: 4
  }
}));

export const BrandColorBox = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(25px)',
  borderRadius: '16px',
  position: 'relative',
  color: '#040D18',
  minHeight: 200,
  '& .MuiIconButton-root': {
    position: 'absolute',
    top: 32,
    right: 32,
    '& svg': {
      color: '#040D18',
      width: '2rem',
      height: '2rem',
    },
  },
  "& .brand-color-more": {
    position: 'absolute',
    bottom: '0',
    borderRadius: '0 0 15px 15px',
    background: 'black',
    minHeight: '30px',
    '& .MuiStack-root:first-of-type': {
      borderRadius: '0 0 0 15px'
    },
    '& .MuiStack-root:last-of-type': {
      borderRadius: '0 0 15px 0'
    },
  }
}));

export const BrandGradientColorBox = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(25px)',
  borderRadius: '16px',
  position: 'relative',
  color: '#040D18',
  minHeight: 170,
  background: 'linear-gradient(170deg, #00F1F5 0%, #8A92FF 80%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  '& .MuiIconButton-root': {
    position: 'absolute',
    top: 32,
    right: 32,
    '& svg': {
      color: '#040D18',
      width: '2rem',
      height: '2rem',
    },
  },
}));

export const TypographyBox = styled(Box)(({ theme }) => ({
  backdropFilter: 'blur(25px)',
  borderRadius: '10px',
  color: 'white',
  background: 'linear-gradient(314.02deg, rgba(153, 171, 238, 0.1) -5.63%, rgba(33, 93, 137, 0.1) 88.83%)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 20px rgba(158, 214, 255, 0.15)',
  padding: 32,
}));


export const FontLink = styled(Link)(({ theme }) => ({
  borderRadius: '15px',
  color: 'white!important',
  fontWeight: '600',
  textDecoration: 'none',
  background: 'linear-gradient(180deg, #41F1D3 0%, #5974BB 100%)',
  padding: '12px 24px',
  display: 'inline-block',
}));
export const SocialLink = styled(Link)(({ theme }) => ({
  backdropFilter: 'blur(25px)',
  borderRadius: '0 50px 50px 0',
  background: 'linear-gradient(314.02deg, rgba(153, 171, 238, 0.1) -5.63%, rgba(33, 93, 137, 0.1) 88.83%)',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2), inset 0px 0px 20px rgba(158, 214, 255, 0.15)',
  padding: '6px 18px 6px 24px',
  color: 'white!important',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  margin: '0 16px 16px 18px',
  "& img": {
    position: 'absolute',
    left: -18,
    top: 0,
  }
}));


