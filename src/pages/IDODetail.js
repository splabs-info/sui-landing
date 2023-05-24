import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { Pool } from 'components/ido-detail/Pool';
import { PoolInformation } from 'components/ido-detail/PoolInfo';
import { ProjectInfo } from 'components/ido-detail/Project';
import React from 'react';

export default function IDODetail() {

    return (
        <Page title="IDO - Detail">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
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
