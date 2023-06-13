import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { IconDownload } from "@tabler/icons";
import CopyComponent from "components/common/CopyComponent";
import { BrandColorBox, BrandGradientColorBox, BrandKitBox, DownloadBox, DownloadButton, FontLink, SocialLink, TypographyBox } from "./wppStyled";
import { SocialBox } from "components/footer/FooterStyles";

const socialList = [
    {
        src: "/images/brandkit/icon-medium.png",
        alt: "Medium",
        href: "https://medium.com/@YouSUI",
    },
    {
        src: "/images/brandkit/icon-discord.png",
        alt: "Discord",
        href: "https://discord.gg/yousui",
    },
    {
        src: "/images/brandkit/icon-twitter.png",
        alt: "Twitter",
        href: "https://twitter.com/YouSUI_Global",
    },
]

const fullLogoList = [
    {
        src: "/images/brandkit/logo-white.png",
        title: 'logo white',
        name: 'logo-yousui-white',
        link: '/images/brandkit/downloads/logo-yousui-white.png',
    },
    {
        src: "/images/brandkit/logo-full-color.png",
        title: 'logo full color',
        name: 'logo-yousui-full-color',
        link: '/images/brandkit/downloads/logo-yousui-full-color.png',
    },
    {
        src: "/images/brandkit/logo-black.png",
        title: 'logo black',
        name: 'logo-yousui-black',
        link: '/images/brandkit/downloads/logo-yousui-black.png',
    },
]

const iconOnlyList = [
    {
        src: "/images/brandkit/icon-white.png",
        title: 'icon white',
        name: 'icon-yousui-white',
        link: '/images/brandkit/downloads/icon-yousui-white.png',
    },
    {
        src: "/images/brandkit/icon-full-color.png",
        title: 'icon full color',
        name: 'icon-yousui-full-color',
        link: '/images/brandkit/downloads/icon-yousui-full-color.png',
    },
    {
        src: "/images/brandkit/icon-black.png",
        title: 'icon black',
        name: 'icon-yousui-black',
        link: '/images/brandkit/downloads/icon-yousui-black.png',
    },
]

const wordmarkOnlyList = [
    {
        src: "/images/brandkit/wordmark-white.png",
        title: 'wordmark white',
        name: 'wordmark-yousui-white',
        link: '/images/brandkit/downloads/wordmark-yousui-white.png',
    },
    {
        src: "/images/brandkit/wordmark-black.png",
        title: 'wordmark black',
        name: 'wordmark-yousui-black',
        link: '/images/brandkit/downloads/wordmark-yousui-black.png',
    },
]

const backgroundList = [
    {
        src: "/images/brandkit/bg-yousui-1.png",
        title: 'bg-yousui-1',
        link: '/images/brandkit/downloads/bg-yousui-1.png',
    },
    {
        src: "/images/brandkit/bg-yousui-2.png",
        title: 'bg-yousui-2',
        link: '/images/brandkit/downloads/bg-yousui-2.png',
    },
    {
        src: "/images/brandkit/bg-yousui-3.png",
        title: 'bg-yousui-3',
        link: '/images/brandkit/downloads/bg-yousui-3.png',
    },
]
const brandColor = [
    {
        name: 'Cyan',
        hex: '#00F1F5',
        moreColors: [
            'rgba(0, 241, 245, 0.85)',
            'rgba(0, 241, 245, 0.65)',
            'rgba(0, 241, 245, 0.45)',
            'rgba(0, 241, 245, 0.25)',
            'rgba(0, 241, 245, 0.15)',
        ]
    },
    {
        name: 'Magenta',
        hex: '#8A92FF',
        moreColors: [
            'rgba(138, 146, 255, 0.85)',
            'rgba(138, 146, 255, 0.65)',
            'rgba(138, 146, 255, 0.45)',
            'rgba(138, 146, 255, 0.25)',
            'rgba(138, 146, 255, 0.15)',
        ]
    },
]
const fontList = [
    {
        name: 'Poppins Book',
        fontWeight: 400,
    },
    {
        name: 'Poppins SemiBold',
        fontWeight: 600,
    },
    {
        name: 'Poppins Bold',
        fontWeight: 700,
    },
    {
        name: 'Poppins ExtraBold',
        fontWeight: 800,
    },
    {
        name: 'Poppins Black',
        fontWeight: 900,
    },
]

export function BrandKit() {

    const handleDownloadImage = async (name, link, type) => {
        const imgBlob = await fetch(link)
            .then(res => res.arrayBuffer())
            .then(buf => new Blob([buf], { type: `image/${type}` }));

        const a = document.createElement('a');
        a.href = URL.createObjectURL(imgBlob);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    return (
        <BrandKitBox>

            <Typography variant="h3" color="white" fontWeight='700' mb={2}>Community</Typography>
            <Stack sx={{ flexDirection: { 'xs': 'column', 'sm': 'row' }, alignItems: 'flex-start' }}>
                {socialList.map((item, index) =>
                    <SocialLink key={index} href={item.link} target={'_blank'}>
                        <Box component="img" src={item.src} alt={item.alt} />
                        {item.alt}
                    </SocialLink>
                )}
            </Stack>

            <Typography variant="h3" color="white" fontWeight='700' mt={4} >Brand Kit</Typography>
            <Box mt={2} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Full Logo</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={2}>
                {fullLogoList.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <DownloadBox>
                            <Box component={'img'} src={item.src} alt={item.title} />
                            <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems="center" mt={2}>
                                <Typography className="title">{item.title}</Typography>
                                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'svg')}>
                                        <IconDownload size={16} />SVG
                                    </DownloadButton>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'png')}>
                                        <IconDownload size={16} /> PNG
                                    </DownloadButton>
                                </Stack>
                            </Stack>
                        </DownloadBox>
                    </Grid>
                ))}
            </Grid>

            <Box mt={6} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Icon Only</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={2}>
                {iconOnlyList.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <DownloadBox>
                            <Box component={'img'} src={item.src} alt={item.title} />
                            <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems="center" mt={2}>
                                <Typography className="title">{item.title}</Typography>
                                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'svg')}>
                                        <IconDownload size={16} />SVG
                                    </DownloadButton>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'png')}>
                                        <IconDownload size={16} /> PNG
                                    </DownloadButton>
                                </Stack>
                            </Stack>
                        </DownloadBox>
                    </Grid>
                ))}
            </Grid>

            <Box mt={6} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Wordmark Only</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={2}>
                {wordmarkOnlyList.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <DownloadBox>
                            <Box component={'img'} src={item.src} alt={item.title} />
                            <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems="center" mt={2}>
                                <Typography className="title">{item.title}</Typography>
                                <Stack direction="row" justifyContent="flex-end" spacing={1}>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'svg')}>
                                        <IconDownload size={16} />SVG
                                    </DownloadButton>
                                    <DownloadButton onClick={() => handleDownloadImage(item.name, item.link, 'png')}>
                                        <IconDownload size={16} /> PNG
                                    </DownloadButton>
                                </Stack>
                            </Stack>
                        </DownloadBox>
                    </Grid>
                ))}
            </Grid>

            <Box mt={6} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Backgrounds</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={2}>
                {backgroundList.map((item, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box component={'img'} src={item.src} alt={item.title} />
                        <Stack direction="row" justifyContent="flex-end" spacing={1} mt={2}>
                            <DownloadButton onClick={() => handleDownloadImage(item.title, item.link, 'svg')}>
                                <IconDownload size={16} />
                                <Typography variant="body2"> SVG</Typography>
                            </DownloadButton>
                            <DownloadButton onClick={() => handleDownloadImage(item.title, item.link, 'png')}>
                                <IconDownload size={16} />
                                <Typography variant="body2"> PNG</Typography>
                            </DownloadButton>
                        </Stack>
                    </Grid>
                ))}
            </Grid>


            <Box mt={6} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Brand Colors</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={2}>
                {brandColor.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} key={index}>
                        <BrandColorBox sx={{ background: item.hex }}>
                            <Box p={4}>
                                <Typography variant="h6" fontWeight='700'>{item.name}</Typography>
                                <Typography variant="h6" fontWeight='800'>{item.hex}</Typography>
                            </Box>
                            <CopyComponent content={item.hex} />
                            <Stack flexDirection={'row'} className="brand-color-more" width={'100%'}>
                                {item.moreColors.map((color, index) => (
                                    <Stack p={1.5} width={'20%'} sx={{ background: color }} key={index} />
                                ))}
                            </Stack>
                        </BrandColorBox>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <BrandGradientColorBox>
                        <Typography variant="h6" fontWeight='700'>Primary Gradient</Typography>
                        <Typography variant="h6" fontWeight='800'>#00F1F5 - #8A92FF</Typography>
                        <CopyComponent content={'linear-gradient(170deg, #00F1F5 0%, #8A92FF 80%)'} />
                    </BrandGradientColorBox>
                </Grid>
            </Grid>


            <Box mt={6} mb={4}>
                <Typography variant="h4" color="white" fontWeight='700'>Typography</Typography>
                <Divider sx={{ borderColor: 'white', borderWidth: '1px', width: '36px', mt: 1 }} />
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={5}>
                    <TypographyBox>
                        {fontList.map((item, index) => (
                            <Typography key={index} variant="h4"
                                sx={{ fontFamily: '"Poppins"', fontWeight: item.fontWeight, lineHeight: 1.6 }}>
                                {item.name}
                            </Typography>
                        ))}
                    </TypographyBox>
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Stack spacing={2} justifyContent={'center'} alignItems={'flex-start'} height={'100%'}>
                        <Typography variant="h5">Poppins font</Typography>
                        <Typography>Poppins is our highlight font. Use this typeface to for headlines, key messages or to highlight parts of a message, meaning of the logo's symbol.</Typography>
                        <FontLink href="https://fonts.google.com/specimen/Poppins" target="_blank" rel="noreferrer">Purchase Poppins Font</FontLink>
                    </Stack>
                </Grid>
            </Grid>

        </BrandKitBox>
    )

}