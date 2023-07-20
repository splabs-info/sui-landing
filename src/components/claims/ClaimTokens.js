/* eslint-disable jsx-a11y/alt-text */
import styled from '@emotion/styled';
import {
    Box,
    Divider,
    Grid,
    Hidden,
    InputAdornment,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import { IconSearch } from '@tabler/icons';
import { CheckboxFiled } from 'components/base/CheckField';
import { GradientButton } from 'components/common/CustomButton';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
import { replace, toNumber } from 'lodash';
import * as moment from 'moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { grey } from '@mui/material/colors'
export const TokenPoolContent = [
    {
        id: 1,
        title: 'YouSUI - TXUI - OG ROUND',
        subtitle: 'Community Test Pool',
        token: 'T-XUI',
        startDate: 'June 14th, 2023',
        status: true,
    },
    {
        id: 2,
        title: 'YouSUI - XUI',
        subtitle: 'IDO Pool',
        token: 'XUI',
        startDate: 'June 21st, 2023',
        status: false,
    },
];


export const TokenPoolBox = styled(Box)(({ theme, isWithdrawal }) => ({
    background:
        !isWithdrawal ? 'linear-gradient(330.98deg, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)' : 'linear-gradient(330.98deg, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
    padding: '40px 80px',
    borderRadius: '20px',
    backdropFilter: 'blur(5px)',
    position: 'relative',
    marginBottom: '40px',
    color: !isWithdrawal ? 'white' : grey[600],
    '& div': {
        zIndex: 1,
    },
    '::before': {
        content: "''",
        position: 'absolute',
        background: 'linear-gradient(283.13deg, rgba(202, 242, 255, 0.25) -1.44%, rgba(22, 83, 140, 0.25) 53.5%, rgba(142, 220, 254, 0.25) 102.43%)',
        inset: '0px',
        zIndex: 0,
        borderRadius: '20px',
        padding: '1px',
        '-webkit-mask':
            'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
        '-webkit-mask-composite': 'xor',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '24px',
        marginBottom: '32px',
        '& .MuiTypography-body1': {
            fontSize: '14px',
        },
    },
}));

export default function ClaimTokens({ myIDOs }) {
    console.log('myIDOs__ClaimTokens', myIDOs)
    const isMobile = useResponsive('down', 'sm');
    const [checkedMyClaims, setCheckedMyClaims] = useState(false);

    return (
        <Box mb={isMobile ? 5 : 10} mt={20} position="relative">
            <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
            <TitleBox>
                <Typography>Claim</Typography>
                <TypographyGradient>Your IDO tokens</TypographyGradient>
            </TitleBox>
            <Stack
                my={isMobile ? 3 : 6}
                flexDirection={'row'}
                justifyContent={isMobile ? 'space-between' : 'flex-end'}
                alignItems={'center'}
            >
                {/* <TextField
                    id="search"
                    placeholder="Search"
                    variant="standard"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconSearch />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        mr: isMobile ? 2 : 4,
                        width: isMobile ? '60%' : 'auto',
                        '& svg': {
                            color: '#fff',
                        },
                        '& .MuiInput-root': {
                            color: '#fff',
                            padding: '0px 8px',
                            fontSize: isMobile ? '0.9rem' : '1rem',
                            '&:before': {
                                borderBottomColor: '#98D4FF8f',
                            },
                        },
                    }}
                />
                <CheckboxFiled
                    label={'My Claims'}
                    handleChecked={() => setCheckedMyClaims(!checkedMyClaims)}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontSize: isMobile ? '0.8rem' : '1rem',
                            color: '#fff',
                            whiteSpace: 'nowrap',
                        },
                    }}
                /> */}
            </Stack>
            {myIDOs?.length !== 0 ? (
                <>
                    {myIDOs.map((item, index) => (
                        <TokenPool
                            key={index}
                            isWithdrawal={item?.isWithdrawal}
                            avatar={item?.image_url}
                            issueDate={item?.issue_date}
                            // projectId={item?.project_id}
                            vestingId={item?.vesting_id}
                            eventName={item?.eventName}
                            name={item?.name}
                            description={item?.description}
                        />
                    ))}
                </>
            ) : (
                <Typography
                    sx={{
                        margin: '240px auto 190px auto',
                        fontWeight: 'bold',
                        fontSize: 32,
                        color: 'white',
                        width: '100%',
                        textAlign: 'center',
                    }}
                >
                    You don't have any IDOs tokens
                </Typography>
            )}
        </Box>
    );
}

function TokenPool({ avatar, eventName, name, vestingId, description, issueDate }) {
    const isMobile = useResponsive('down', 'sm');
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/claim-tokens/${vestingId}`, {
            state: {
                eventName: eventName,
            }
        });
    };

    return (
        <TokenPoolBox >
            <Grid container alignItems={'center'} spacing={isMobile ? 2 : 5}>
                <Grid item md={5} xs={12} sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Box component={'img'} src={avatar} alt="" width={isMobile ? 50 : 100} />
                    <Box ml={isMobile ? 2 : 5}>
                        <Typography variant={isMobile ? 'h6' : 'h5'} color={'white'}>
                            {name} - {replace(eventName, '_', ' ')}
                        </Typography>
                        <Typography
                            color={'#999'}
                            sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                width: 248,
                            }}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Grid>
                <Hidden mdUp>
                    <Grid item md={0} xs={12}>
                        <Divider flexItem orientation={'horizontal'} sx={{ color: 'white' }} />
                    </Grid>
                </Hidden>
                <Grid
                    item
                    md={4}
                    xs={6}
                    sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <Box>
                        <Typography color={'#999'} sx={{ textAlign: 'center' }}>Issue date</Typography>
                        <Typography color={'white'}>{moment(toNumber(issueDate)).format('LLLL')}</Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    md={3}
                    xs={6}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isMobile ? 'center' : 'flex-end',
                    }}
                >
                    <GradientButton onClick={() => handleNavigate()} sx={{ minWidth: 160 }}>
                        Detail
                    </GradientButton>
                </Grid>
            </Grid>
        </TokenPoolBox>
    );
}
