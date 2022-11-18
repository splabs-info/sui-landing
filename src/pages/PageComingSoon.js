import { Link, Link as RouterLink } from "react-router-dom";
// @mui
import { styled } from "@mui/material/styles";
import { Button, Container, Box } from "@mui/material";
// components
import Page from "../components/Page";
import "./../styles/Animation.css";
import useResponsive from "../hooks/useResponsive";

// ----------------------------------------------------------------------

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 900,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));
const ButtonCustom = styled(Button)(({ theme }) => ({
  padding: "0rem 1.5rem",
  border: "2px solid #185286",
  borderRadius: "1.5rem",
  margin: "0.2rem 0.5rem",
  background: "rgba(28,56,87,0.5)",
  color: "white",
  fontWeight: "bold",
  marginTop: "1rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
  },
  "&:hover": {
    background: "rgba(28,56,87,1)",
  },
  "& img": {
    height: "50px",
  },
}));
// ----------------------------------------------------------------------

export default function PageComingSoon() {
  const isMobile = useResponsive("down", "sm");
  const isDesktop = useResponsive("up", "md");
  return (
    <Page title="Coming Soon">
      <Box
        sx={{
          background: "url('/images/comingsoon/bg.jpg')",
          backgroundSize: isDesktop ? "100% 100%" : "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: isMobile && "-375px",
        }}
      >
        <Container>
          <ContentStyle sx={{ textAlign: "center", alignItems: "center" }}>
            <Box
              mt={2}
              mb={1}
              sx={{
                "& a": {
                  color: "#0a0a0a",
                  textDecoration: "none",
                },
              }}
            >
              <Link to="/">
                <Box
                  component={"img"}
                  src="/logo.png"
                  width={170}
                  className="animate__animated animate__fadeInDown"
                />
              </Link>
            </Box>
            <Box
              component={"img"}
              src="/images/comingsoon/coming.png"
              width={"90%"}
              className="animate__animated animate__zoomIn"
            />
            <Box
              component={"img"}
              src="/images/comingsoon/plane.png"
              sx={{
                position: "fixed",
                top: "10vh",
                right: "15vw",
              }}
              className="animate__animated animate__fadeInRight animate__delay-1s"
            />
            <Box
              component={"img"}
              src="/images/comingsoon/mainimg.png"
              width={"90%"}
              className="animate__animated animate__zoomIn"
            />
            <Box className="animate__animated animate__fadeInUp animate__delay-1s">
              <ButtonCustom
                to="/"
                size="large"
                variant="contained"
                component={RouterLink}
              >
                Go to Home
              </ButtonCustom>
            </Box>
          </ContentStyle>
        </Container>
      </Box>
    </Page>
  );
}
