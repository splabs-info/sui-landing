import { Box, Stack, Typography } from '@mui/material';
import { SocialBox } from 'components/footer/FooterStyles';
import { ImageBox, RoundInfoBox, TitleBackgroundBox } from './RoundStyled';

const info = {
    title: 'SUA Token - Test IDO',
    description:
        'SUA is a token of Meta version. It has no intrinsic value or expectation of financial return. There is no official team or roadmap.',
};

const socials = [
    {
        src: '/images/icon/icon-medium.png',
        link: 'https://medium.com/sua',
    },
    {
        src: '/images/icon/icon-twitter.png',
        link: 'https://twitter.com/sua',
    },
    {
        src: '/images/icon/icon-discord.png',
        link: 'https://discord.com/invite/yousui',
    },
    {
        src: '/images/icon/icon-wpp.png',
        link: '/whitepaper',
    },
];
export const RoundIntro = () => {
    return (
        <RoundInfoBox>
            <ImageBox>
                <img src={'https://bafkreibdey2qhqfhv5gh23nvvh6uqha2r3ufklvtacp3saebxqnlxc3ati.ipfs.dweb.link/'} alt="" />
                <img src="/logo-1.png" alt="" width={200} className="absolute" />
            </ImageBox>
            <Stack direction="row" spacing={2} justifyContent={'space-between'} alignItems={'center'} my={3}>
                <TitleBackgroundBox>
                    <Typography variant="h5">{info.title}</Typography>
                </TitleBackgroundBox>
                <SocialBox>
                    {socials.map((item, index) => (
                        <Box key={index} component="a" href={item.link} target={'_blank'}>
                            <Box component="img" src={item.src} />
                        </Box>
                    ))}
                </SocialBox>
            </Stack>
            <Typography variant="body2" lineHeight={2}>
                {info.description}
            </Typography>
        </RoundInfoBox>
    );
};
