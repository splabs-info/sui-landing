import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
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


const poolContent = [
    {
        title: "Token Distribution",
        content: "Date UTC"
    },
    {
        title: "Min. Allocation",
        content: "250 USD"
    },
    {
        title: "Max. Allocation",
        content: "10,000 USD"
    },
    {
        title: "Token Price",
        content: "4 XUI = 1 USD"
    },
    {
        title: "Access Type",
        content: "Public"
    }
]

export const PoolInformationCard = () => {
    return (
        <PoolInfoBox>
            <StyledStack direction="column" alignItems="center" spacing={3} divider={<StyledDivider flexItem />}>
                {poolContent.map((item, index) => (
                    <StyledItemStack key={index}>
                        <StyledTitleInfo>{item.title}</StyledTitleInfo>
                        <StyledInfo>{item.content}</StyledInfo>
                    </StyledItemStack>
                ))}
            </StyledStack>
        </PoolInfoBox>
    );
};
