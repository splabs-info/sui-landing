import { Box, Container, Grid, InputBase, Stack, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { GradientButton } from 'components/common/CustomButton';
import Page from 'components/common/Page';
import {
  ButtonTitleBox,
  FrameButton,
  ImgTitleBox,
  SectionBox,
  TitleBox,
  TypographyGradient,
} from 'components/home/HomeStyles';
import { StyledMyIDOBox } from 'components/my-profile/MyINO';
import useResponsive from 'hooks/useResponsive';
import { BoxGradientOpacity, UtilityBox } from 'modules/staking/component/StackingStyles';

export default function SuggestionPage() {
  const isMobile = useResponsive('down', 'sm');
  const wallet = useWallet();
  return (
    <Page title="Suggestion">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/homebg56.png')",
          paddingTop: isMobile && 5,
        }}
      >
        <Box
          component={'img'}
          src="/images/background/bg-governance.png"
          sx={{
            position: 'absolute',
            width: '100%',
            mixBlendMode: 'lighten',
            top: isMobile ? 120 : -120,
          }}
        />
        <Container maxWidth={'lg'}>
          <Box mt={5}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box mb={5} mt={15} position="relative">
                  <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" sx={{ top: '-40px' }} />
                  <TitleBox>
                    <TypographyGradient>SUGGESTION</TypographyGradient>
                  </TitleBox>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <UtilityBox sx={{ p: 5 }}>
                  <Typography color="#fff">
                    Describe your proposal for the community. Once submitted, the proposal cannot be edited, so please
                    review all the details before submitting. The voting period will be determined by project team
                    Please read the document on YouSUI Whitepaper to propose a custom action.
                  </Typography>
                </UtilityBox>
              </Grid>
              <Grid item xs={12}>
                <StyledMyIDOBox sx={{ display: 'block', p: 5 }}>
                  <TypographyGradient variant="h6">Define your suggestion</TypographyGradient>
                  <InputBase
                    fullWidth
                    sx={{ background: 'rgba(0, 0, 0, 0.5)', height: 50, p: 2, borderRadius: 1, color: '#fff', mt: 3 }}
                    placeholder="Input here"
                  />
                </StyledMyIDOBox>
              </Grid>
              <Grid item md={8} xs={12}>
                <StyledMyIDOBox sx={{ display: 'block', p: 5 }}>
                  <TypographyGradient variant="h6">My Wallet Address</TypographyGradient>
                  <Stack direction={isMobile ? 'column' : 'row'} alignItems={'center'} mt={3}>
                    <InputBase
                      fullWidth
                      sx={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        height: 50,
                        p: 2,
                        borderRadius: 1,
                        color: '#fff',
                        mr: 2,
                        textAlign: 'center',
                      }}
                      placeholder="Input here"
                      value={wallet.address}
                    />
                    <GradientButton sx={{ width: 'fit-content', mt: isMobile ? 2 : 0 }}>Connect wallet</GradientButton>
                  </Stack>
                </StyledMyIDOBox>
              </Grid>
              <Grid item md={4} xs={12}>
                <BoxGradientOpacity sx={{ p: isMobile ? 2 : 0, borderRadius: '15px' }}>
                  <Stack direction={'row'} justifyContent={'center'} alt="" alignItems={'center'} height={'100%'}>
                    <img src={'/images/suggestion-token.png'} width={80} />
                    <Box color="#fff" textAlign={'center'} ml={5}>
                      <Typography variant="h6">wXUI balance</Typography>
                      <Typography variant="h3">0</Typography>
                    </Box>
                  </Stack>
                </BoxGradientOpacity>
              </Grid>
              <Grid item xs={12}>
                <StyledMyIDOBox sx={{ display: 'block', p: 5 }}>
                  <TypographyGradient variant="h6">Suggestion</TypographyGradient>

                  <InputBase
                    fullWidth
                    sx={{ background: 'rgba(0, 0, 0, 0.5)', p: 2, borderRadius: 1, color: '#fff', mt: 3, paddingBottom: 30 }}
                    placeholder="Input here"
                  />
                </StyledMyIDOBox>
              </Grid>
              <Grid item xs={12}>
                <Stack direction={'row'}>
                  <img src="/images/home/shape.png" alt="" width={30} />
                  <Typography color={'#fff'}>
                    To submit a proposal, you must have a minimum balance of at least{' '}
                    <span style={{ fontWeight: 900 }}>100,000 wXUI</span> tokens in your wallet.
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <FrameButton sx={{ margin: 'auto' }}>Submit</FrameButton>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </SectionBox>
    </Page>
  );
}
