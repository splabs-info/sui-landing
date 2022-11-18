import { Box, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
// import { Link as RouterLink } from 'react-router-dom';
import Logo from "../components/Logo";
import Page from "../components/Page";
import useResponsive from "../hooks/useResponsive";
import { LoginForm } from "../sections/auth/login";

// ----------------------------------------------------------------------

const RootStyle = styled("div")(({ theme }) => ({
  backgroundImage: "url(/images/login/bgLogin.jpg)",
  backgroundSize: "100% 100%",
  backgroundRepeat: "no-repeat",
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const LogoBox = styled("div")(({ theme }) => ({
  "& a": {
    display: "flex",
    justifyContent: "center",
    margin: "2rem",
  },
}));
const CusGrid = styled(Grid)(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexDirection: "row",
  padding: theme.spacing(12, 0),
  [theme.breakpoints.down("sm")]: {
    justifyContent: "center",
    flexDirection: "column",
  },
}));

// ----------------------------------------------------------------------

export default function Login() {
  const isMobile = useResponsive("down", "sm");

  return (
    <Page title="Login">
      <RootStyle>
        <Container maxWidth="xl">
          <CusGrid container>
            <Grid item md={7} sm={6} xs={0} zIndex={1}>
              <Box
                component={"img"}
                src="/images/logo.png"
                sx={{ display: isMobile ? "none" : "block" }}
              />
            </Grid>
            <Grid item md={3} sm={4} xs={12} zIndex={2}>
              <LogoBox>
                <Logo sx={{ mb: 2, minHeight: "65px" }} />
              </LogoBox>
              <LoginForm />
            </Grid>
          </CusGrid>
        </Container>
      </RootStyle>
    </Page>
  );
}
