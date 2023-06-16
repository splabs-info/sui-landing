import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';

export default function IDORound() {

    return (
        <Page title="IDO - Round">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg56.png')",
                }}
            >
                <Container maxWidth="lg">

                </Container>
            </SectionBox>
        </Page>
    );
}
