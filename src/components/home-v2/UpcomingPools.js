
import { Box, Container, Grid, Typography, } from "@mui/material";
import { ImgTitleBox, ComingPoolsBox, SectionBox, TextTypography, TitleBox, TypographyGradient, ComingPoolsChildBox, SpaceBetweenBox } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import { Background } from "../../constant/styled";
const platforms = [
  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
  },

];
export default function UpcomingPools() {
  const isDesktop = useResponsive("up", "md");
  return (
    <SectionBox pt={isDesktop ? 10 : 3} pb={isDesktop ? 5 : 3}
      sx={{
        backgroundImage: "url('/images/background/homebg4.jpg')",
      }}>
      <Container>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox>
            <Typography> Upcoming</Typography>
            <TypographyGradient>
              Pools
            </TypographyGradient >
          </TitleBox>
        </Box>
        <Grid container spacing={3} mt={4}>
          {platforms.map((platform, index) => (
            <Grid item key={index} md={3} sm={6} xs={12} minHeight={'100%'}>
              <ComingPoolsBox>
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={`./images/pools/pools-${index + 1}.jpg`}
                    alt={platform.label}
                    width={'100%'}
                  />
                  <Box sx={{
                    position: 'absolute',
                    bottom: 1, right: 1, padding: '4px 16px ',
                    borderRadius: '9px', background: Background.gradientDarkBlue
                  }}>
                    <TextTypography variant="body1" fontSize={'0.9rem'}>TBA</TextTypography>
                  </Box>
                </Box>
                <TextTypography variant="body1" mt={2}>  {platform.label}</TextTypography>
                <TextTypography variant="body1" mt={1} fontSize={'0.9rem'}> {platform.description}</TextTypography>
                <ComingPoolsChildBox className="ComingPoolsChild">
                  <SpaceBetweenBox>
                    <TextTypography>Min Allocation:</TextTypography>
                    <TextTypography>{platform.minAllocation}</TextTypography>
                  </SpaceBetweenBox>
                  <SpaceBetweenBox>
                    <TextTypography>Max:</TextTypography>
                    <TextTypography>{platform.maxAllocation}</TextTypography>
                  </SpaceBetweenBox>
                  <SpaceBetweenBox>
                    <TextTypography>Access:</TextTypography>
                    <TextTypography>{platform.access}</TextTypography>
                  </SpaceBetweenBox>
                </ComingPoolsChildBox>
              </ComingPoolsBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBox>
  );
}
