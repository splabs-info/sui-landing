import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { Pool } from 'components/ido/Pool';
import { PoolInformation } from 'components/ido/PoolInfo';
import { ProjectInfo } from 'components/ido/Project';
export default function Staking() {
    return (
        <Page title="IDO">
            <SectionBox
                sx={{
                    backgroundImage: "url('/MyPage.png')",
                    minHeight: '100vh',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <Container maxWidth="xl">
                    <Pool />
                    <PoolInformation />
                    <ProjectInfo />
                </Container>
            </SectionBox>
        </Page>
    );
}
