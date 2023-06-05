import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { Pool } from 'components/ido-detail/Pool';


export default function TXUI() {
    return (
        <Page title="TXUI">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                }}
            >
                <Container maxWidth="xl">
                    <Pool />
                </Container>
            </SectionBox>
        </Page>
    );
}
