import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@suiet/wallet-kit';
import { ethers } from 'ethers';
import { SuiContext } from 'provider/SuiProvider';
import React from 'react';
import { PoolInfoBox } from './IDODetailStyled';

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
    fontWeight: 'normal',
    color: 'white',
    fontSize: 18,
    lineHeight: '20px',
    // textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
    fontSize: 18,
    lineHeight: '20px',
    color: 'white',
    fontWeight: 'bold',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
    width: '100%',
    borderColor: 'rgba(255, 255, 255, 0.2)',
}));

const StyledStack = styled(Stack)(({ theme }) => ({
    width: '100%',
    marginBottom: 16,
}));

const StyledItemStack = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
}));

export const PoolInformationCard = () => {
    const [round, setRound] = React.useState();
    // const [roundDetail, setRoundDetail] = React.useState();
    // const [project, setProject] = React.useState();
    // const [joined, setJoined] = React.useState([]);
    const wallet = useWallet();
    const { provider } = React.useContext(SuiContext);

    React.useEffect(() => {
        if (!wallet?.address) return;
        else {
            (async () => {
                // If coin type is not specified, it defaults to 0x2::sui::SUI
                const txn = await provider.getObject({
                    id: '0x7046ccb488f43e262cf3cf12b94caffda865c987f7229ae4de2f038566c102f8',
                    // fetch the object content field
                    options: { showContent: true },
                });

                const round = txn?.data?.content?.fields;
                setRound(round);

                const projectInfo = txn?.data?.content?.fields?.project?.fields;
                const joinedAddresses = txn.data.content.fields.participants.fields.contents;

                // setProject(projectInfo);
                // setJoined(joinedAddresses);
            })();
        }
    }, [provider, wallet?.address]);

    // const poolContent = [
    //     {
    //         title: 'Token Distribution',
    //         content: 'Date UTC',
    //     },
    //     {
    //         title: 'Min. Purchase',
    //         content: '250 USD',
    //     },
    //     {
    //         title: 'Max. Allocation',
    //         content: '10,000 USD',
    //     },
    //     {
    //         title: 'Token Price',
    //         content: '4 XUI = 1 USD',
    //     },
    //     {
    //         title: 'Access Type',
    //         content: 'Public',
    //     },
    // ];
    return (
        <PoolInfoBox>
            <StyledStack direction="column" alignItems="center" spacing={3} divider={<StyledDivider flexItem />}>
                <StyledItemStack>
                    <StyledTitleInfo>Token Distribution</StyledTitleInfo>
                    <StyledInfo>50,000 SUA</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Min. Purchase</StyledTitleInfo>
                    <StyledInfo>{round ? ethers.utils.formatUnits(round?.min_purchase, 9) : 'Loading'} SUA</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Max. Purchase</StyledTitleInfo>
                    <StyledInfo>{round ? ethers.utils.formatUnits(round?.max_per_user, 9) : 'Loading'} SUA</StyledInfo>
                </StyledItemStack>
                <StyledItemStack>
                    <StyledTitleInfo>Token Price</StyledTitleInfo>
                    <StyledInfo>0.08</StyledInfo>
                </StyledItemStack>

                <StyledItemStack>
                    <StyledTitleInfo>Access Type</StyledTitleInfo>
                    <StyledInfo>Publish</StyledInfo>
                </StyledItemStack>
            </StyledStack>
        </PoolInfoBox>
    );
};
