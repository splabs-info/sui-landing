import { TabContext } from '@mui/lab';
import { Box, Container, Stack, Tab, Typography } from '@mui/material';
import { useState } from 'react';
import useResponsive from '../../hooks/useResponsive';
import {
    CenterBox,
    CustomTabList,
    CustomTabPanel,
    FrameButton,
    ImgTitleBox,
    QuestionsButton,
    SectionBox,
    TextTypography,
    TitleBox,
    TypographyGradient,
} from './HomeStyles';

export const questionsList = [
    {
        title: 'How to get started ?',
        link: 'https://medium.com/@YouSUI/procedure-and-how-to-participate-inyousui-ino-21ac9882b486',
    },
    {
        title: 'What is Tier System ?',
        link: 'https://medium.com/@YouSUI/yousui-tier-system-a9f95037cbd4',
    },
    {
        title: 'How to join IDO ?',
        link: 'https://medium.com/@YouSUI/procedure-and-how-to-participate-in-yousui-ido-4e266397e61e',
    },
    {
        title: 'What is YouSUI ?',
        link: 'https://medium.com/@YouSUI/yousui-social-platform-all-you-need-to-know-730d26979c52',
    },
];

export default function Questions() {
    const isDesktop = useResponsive('up', 'md');

    return (
        <SectionBox
            sx={{
                backgroundImage: "url('/images/background/homebg5.png')",
            }}
        >
            <Container maxWidth={'xl'}>
                <Box mb={5} sx={{ position: 'relative' }}>
                    <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                    <TitleBox>
                        <Typography>Join and Understand</Typography>
                        <TypographyGradient>YouSUI</TypographyGradient>
                    </TitleBox>
                </Box>
                <Stack flexDirection="row" flexWrap={'wrap'} justifyContent="space-between">
                    {questionsList.map((item, index) => (
                        <QuestionsButton sx={{width: "23%"}} key={index} href={item.link} target={'_blank'}>
                            <div>
                                <TextTypography variant="body1" fontWeight={900}>{item.title} </TextTypography>
                                <TextTypography variant="body2">Learn more</TextTypography>
                            </div>
                        </QuestionsButton>
                    ))}
                </Stack>
            </Container>
        </SectionBox>
    );
}
