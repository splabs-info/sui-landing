import { Box, Container, Stack, Typography, styled } from '@mui/material';
import Page from 'components/common/Page';
import { ButtonTitleBox, FrameButton, SectionBox } from 'components/home/HomeStyles';
import ApplyAsProject from 'components/ino/ApplyAsPorject';
import HowToJoin from 'components/ino/HowToJoin';
import OnGoing from 'components/ino/OnGoing';
import PreviousINOs from 'components/ino/PreviousINOs';
import UpComing from 'components/ino/UpComing';
import WhyJoin from 'components/ino/WhyJoin';
import useResponsive from 'hooks/useResponsive';
import { forEach } from 'lodash';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Title = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  textShadow: '0 0 7px rgb(255,255,255,0.5)',
  '& .linear': {
    display: 'initial',
    background: 'linear-gradient(89.68deg, #81ECC5 0.23%, #94CBFF 49.95%, #8596FF 96.05%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    lineHeight: '1.3',
  },
}));

const Launchpad = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
  fontSize: 32,
  lineHeight: '32px',
  fontWeight: 'bold',
  marginBottom: '32px',
}));

const Caption = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: 16,
  width: '70%',
  marginBottom: '32px',
  [theme.breakpoints.down(900)]: {
    width: '100%',
  },
}));

const inoProjects = [
  {
    title: 'Free Minting',
    link: '/ino-launchpad/free-minting-nft',
    avatar: '/images/ino/free-minting-1.jpg',
    access: 'WL',
    hardCap: '2000',
    releaseTime: 'Official Launch: June 10th',
    status: false,
    startTime: '2023-06-10T11:00:00Z',
    endTime: '2023-06-10T12:00:00Z',
  },
  {
    title: 'Free Minting 2',
    link: '/ino-launchpad/free-minting-nft-2',
    avatar: '/images/ino/free-minting-2.jpg',
    access: 'No',
    hardCap: '5000',
    releaseTime: 'Official Launch: June 24th',
    status: true,
    startTime: '2023-06-24T11:00:00Z',
    endTime: '2023-06-24T11:10:00Z',
  },
  {
    title: 'Free Minting 3',
    link: '/ino-launchpad/free-minting-nft-3',
    avatar: '/images/ino/free-minting-3.jpg',
    access: 'No',
    hardCap: '500',
    releaseTime: 'Official Launch: July 19th',
    status: true,
    startTime: '2023-07-19T12:00:00Z',
    // endTime: '2023-07-20T00:00:00Z',
    // chỗ này nha a Tâm
    endTime: '2023-07-19T12:00:00Z',
  },

  // {
  //   title: 'HooD',
  //   avatar: '/images/ino/ino-upcoming-2.jpg',
  //   hardCap: '2000',
  //   access: 'Tier 1-5',
  //   releaseTime: 'Official Launch: Aug 25th',
  //   status: false,
  //   link: '',
  //   startTime: '2023-08-30T11:00:00Z',
  //   endTime: '2023-08-30T12:00:00Z',
  // },
];

const INOLaunchPad = () => {
  const isDesktop = useResponsive('up', 'md');
  const [onGoingProjects, setOnGoingProjects] = useState([]);
  const [upComingProjects, setUpComingProjects] = useState([]);
  const [previousProjects, setPreviousProjects] = useState([]);
  // console.log(moment(moment.utc()));
  useEffect(() => {
    setOnGoingProjects([]);
    setUpComingProjects([]);
    setPreviousProjects([]);
    forEach(inoProjects, (project) => {
      if (moment().isAfter(project.endTime)) {
        setPreviousProjects((prev) => [...prev, project]);
      } else if (moment().isBefore(project.startTime)) {
        setUpComingProjects((prev) => [...prev, project]);
      } else {
        setOnGoingProjects((prev) => [...prev, project]);
      }
    });
  }, []);

  return (
    <Page title="INO">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/ino/full-ino.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top',
          color: 'white',
        }}
      >
        <Container maxWidth="xl" sx={{ paddingBottom: '108px' }}>
          <Stack direction={{ lg: 'row' }} sx={{ pt: isDesktop ? 20 : 15 }}>
            <Box sx={{ position: 'relative', zIndex: 1, color: 'white' }}>
              <Title variant="h1">
                <p className="linear" style={{ fontSize: 72, fontWeight: 'bold' }}>
                  INO
                </p>{' '}
                <br />
              </Title>
              <Launchpad>Launchpad</Launchpad>

              <Caption>
                Don't miss out the opportunity to buy Special NFT at even cheaper prices Through INO Launchpad. YouSUI
                promises that only High-Value NFTs will be on sale through strong DD Regulation and Screening System.
              </Caption>

              <ButtonTitleBox sx={{ gap: '1rem', marginBottom: isDesktop ? 20 : 10 }}>
                <Link to={'/staking'}>
                  <FrameButton>Stake $XUI</FrameButton>
                </Link>
                <Link to={'/my-profile'}>
                  <FrameButton>My Page</FrameButton>
                </Link>
              </ButtonTitleBox>
            </Box>
            <img
              src="/images/ino/ino-banner.png"
              alt=""
              style={{
                width: '60%',
                height: '60%',
                margin: 'auto',
                objectFit: 'cover',
                marginBottom: isDesktop ? '48px' : '',
              }}
            />
          </Stack>
          {onGoingProjects.length > 0 && <OnGoing projects={onGoingProjects} />}
          {upComingProjects.length > 0 && <UpComing projects={upComingProjects} />}
          {previousProjects.length > 0 && <PreviousINOs projects={previousProjects} />}
          <HowToJoin />
          <WhyJoin />
          <ApplyAsProject />
        </Container>
      </SectionBox>
    </Page>
  );
};

export default INOLaunchPad;
