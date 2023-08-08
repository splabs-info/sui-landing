import { Box, Grid, Typography } from '@mui/material';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import React from 'react';
import { OnGoingCard } from './OnGoingCard';

export default function OnGoingPools({ releapRound }) {
    const renderOnGoingPool = React.useCallback(() => {
        if (!releapRound) return;
        return (
            <>
                {releapRound?.map((item, index) => (
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
            </>
        )
    }, [releapRound]);

    return (
        <Box mb={20} mt={10} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>On-going</Typography>
                <TypographyGradient>Pools</TypographyGradient>
            </TitleBox>
            <Grid container spacing={5} mt={2}>
                {renderOnGoingPool()}
            </Grid>
        </Box>
    );
}
