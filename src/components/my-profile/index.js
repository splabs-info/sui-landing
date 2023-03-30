import { Container, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';

const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));
export default function MyInfo() {
  const [openCreateProfile, setOpenCreateProfile] = React.useState();
  const isDesktop = useResponsive('up', 'sm');

  const handleOpen = () => {
    setOpenCreateProfile(true);
  };

  return (
    <>
      <SectionBox
        sx={{
          backgroundImage: "url('/MyPage.png')",
          minHeight: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          paddingTop: !isDesktop && 5,

        }}
      >
        <Container maxWidth={'xl'} >
          <Stack direction="column">
            <StyledResponsiveStack direction="row" sx={{ marginBottom: 12 }}>
              <AreaInformation onOpen={handleOpen} />
              <OverviewTabs />
            </StyledResponsiveStack>

            <Stack direction="column">
              <Stack
                direction="row"
                sx={{ marginBottom: 12, flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <IDOParticipated />
                <CurrentStakingPool />
              </Stack>

              <StakingBalance />
              <MyIDOArea />
              <MyINOArea />
              <ClaimAvailable />
            </Stack>
          </Stack>
        </Container>
      </SectionBox>
      <CreateProfilePopup open={openCreateProfile} handleClose={setOpenCreateProfile} />
    </>
  );
}
