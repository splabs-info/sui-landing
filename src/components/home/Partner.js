import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { ImgTitleBox, SectionBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { useSelector } from 'react-redux';
import useResponsive from '../../hooks/useResponsive';

const ContainerPartner = styled(Box)(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridTemplateColumns: 'repeat(5, 1fr)',
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
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
    // {
    //     label: 'POLYGONSTUDIO',
    //     link: 'https://polygonstudios.com/',
    // },
    // {
    //     label: 'POLYGON',
    //     link: 'https://polygon.technology/',
    // },
    // {
    //     label: 'BITKEEP_P',
    //     link: 'https://bitkeep.com/',
    // },
    // {
    //     label: 'BLOCKWIZ',
    //     link: 'https://blockwiz.com/',
    // },
    // {
    //     label: 'DWF',
    //     link: 'https://www.dwf-labs.com/',
    // },
    // {
    //     label: 'Kross',
    //     link: 'https://www.krosslab.io/',
    // },
    // {
    //     label: 'NFTB',
    //     link: 'https://nftb.io/',
    // },
    // {
    //     label: 'CHAINLINK',
    //     link: 'https://chain.link/',
    // },
    // {
    //     label: 'chaindustry',
    //     link: 'https://www.chaindustry.io/',
    // },
    // {
    //     label: 'CLS',
    //     link: 'https://www.cls.global/',
    // },
    // {
    //     label: 'nslogo',
    //     link: 'http://www.nsstudio.co.kr/',
    // },
    // {
    //     label: 'Kiaydice',
    //     link: 'https://klaydice.io/',
    // },
    // {
    //     label: 'kaikas',
    //     link: 'https://docs.kaikas.io/',
    // },
    // {
    //     label: 'SOKEN',
    //     link: 'https://soken.io/',
    // },
    // {
    //     label: 'Houbi-NFT',
    //     link: 'https://tmg35s.d1verse.io/#/home',
    // },
    // {
    //     label: 'tofu',
    //     link: 'https://tofunft.com/',
    // },
    // {
    //     label: 'SIGNVM',
    //     link: 'https://www.signvm.io/',
    // },
    // {
    //     label: 'MK',
    //     link: 'https://game.mk.co.kr/',
    // },
    // {
    //     label: 'MOON-KNIGHT',
    //     link: 'https://moonknightlabs.com/',
    // },
    // {
    //     label: 'Gramming',
    //     link: 'https://www.p-gramming.com/main/main.php',
    // },
    // {
    //     label: 'GAMETREE',
    //     link: 'https://gametree.me/',
    // },
    // {
    //     label: 'gate-io',
    //     link: 'https://www.Sui.io/',
    // },
    // // {
    // //   label: 'gate-labs',
    // //   link: 'https://www.Sui.io/',
    // // },
    // {
    //     label: 'Pixel',
    //     link: 'https://www.pixelplay.com/',
    // },
    // {
    //     label: 'Linx',
    //     link: '/',
    // },
    // {
    //     label: 'Sunmiya',
    //     link: 'https://sunmiya.club/',
    // },
    // {
    //     label: 'sotatek',
    //     link: 'https://www.sotatek.com/',
    // },
    // {
    //     label: 'Natus-Alien-Club',
    //     link: 'https://natusalienclub.com/',
    // },
    // {
    //     label: 'Teddybear-Labs',
    //     link: 'https://teddybearlabs.io/',
    // },
    // {
    //     label: 'Aquapnix',
    //     link: 'https://aquapnix.com/',
    // },
    // {
    //     label: 'Game-on',
    //     link: 'https://gameon.vc/',
    // },
    // {
    //     label: 'Parable',
    //     link: 'https://parable-asia.com/',
    // },
    // {
    //     label: 'EARNBOX',
    //     link: '/',
    // },
    // {
    //     label: 'Travel-Tracks',
    //     link: 'https://traveltracks.com.vn/',
    // },
    // {
    //     label: '8_FINANCE',
    //     link: 'https://8.finance/',
    // },
    // {
    //     label: 'KATA_1',
    //     link: 'https://www.kata.or.kr/v2/',
    // },
    // {
    //     label: 'Influencer',
    //     link: 'https://www.itfluencer.co.kr/',
    // },
    // {
    //     label: 'KLT',
    //     link: 'https://www.saramin.co.kr/zf_user/company-info/view/csn/SmUra3BsZ25CL2F4YmFHaTJGU1IrUT09/company_nm/Korea%20Land%20Tour%20KLT',
    // },
];

export default function Partner() {
    const isDesktop = useResponsive('up', 'md');
    const { setting } = useSelector((state) => state);
    const { library } = setting;
    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg6.png')",
            }}
        >
            <Container maxWidth={'xl'} sx={{ my: 10 }}>
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
                                background: "url('/images/home/frame-partner.png')",
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
                            <CustomLogo src={`./images/partners/${partner.label}.png`} alt={partner.label} />
                        </a>
                    ))}
                </ContainerPartner>
            </Container>
        </SectionBox>
    );
}
