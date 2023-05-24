import { Box, LinearProgress, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { styled } from '@mui/material/styles';
import React from 'react';
import { ethers } from 'ethers';
import { SuiContext } from 'provider/SuiProvider';

const StyledProcessBox = styled(Box)(({ theme }) => ({
    background:
        'linear-gradient(178.73deg, rgba(104, 229, 184, 0.2) 0%, rgba(109, 133, 218, 0.2) 100%)',
    padding: '56px 40px',
    color: 'white',
    borderRadius: 10,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
    position: 'relative',
    marginTop: 32,
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    background: 'linear-gradient(270deg, #00C5D3 0%, #42EECF 100%)',
    borderRadius: 32,
    height: 24,
    boxShadow: '0px 0px 10px 2px rgba(152, 255, 230, 0.7)',
}));

const StyledExchangeRate = styled(Box)(({ theme }) => ({
    position: 'absolute',
    background:
        'linear-gradient(178.73deg, rgba(32, 123, 191, 1) 2.08%, rgba(74, 148, 203, 1)  32.81%, rgba(92, 186, 242, 1) 100%)',
    color: 'white',
    fontSize: 18,
    borderRadius: 10,
    padding: '7px 18px',
    fontWeight: 'bold',
    top: -20,
    right: 16,
}));

export const ProcessBox = () => {
    const [ratio, setRadio] = React.useState();
    const [round, setRound] = React.useState();
    const [currentParticipants, setParticipants] = React.useState();
    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);
    React.useEffect(() => {
        if (!wallet?.address) return;
        else {
            (async () => {
                // If coin type is not specified, it defaults to 0x2::sui::SUI
                const txn = await provider.getObject({
                    id: '0xe9e2a6278c49d2628493ee6bbb8663f6c37aab41435b75e44f83494040adabaf',
                    // fetch the object content field
                    options: { showContent: true },
                });

                const round = txn?.data?.content?.fields;
                setRound(round);
                const participants = round?.participants?.fields?.contents.length;
                setParticipants(participants);

                const suiRatio = ethers.utils.formatUnits(
                    round?.payments?.fields.contents[0]?.fields?.value?.fields.ratio_per_token,
                    9
                );
                setRadio(suiRatio);
            })();
        }
    }, [provider, wallet?.address]);

    return (
        <StyledProcessBox>
            <StyledExchangeRate>{`1 SUA = ${ratio} SUI`}</StyledExchangeRate>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 1.5,
                }}
            >
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    Process
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {`Current Participants : ${currentParticipants}`}
                </Typography>
            </Box>

            <StyledLinearProgress
                variant="determinate"
                component="p"
                value={round ? round?.total_sold / round?.total_supply : 0}
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 1.5,
                }}
            >
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {round ? `${round?.total_sold / round?.total_supply} %` : 'Loading'}
                </Typography>
                <Typography sx={{ fontSize: 14, lineHeight: '24px', color: 'white' }}>
                    {round
                        ? `${ethers.utils.formatUnits(
                              round?.total_sold,
                              9
                          )} / ${ethers.utils.formatUnits(round?.total_supply, 9)} `
                        : 'Loading'}
                </Typography>
            </Box>
        </StyledProcessBox>
    );
};
