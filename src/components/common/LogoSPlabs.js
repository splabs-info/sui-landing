import { Box, Link, styled } from "@mui/material";


export const CusLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  padding: '0 4px',
  textDecoration: 'none',
  "&:hover": {
    borderBottom: "0px!important",
  },
}));


export default function LogoSPlabs({ sx, width }) {
  const logo = (
    <CusLink href="https://splabs.info/"
      target={'_blank'}
      sx={{ ...sx }}>
      <Box component="img"
        src="/logo-splabs-white.png"
        width={width}
      />
    </CusLink>
  );

  return <>{logo}</>;



}
