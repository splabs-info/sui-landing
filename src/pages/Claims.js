import { Box, Container } from '@mui/material';
import ClaimTokens from 'components/claims/ClaimTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { SuiContext } from 'provider/SuiProvider';
import { findCertificate } from 'utils/util';
import { investCertificate } from 'constant';
export default function Claims() {
    const isMobile = useResponsive('down', 'sm');
    const [myIdo, setMyIdo] = React.useState([]);

    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);

    React.useEffect(() => {
        const fetchData = async () => {
            if (!wallet?.address || !wallet?.connected) return;

            const owner = wallet?.address;

            const otherObjects = await provider.getOwnedObjects({
                owner,
                options: { showContent: true },
            });

            if (otherObjects?.data?.length === 0) return;

            const certificateObjects = findCertificate(otherObjects?.data, investCertificate);

            if (!certificateObjects) return;

            const promises = certificateObjects.map(async (item) => {
                const certificate = await provider.getObject({
                    id: item.data.objectId,
                    options: { showContent: true },
                });

                const projectFields = certificate?.data?.content?.fields?.project?.fields;

                return {
                    description: projectFields?.description || '',
                    discord: projectFields?.discord || '',
                    image_url: projectFields?.image_url || '',
                    link_url: projectFields?.link_url || '',
                    medium: projectFields?.medium || '',
                    name: projectFields?.name || '',
                    project_id: projectFields?.project_id || '',
                    telegram: projectFields?.telegram || '',
                    twitter: projectFields?.twitter || '',
                    website: projectFields?.website || '',
                };
            });

            const formattedMyIdo = await Promise.all(promises);

            setMyIdo([...formattedMyIdo]);
        };

        fetchData();
    }, [provider, wallet?.address, wallet?.connected]);

    console.log('myIdo', myIdo);
    return (
        <Page title="Claim Tokens">
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/homebg6.png')",
                    paddingTop: isMobile && 5,
                }}
            >
                <Box
                    component={'img'}
                    src="/images/background/bg-claim.png"
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        mixBlendMode: 'lighten',
                        top: isMobile ? 120 : 40,
                    }}
                />
                <Container maxWidth={'xl'}>
                    <ClaimTokens myIDOs={myIdo} />
                </Container>
            </SectionBox>
        </Page>
    );
}
