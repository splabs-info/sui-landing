import { Box, Divider, styled, Typography } from '@mui/material';
import useResponsive from 'hooks/useResponsive';
import { TitleSection } from './TitleSection';
import React from 'react';
import { SuiContext } from 'provider/SuiProvider';
import { useWallet } from '@suiet/wallet-kit';
import { Link } from 'react-router-dom';

const investmentCertificate =
    '0xe5bad555746563f1429f651a0dc79d47f0cbf68a84349e85ea7882bcd18cda4f::launchpad_presale::InvestmentCertificate';

const StyledMyIDOBox = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '15px',
    padding: '30px 75px',
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #00C5D3',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        padding: '24px 48px',
    },
}));

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    fontSize: '16px',
    lineHeight: '23px',
    textAlign: 'center',
    color: 'white',
}));

const StyledLink = styled('a')(({ theme }) => ({
    '&:hover': {
        color: 'rgba(0, 229, 255, 0.2)',
    },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    height: 80,
    borderColor: 'rgba(0, 229, 255, 0.2)',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: 12,
        marginBottom: 16,
    },
}));

const StyledInfoBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    width: '100%',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));

export const MyIDOArea = () => {
    const tablet = useResponsive('down', 'md');
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

            const certificateObjects = otherObjects?.data.find((item) => item?.data?.content?.type === investmentCertificate);
            if (!certificateObjects) return;

            const certificate = await provider.getObject({
                id: certificateObjects.data.objectId,
                options: { showContent: true },
            });

            const projectFields = certificate?.data?.content?.fields?.project?.fields;

            const formattedMyIdo = [
                {
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
                },
            ];
            setMyIdo(formattedMyIdo);
        };

        fetchData();
    }, [provider, wallet?.address, wallet?.connected]);

    console.log('ido', myIdo);
    return (
        <Box sx={{ marginBottom: 12 }}>
            <TitleSection title="MY IDO PARTICIPATED" />
            <StyledMyIDOBox>
                {myIdo?.length > 0 ? (
                    <>
                        {myIdo?.map((item, index) => (
                            <>
                                <StyledInfoBox>
                                    <StyledTitleInfo>No</StyledTitleInfo>
                                    <StyledInfo>{index}</StyledInfo>
                                </StyledInfoBox>

                                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                                <StyledInfoBox>
                                    <StyledTitleInfo>Project</StyledTitleInfo>
                                    <StyledInfo>{item?.name}</StyledInfo>
                                </StyledInfoBox>
                                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                                <StyledInfoBox>
                                    <StyledTitleInfo>Round name</StyledTitleInfo>
                                    {/* <StyledInfo>30,000 ADK</StyledInfo> */}
                                    <StyledInfo>OG round</StyledInfo>
                                </StyledInfoBox>

                                <StyledDivider orientation={tablet ? '' : 'vertical'} />

                                <StyledInfoBox>
                                    <StyledTitleInfo>View on explore</StyledTitleInfo>
                                    <StyledLink
                                        href="https://suiexplorer.com/address/0xc299f92f7f460165a31a87630ee71ce1386deeaf65bf72da3eb4c572b3a1142c?network=mainnet"
                                        target="_blank"
                                    >
                                        View
                                    </StyledLink>
                                </StyledInfoBox>
                            </>
                        ))}
                    </>
                ) : (
                    <StyledInfoBox>
                        <StyledTitleInfo>It appears that you have not joined any IDOs at this time.</StyledTitleInfo>

                    </StyledInfoBox>
                )}
            </StyledMyIDOBox>
        </Box>
    );
};
