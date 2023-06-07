import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';

const ContainerPartner = styled(Box)(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gap: '1rem',
    gridTemplateColumns: 'repeat(5, 1fr)',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
    },
    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
}));

const CustomLogo = styled('img')(() => ({
    transition: 'transform 150ms ease-in-out',
    padding: 0,
    display: 'block',
    '&:hover': {
        transform: 'scale(1.05)',
    },
}));

const partners = [
    {
        label: 'okx',
        link: 'https://www.okx.com/',
    },
    {
        label: 'okx-wallet',
        link: 'https://www.okx.com/web3',
    },
    {
        label: 'bitkeep',
        link: 'https://bitkeep.com/',
    },
    {
        label: 'move-studio-ide',
        link: 'https://www.movestudio.dev/',
    },
    {
        label: 'scallop',
        link: 'https://www.scallopx.com/',
    },
    {
        label: 'movement',
        link: '/',
    },
    {
        label: 'releap',
        link: 'https://releap.xyz/',
    },
    {
        label: 'bc-vs',
        link: 'https://blockvision.org/',
    },
    {
        label: 'bv-name',
        link: 'https://turbos.finance/',
    },
    {
        label: 'suins',
        link: 'https://suins.io/',
    },
    {
        label: 'interest',
        link: 'https://interestprotocol.io/',
    },
];

export default function Partner() {
    return (
        <Container maxWidth={'xl'}>
            <Box mb={20}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography>Partner</Typography>
                        <TypographyGradient></TypographyGradient>
                    </TitleBox>
                </Box>
                <ContainerPartner mt={10}>
                    {partners.map((partner, index) => (
                        <a
                            href={partner.link}
                            target="_blank"
                            rel="noreferrer"
                            key={index}
                            style={{
                                background: "url('/images/home/new-frame.svg')",
                                backgroundSize: '100% 100%',
                                margin: '0.1rem',
                                backgroundRepeat: 'no-repeat',
                                padding: '1rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                minHeight: '130px',
                            }}
                        >
                            <CustomLogo src={`./images/partners/${partner.label}.svg`} alt={partner.label} />
                        </a>
                    ))}
                </ContainerPartner>
            </Box>
        </Container>
    );
}
