import {
  Box,
  Container,
  Grid,
} from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { TitleBox, TypographyGradient } from "./HomeStyles";
import TokenomicTable from "./TokenomicTable";



export default function Tokenomic() {
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
          <Grid item xs={isDesktop ? 7 : 12} pr={5}>
            <a href="/" target="_blank" rel="noreferrer" >
              <img alt="tokenomics" style={{ width: "100%", margin: isDesktop ? "auto" : "0rem auto 3rem" }} src="/images/home/tokenomics.png" />
            </a>
          </Grid>
          <Grid item xs={isDesktop ? 5 : 12} sx={{ position: "relative", top: !isDesktop ? "0" : "-1rem" }}>
            <TokenomicTable />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}


