
import { Box, Container, Grid, Stack, Typography, } from "@mui/material";
import { CenterBox, CompletedPoolsBox, CompletedPoolsChildBox, ImgTitleBox, SectionBox, TextTypography, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import { Background } from "../../constant/styled";
import CustomSlider from "../common/CustomSlider";

const platforms = [
  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
    totalRaise: '237,497.44 USDT',
    maximum: '1,939.85 USDT',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
    totalRaise: '237,497.44 USDT',
    maximum: '1,939.85 USDT',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
    totalRaise: '237,497.44 USDT',
    maximum: '1,939.85 USDT',
  },

  {
    label: "A Platform",
    description: "A is the easiest and fastest approach for developers who want to experiment with Web3, enabling the addition of blockchain features to their games in a few minutes without any Web3 knowledge.",
    minAllocation: '0.01',
    maxAllocation: 'TBA',
    access: 'Public',
    totalRaise: '237,497.44 USDT',
    maximum: '1,939.85 USDT',
  },
];

export default function CompletePools() {

  return (
    <SectionBox
      sx={{
        backgroundImage: "url('/images/background/homebg5.jpg')",
      }}>
      <Container maxWidth={"xl"}>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src='/images/home/shape.png' alt="" />
          <TitleBox>
            <Typography> Previous</Typography>
            <TypographyGradient>
              Pools
            </TypographyGradient >
          </TitleBox>
        </Box>
        <Grid container spacing={7} mt={4}>
          {platforms.map((platform, index) => (
            <Grid item key={index} md={6} xs={12} minHeight={'100%'}>
              <CompletedPoolsBox>
                <Box sx={{
                  position: 'absolute',
                  top: '-16px', right: 16, padding: '4px 16px ',
                  borderRadius: '10px', background: Background.gradientDarkBlue,
                  zIndex: 2,
                }}>
                  <TextTypography variant="body1" fontSize={'0.9rem'}>1 BNB = 0,017 ATK</TextTypography>
                </Box>

                <CompletedPoolsChildBox className="CompletedPoolsChild">
                  <CenterBox className="ImgBox" width={'45%'} sx={{ justifyContent: 'flex-start' }} >
                    <img
                      src={`./images/pools/pools-${index + 5}.jpg`}
                      alt={platform.label}
                    />
                  </CenterBox>
                  <CenterBox className="TextBox" width={'65%'} flexDirection={'column'} sx={{ alignItems: 'flex-start', paddingLeft: '1rem' }}>
                    <TextTypography variant="body1" mt={2}>  {platform.label}</TextTypography>
                    <TextTypography variant="body1" mt={1} fontSize={'0.9rem'}> {platform.description}</TextTypography>
                  </CenterBox>
                </CompletedPoolsChildBox>

                <Box className="CompletedPoolsChild-2" sx={{
                  padding: '24px',
                  display: "inline-flex",
                  borderRadius: '1rem',
                  width: '100%',
                }}>
                  <CenterBox width={'50%'} flexDirection={'column'} sx={{ alignItems: 'flex-start', borderRight: '1px solid white' }} >
                    <TextTypography variant="body1" mt={1} fontSize={'0.9rem'}> Total Raise</TextTypography>
                    <TextTypography variant="body1" mt={0.5} fontSize={'1.125rem'} fontWeight={'bold'}> {platform.totalRaise}</TextTypography>
                  </CenterBox>
                  <CenterBox width={'50%'} flexDirection={'column'} sx={{ alignItems: 'flex-start', paddingLeft: '2rem' }}>
                    <TextTypography variant="body1" mt={1} fontSize={'0.9rem'}>
                      Maximum: <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}> {platform.maximum}</span>
                    </TextTypography>
                    <TextTypography variant="body1" mt={0.5} fontSize={'0.9rem'}>
                      Access: <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>{platform.access}</span>
                    </TextTypography>
                  </CenterBox>
                </Box>
              </CompletedPoolsBox>

              <CustomSlider
                color={Background.gradientLightViolet}
                background="#112A45"
                disabledBorder={false}
                disabledMark={true}
                value={9500000}
                max={9500000}
                height={14}
                title={
                  <Stack
                    color="#fff"
                    direction="row"
                    justifyContent="space-between"
                  >
                    <TextTypography variant="body1" fontSize={'0.9rem'}>Progress</TextTypography>
                    <TextTypography variant="body1" fontSize={'0.9rem'}>Max Participants: 4527</TextTypography>
                  </Stack>
                }
              />
              <Stack
                color="#fff"
                direction="row"
                justifyContent="space-between"
              >
                <TextTypography variant="body1" fontSize={'0.9rem'}> 100% </TextTypography>
                <TextTypography variant="body1" fontSize={'0.9rem'}> 9500000/9500000 ATK</TextTypography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionBox>
  );
}
