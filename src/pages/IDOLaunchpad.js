import { Box, Container, Grid, Stack, styled, Typography } from '@mui/material';
import Page from 'components/common/Page';
import {
    ButtonTitleBox,
    FrameButton,
    ImgTitleBox,
    QuestionsButton,
    SectionBox,
    TextTypography,
    TitleBox,
    TypographyGradient,
} from 'components/home/HomeStyles';
import { questionsList } from 'components/home/Questions';
import CustomSlider from 'components/ido-list/CustomSlider';
import { OnGoingCard } from 'components/ido-list/OnGoingCard';
import { UpComingIDOCard } from 'components/ido-list/UpComingIDOCard';
import useResponsive from 'hooks/useResponsive';
import { isEmpty, toNumber } from 'lodash';
import moment from 'moment';
import { useFormatRound } from 'onchain/hooks/use-format-round';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hood, releapCommunity, releapPublic, releapPublicPre, sua, xuiOG, xuiPublic } from 'static/ido';

const ContentBox = styled(Box)(({ theme }) => ({
    background: '#142436',
    borderRadius: '10px',
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    flexDirection: 'row',
    padding: '16px',
    '& .avatar-ino-previous': {
        width: '35%',
        height: '210px',
        borderRadius: '10px',
        boxShadow: '0px 0px 15.0429px rgba(159, 241, 236, 0.5), inset 1.50429px 2.25643px 7.52145px rgba(0, 0, 0, 0.3)',
    },
    '& .content-ino-previous': {
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        gap: '24px',
        '& .avatar-ino-previous': {
            width: '100%',
        },
        '& .content-ino-previous': {
            width: '100%',
        },
    },
}));
export default function IDOLaunchpad() {
    let project = 'Releap';
    const currentTime = moment();

    const formattedUpcoming = React.useMemo(() => [releapPublic, hood], []);

    const formattedPrevious = React.useMemo(() => [sua, xuiOG, xuiPublic, releapCommunity, releapPublicPre], []);

    const isDesktop = useResponsive('up', 'md');
    const isMobile = useResponsive('down', 'sm');
    const navigate = useNavigate();

    const { formatInfoRound, allSCRound } = useFormatRound();

    const renderOnGoingSection = React.useCallback(() => {
        if (isEmpty(allSCRound)) return;

        const currentOnGoing = allSCRound.filter((i) => {
            // const poolRemaining = i?.totalSupply - i?.totalSold;
            if (
                currentTime.isBetween(moment(toNumber(i.startAt)), moment(toNumber(i.endAt))) 
                // (poolRemaining > 0 ? (poolRemaining > i?.minPurchase ? true : false) : true)
            ) {
                return i;
            } else return null;
        });

        return (
            <>
                {!isEmpty(currentOnGoing) ? (
                    <Box mb={20} mt={10} position="relative">
                        <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                        <TitleBox>
                            <Typography>On-going</Typography>
                            <TypographyGradient>Pools</TypographyGradient>
                        </TitleBox>
                        <Grid container spacing={5} mt={2}>
                            {currentOnGoing?.map((item, index) => (
                                <Grid item md={6} xs={12} key={index}>
                                    <OnGoingCard
                                        link={item?.link}
                                        roundName={item?.name}
                                        projectName={item?.projectName}
                                        imageUrl={item?.imageUrl}
                                        endAt={item?.endAt}
                                        totalSupply={item?.totalSupply}
                                        totalSold={item?.totalSold}
                                        key={index}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                ) : (
                    <></>
                )}
            </>
        );
    }, [allSCRound, currentTime]);
    const renderUpComingSection = React.useCallback(() => {
        // console.log('formattedUpcoming__', moment(formattedUpcoming));
        const currentUpcoming = formattedUpcoming.filter((i) => {
            console.log(
                'currentTime.isBefore(moment(toNumber(i.startAtSc)))',
                currentTime.isBefore(moment(toNumber(i.startAtSc)))
            );
            if (currentTime.isBefore(moment(toNumber(i.startAtSc)))) {
                return i;
            } else return null;
        });

        // console.log('currentUpcoming__', currentUpcoming);
        return (
            <Box my={20} position="relative">
                <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                <TitleBox>
                    <Typography>Upcoming</Typography>
                    <TypographyGradient>Pools</TypographyGradient>
                </TitleBox>
                <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 2, mt: 3 }}>
                    {currentUpcoming.map((item, index) => (
                        <UpComingIDOCard {...item} key={index} />
                    ))}
                </Stack>
            </Box>
        );
    }, [currentTime, formattedUpcoming]);

    const renderPreviousSection = React.useCallback(() => {
        const currentPrevious = formattedPrevious.filter((i) => currentTime.isAfter(moment(toNumber(i.endAt))));

        return (
            <Box my={20} position="relative">
                <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                <TitleBox>
                    <Typography>Upcoming</Typography>
                    <TypographyGradient>Pools</TypographyGradient>
                </TitleBox>
                <Grid container spacing={5} mt={1}>
                    {currentPrevious.map((item, index) => (
                        <Grid item md={6} xs={12} key={index}>
                            <Box
                                sx={{
                                    p: '1px',
                                    border: '1px solid #42EECF',
                                    background: 'linear-gradient(323.96deg, #5394CF 0%, #8CE9C7 89.18%)',
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    navigate(item.link);
                                }}
                            >
                                <ContentBox>
                                    <Box component={'img'} src={item.avatar} alt={item.title} className="avatar-ino-previous" />
                                    <Box className="content-ino-previous">
                                        <Typography variant="h3" fontWeight={700}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body1">Time: {item.time}</Typography>
                                        <Typography variant="body1" mt={1}>
                                            {item.description}
                                        </Typography>
                                    </Box>
                                </ContentBox>
                                <Box p={3}></Box>
                            </Box>
                            <Box mt={3}>
                                <CustomSlider
                                    color="linear-gradient(10deg, rgba(91, 210, 218, 0.8) 17.27%, rgba(128, 255, 217, 0.8) 59.07%, rgba(255, 255, 255, 0.8) 100%)"
                                    disabledBorder={true}
                                    disabledMark={true}
                                    value={Number(100)}
                                    max={Number(100)}
                                    height={12}
                                    sx={{
                                        border: '2px solid #B9E3E7',
                                        boxShadow: '0 0 10px 2px rgb(255,255,255,0.7)',
                                    }}
                                    title={
                                        <Stack direction="row" justifyContent="space-between" mb={1.5}>
                                            <Typography variant="body1">Progress</Typography>
                                            {/* <Typography variant="body1">Max Participants: {item.total}</Typography> */}
                                        </Stack>
                                    }
                                />
                                <Stack direction="row" justifyContent="space-between" mt={1.5}>
                                    <Typography variant="body1">100%</Typography>
                                    {item?.supply ? (
                                        <Typography variant="body1">
                                            {item.total}/{item.supply} {item.token}
                                        </Typography>
                                    ) : (
                                        <Typography variant="body1">
                                            {item.total}/{item.total} {item.token}
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTime, formattedPrevious]);

    React.useEffect(() => {
        formatInfoRound('Public_Sale', project);
        // formatInfoRound('Community_Sale', project);
    }, [formatInfoRound, project]);

    // React.useEffect(() => {
    //     if (allSCRound.length > 0) {
    //         const currentTime = moment();
    //         const tempData = [];
    //         for (const iterator of allSCRound) {
    //             if (
    //                 currentTime.isAfter(moment(parseInt(iterator.startAt))) &&
    //                 currentTime.isBefore(moment(parseInt(iterator.endAt)))
    //             ) {
    //                 tempData.push(iterator);
    //             }
    //         }
    //         if (tempData.length > 0) {
    //             setallSCRoundPools(tempData);
    //         }
    //     }
    // }, [allSCRound]);

    return (
        <Page title="IDO list">
            <SectionBox sx={{ backgroundImage: "url('/images/background/ido-list-header-bg.png')" }}>
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            position: 'relative',
                            zIndex: 1,
                            pt: isDesktop ? 20 : 15,
                            color: 'white',
                        }}
                    >
                        <Title variant="h2">
                            Enter {isMobile && <br />} <p className="linear">the multi chain</p> <br />
                            based Launchpad
                        </Title>
                    </Box>
                    <ButtonTitleBox sx={{ gap: '1rem' }}>
                        <a href="https://1wcod92hu2t.typeform.com/to/yrmuPiG6" target="_blank" rel="noreferrer">
                            <FrameButton>Apply for Launchpad</FrameButton>
                        </a>
                        <a
                            href="https://www.bitget.com/expressly?channelCode=8g69&vipCode=y4ug&languageType=0"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FrameButton>Buy $XUI</FrameButton>
                        </a>
                        <Link to={'/whitepaper'}>
                            <FrameButton>Whitepaper</FrameButton>
                        </Link>
                    </ButtonTitleBox>
                    <Questions />
                </Container>
            </SectionBox>
            <SectionBox
                sx={{
                    backgroundImage: "url('/images/background/bg-ido.png')",
                    color: 'white',
                    paddingTop: 0,
                }}
            >
                <Container maxWidth="xl">
                    {/* {onGoingPools && onGoingPools.length > 0 ? <OnGoingPools releapRound={onGoingPools} /> : null} */}
                    {/* {allSCRoundPools && allSCRoundPools.length > 0 ? <allSCRoundPools releapRound={allSCRoundPools} /> : null} */}
                    {/* <UpComingPools hasInTimeIDOXUI={hasInTimeIDOXUI} /> */}
                    {/* {renderallSCRoundPool()} */}
                    {/* {renderPrevious()} */}
                    {/* <PreviousPools previous={previous} /> */}

                    {renderOnGoingSection()}
                    {renderUpComingSection()}
                    {renderPreviousSection()}
                </Container>
            </SectionBox>
        </Page>
    );
}

const Title = styled(Typography)(({ theme }) => ({
    textTransform: 'uppercase',
    '& .linear': {
        display: 'initial',
        background: 'linear-gradient(rgba(129, 236, 197, 1), rgba(148, 203, 255, 1), rgba(133, 150, 255, 1))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1.3',
    },
}));

const Questions = () => {
    const isMobile = useResponsive('down', 'sm');

    return (
        <Box mt={isMobile ? 15 : 20}>
            <Box mb={5} sx={{ position: 'relative' }}>
                <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
                <TitleBox>
                    <Typography>Join and Understand</Typography>
                    <TypographyGradient>YouSUI</TypographyGradient>
                </TitleBox>
            </Box>
            <Stack flexDirection="row" flexWrap={'wrap'} justifyContent="space-between">
                {questionsList.map((item, index) => (
                    <QuestionsButton key={index} href={item.link} target={'_blank'}>
                        <div>
                            <TextTypography variant="body1" fontWeight={900}>
                                {item.title}{' '}
                            </TextTypography>
                            <TextTypography variant="body2">Learn more</TextTypography>
                        </div>
                    </QuestionsButton>
                ))}
            </Stack>
        </Box>
    );
};
