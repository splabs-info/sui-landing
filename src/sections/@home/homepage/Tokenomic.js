import {
  Box,
  Container,
  Grid,
} from "@mui/material";
// import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import useResponsive from "../../../hooks/useResponsive";
import BasicTable from "../../../components/home/tokenomic"
import { TitleBox, TypographyGradient } from "../../../components/home/HomeStyles";



export default function Tokenomic() {
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  const isDesktop = useResponsive("up", "md");

  return (
    <Box position="relative" >
      <Container>
        <TitleBox>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3.5rem' : '2rem',
            fontFamily: "SVN-Gilroy-heavy",
          }}>
            Tokenomics
          </TypographyGradient>
        </TitleBox>
        <Grid
          container
          alignItems="center"
          justifyContent="space-around"
        >
          <Grid item xs={isDesktop ? 7 : 12}>
            <a href="/" target="_blank" rel="noreferrer" >
              <img alt="tokenomics" style={{ width: "100%", margin: isDesktop ? "auto" : "0rem auto 3rem" }} src="/images/home/tokenomics.png" />
            </a>
          </Grid>
          <Grid item xs={isDesktop ? 5 : 12} sx={{ position: "relative", top: !isDesktop ? "0" : "-1rem" }}>
            <BasicTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


