import Page from '../components/common/Page';
import {
    CompletePools,
    Intro,
    Launchpad,
    Overview,
    Questions,
    StakingTier,
    UpcomingPools,
} from '../components/home-v2';
import { Partner } from 'components/home';
export default function Homepage_v2() {
    return (
        <Page title="Home">
            <Intro />
            <Overview />
            <Launchpad />
            <Questions />
            <CompletePools />
            <StakingTier />
            <UpcomingPools />
            <Partner />
        </Page>
    );
}
