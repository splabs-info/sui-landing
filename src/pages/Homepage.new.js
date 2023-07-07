import { SectionBox } from 'components/home/HomeStyles';
import Page from '../components/common/Page';
import {
  StakingPools,
  Ecosystem,
  Intro,
  Launchpad,
  Overview,
  Questions,
  StakingTier,
  UpcomingPools,
  Partner,
} from '../components/home';
import { Box } from '@mui/material';
export default function Homepage_v2() {
  return (
    <Page title="All-In-One Platform">
      <Box
        sx={{
          backgroundImage: "url('/images/background/homepage-bg-full.png')",
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
      >
        <Intro />
        <SectionBox>
          <Overview />
          <Ecosystem />
          <Launchpad />
        </SectionBox>
        <SectionBox>
          <Questions />
        </SectionBox>
        <SectionBox>
          <StakingPools />
        </SectionBox>
        <SectionBox>
          <StakingTier />
        </SectionBox>
        <SectionBox>
          <UpcomingPools />
          <Partner />
        </SectionBox>
      </Box>
    </Page>
  );
}
