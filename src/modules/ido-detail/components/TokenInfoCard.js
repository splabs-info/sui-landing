import { Box, Divider, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPoolCard = styled(Box)(({ theme }) => ({
    background: 'linear-gradient(0deg,rgba(66,238,207,0.12),rgba(0,197,211,0.12) 70%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '24px',
    padding: 40,
    height: 380,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
}));

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

const tokenContent = [
    {
        title: "Name",
        content: "SUA TOKEN"
    },
    {
        title: "Symbol",
        content: "SUA"
    },
    {
        title: "Decimals",
        content: "9"
    },
    {
        title: "Address",
        content: "0xe5bad555...cd18cda4f::sua::SUA"
    },
    {
        title: "Round Allocation",
        content: "1,000"
    }
]

export const TokenInformationCard = () => {
    return (
        <StyledPoolCard>
            <StyledStack direction="column" alignItems="center" spacing={3} divider={<StyledDivider flexItem />}>
                {tokenContent.map((item, index) => (
                    <StyledItemStack key={index}>
                        <StyledTitleInfo>{item.title}</StyledTitleInfo>
                        <StyledInfo>{item.content}</StyledInfo>
                    </StyledItemStack>
                ))}
            </StyledStack>
        </StyledPoolCard>
    );
};
