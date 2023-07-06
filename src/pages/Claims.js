import { Box, Container, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import ClaimTokens from 'components/claims/ClaimTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import { investCertificate } from 'constant';
import useResponsive from 'hooks/useResponsive';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { findCertificate } from 'utils/util';
// import { SocialFooter } from 'layouts/Footer-v2';
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
                    eventName: certificate?.data?.content?.fields?.event_name,
                    issue_date: certificate?.data?.content?.fields?.issue_date || '',
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


    // console.log('myIdo___', myIdo)
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
                    {!wallet?.address || !wallet?.connected ? (
                        <Typography
                            sx={{
                                margin: '240px auto 190px auto',
                                fontWeight: 'bold',
                                fontSize: 32,
                                color: 'white',
                                width: '100%',
                                textAlign: 'center',
                            }}
                        >
                            Please Connect Your Wallet Before
                        </Typography>
                    ) : (
                        <>
                            <ClaimTokens myIDOs={myIdo} />
                        </>
                    )}
                </Container>
            </SectionBox>
        </Page>
    );
}
