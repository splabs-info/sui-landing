import { SectionBox } from 'components/home-v2/HomeStyles';
import Page from '../components/common/Page';
import {
    StakingPools,
    Ecosystem,
    Intro,
    Launchpad,
    Overview,
    Questions,
    StakingTier,
    UpcomingPools, Partner
} from '../components/home-v2';
export default function Homepage_v2() {
    return (
        <Page title="Home">
            <Intro />
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg2.png')", }}>
                <Overview />
                <Ecosystem />
                <Launchpad />
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg3.png')", }}>
                <Questions />
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg4.png')", }}>
                <StakingPools />
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg5.png')", }}>
                <StakingTier />
            </SectionBox>
            <SectionBox sx={{ backgroundImage: "url('/images/background/homebg6.png')", }}>
                <UpcomingPools />
                <Partner />
            </SectionBox>
        </Page>
    );
}
