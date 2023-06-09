import { Box, Container, Grid, Hidden, Link, Stack, Typography, styled } from '@mui/material';
import { JsonRpcProvider, TransactionBlock, devnetConnection } from '@mysten/sui.js';
import { useWallet } from '@suiet/wallet-kit';
import { BorderGradientButton, GradientLoadingButton } from 'components/common/CustomButton';
import CustomModal from 'components/common/CustomModal';
import Page from 'components/common/Page';
import { ProcessBarBox } from 'components/common/ProcessBarBox';
import { SectionBox, TypographyGradient } from 'components/home-v2/HomeStyles';
import { MintingCountdown } from 'components/minting/MintingCountdown';
import useResponsive from 'hooks/useResponsive';
import React from 'react';
import Slider from 'react-slick';
import { toast } from 'react-toastify';

export const addresses = {
  package: `0x4a73863c9ba3311050d4bac61f6adf0c30c8630815029918875a8d79f08c980e`,
  objectFreeMint: `0xc12836121c340b7f80ab922790188670095a1d2886af690c71f716689616a7cf`,
  objectInformation: `0x7db44371691fb6a95f48f9d87691860cbfd6bc291031250330a9f10460e566da`,
};

const provider = new JsonRpcProvider(devnetConnection);

const FreeMintingBox = styled(Box)(({ theme }) => ({
  background:
    'linear-gradient(330.98deg, rgba(24, 161, 220, 0.2) -1.28%, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
  padding: '60px 80px',
  borderRadius: '20px',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  '& div': {
    zIndex: 1,
  },
  '& a': {
    textDecoration: 'unset',
  },
  '::before': {
    content: "''",
    position: 'absolute',
    background:
      'linear-gradient(330.98deg, rgba(24, 161, 220, 0.2) -1.28%, rgba(95, 172, 242, 0.2) -1.27%, rgba(20, 64, 88, 0.14) 49.25%, rgba(49, 173, 243, 0.2) 101.94%)',
    inset: '0px',
    zIndex: 0,
    borderRadius: '20px',
    padding: '1px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    background: 'transparent',
    backdropFilter: 'blur(0px)',
    marginBottom: '64px',
    '::before': {
      padding: '0px',
    },
  },
}));

export default function FreeMinting() {
  const isMobile = useResponsive('down', 'sm');
  const wallet = useWallet();
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(2000);
  const [minted, setMinted] = React.useState(0);
  const [owned, setOwned] = React.useState(0);
  const [flag, setFlag] = React.useState(false);
  const [hasInTimes, setHasInTimes] = React.useState(false);
  const [myNftList, setMyNftList] = React.useState([]);
  const [openMyNft, setOpenMyNft] = React.useState(false);

  // React.useEffect(() => {
  //   if (provider) {
  //     (async () => {
  //       const result = await provider.getObject({
  //         id: addresses.objectFreeMint,
  //         options: { showContent: true },
  //       });
  //       setTotal(result?.data?.content?.fields?.max_number);
  //       setMinted(result?.data?.content?.fields?.number);
  //     })();
  //   }
  // }, [flag]);

  // React.useEffect(() => {
  //   if (provider && wallet.address) {
  //     (async () => {
  //       const balance = await provider.getOwnedObjects({
  //         owner: wallet.address,
  //         filter: { Package: addresses.package },
  //       });
  //       if (balance) {
  //         setOwned(balance.data.length);
  //         let arrNft = [];
  //         for (const iterator of balance.data) {
  //           const result = await provider.getObject({
  //             id: iterator.data.objectId,
  //             options: { showContent: true },
  //           });
  //           arrNft.push(result?.data?.content?.fields);
  //         }
  //         setMyNftList(arrNft)
  //         console.log(arrNft);
  //       }
  //     })();
  //   }
  // }, [wallet.address, flag]);

  const handleFreeMinting = () =>
    (async () => {
      setLoading(true);
      try {
        const tx = new TransactionBlock();

        tx.moveCall({
          target: `${addresses.package}::freemint::freemint`,
          arguments: [addresses.objectFreeMint, addresses.objectInformation].map((arg) => tx.pure(arg)),
        });

        const result = await wallet.signAndExecuteTransactionBlock({
          transactionBlock: tx,
        });
        if (result) {
          toast.success('NFT mint success');
        } else {
          toast.error('Transaction rejected');
        }
        setTimeout(() => {
          setLoading(false);
          setFlag(!flag);
        }, 5000);
      } catch (error) {
        const errorString = error.toString();
        console.log(errorString);
        const errorCode = [
          { key: 1, code: 'ENOT_AUTHORIZED' },
          {
            key: 2,
            code: 'EWHITELIST_EXIST',
          },
          { key: 3, code: 'EWHITELIST_EXIST' },
          { key: 4, code: 'EWHITELIST_NOTEXIST' },
          { key: 4, code: 'EMAX_MINT_PER_ADDRESS' },
          { key: 5, code: 'EMAX_MINT' },
        ].find((item) => errorString.includes(`${item.key.toString()})`));
        console.log(errorCode);
        toast.error(errorCode ? errorCode.code : errorString);
        setLoading(false);
      }
    })();

  const NFTGroup = () =>
  (<>
    <Box>
      <NFTSlider />
    </Box>
    <ProcessBarBox
      percent={minted ? (minted / total) * 100 : 0}
      subtitle={
        <>
          <Typography variant="body1" color={'white'}>
            {minted}
          </Typography>
          <Typography variant="body1" color={'white'}>
            TOTAL: {total}
          </Typography>
        </>
      }
      sx={{ margin: '24px 0' }}
    />
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={isMobile ? 'space-between' : 'center'}
      flexWrap={'wrap'}
      gap={isMobile ? 1 : 2}
      mb={isMobile ? 3 : 2}
    >
      <Link href={`https://zealy.io/c/yousui`} target='_blank' >
        <BorderGradientButton>
          <img src="/images/icon/logo-crew3.png" alt="global" />
          Crew3
        </BorderGradientButton>
      </Link>
      <Link href={`https://twitter.com/YouSUI_Global`} target='_blank' >
        <BorderGradientButton>
          <img src="/images/icon/logo-twitter.png" alt="discord" />
          Twitter
        </BorderGradientButton>
      </Link>

      <Link href={`https://discord.com/invite/yousui`} target='_blank' >
        <BorderGradientButton>
          <img src="/images/icon/logo-discord.png" alt="discord" />
          Discord
        </BorderGradientButton>
      </Link>
      {/* <BorderGradientButton>
        <img src="/images/icon/icon-global.png" alt="global" />
        View on Explore
      </BorderGradientButton> */}
    </Box>
  </>);


  return (
    <Page title="Free Minting">
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/bg-free-minting.jpg')",
        }}
      >
        <Container maxWidth={'xl'}>
          <FreeMintingBox>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <Box mb={3}>
                  <Typography
                    variant="h1"
                    fontWeight={700}
                    color={'white'}
                    fontSize={!isMobile ? '88px!important' : '48px'}
                  >
                    Free
                  </Typography>
                  <TypographyGradient variant="h1" fontWeight={700} fontSize={!isMobile ? '88px!important' : '48px'}>
                    Minting NFT
                  </TypographyGradient>
                </Box>
                <Hidden smUp>
                  <NFTGroup />
                </Hidden>
                {!hasInTimes && <Typography variant="h6" fontWeight={700} color={'white'}>
                  Start at:
                </Typography>}
                <MintingCountdown endTime={'2023-06-10T11:00:00'} _handleComplete={() => setHasInTimes(true)} />

                <Typography variant="body1" color={'#A0FFF4'} fontStyle={'italic'} mt={2}>
                  *** Claim schedule: 11:00 (UTC) 10th June, 2023
                </Typography>
                <Typography variant="body1" color={'white'} mt={2}>
                  Click <b>“Claim Now”</b>button to receive a free YouSUI NFT.
                  <br />
                  (Prepare Gas Fee on your Wallet)
                </Typography>
                <Typography
                  variant="body1"
                  color={'#A0FFF4'}
                  fontStyle={'italic'}
                  mt={2}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& img': { marginLeft: '10px' },
                  }}
                >
                  Claim available: <img src="/images/icon/icon-check.png" alt="check" />
                </Typography>
                {owned !== 5 ?
                  <GradientLoadingButton
                    sx={{ minWidth: isMobile ? '150px' : '200px', marginTop: '32px' }}
                    onClick={handleFreeMinting}
                    loading={loading}
                    disabled={owned === 5 || !hasInTimes || minted === total}
                  >
                    Claim Now
                  </GradientLoadingButton> :
                  <GradientLoadingButton
                    sx={{ minWidth: isMobile ? '150px' : '200px', marginTop: '32px' }}
                    loading={loading}
                    onClick={() => setOpenMyNft(true)}
                  >
                    My NFT
                  </GradientLoadingButton>}
              </Grid>
              <Grid item md={6} xs={12}>
                <Hidden smDown>
                  <NFTGroup />
                </Hidden>
              </Grid>
            </Grid>
          </FreeMintingBox>
          {myNftList.length > 0 && <MyNFT
            open={openMyNft}
            handleClose={() => setOpenMyNft(false)}
            myNftList={myNftList}
          />}
        </Container>
      </SectionBox>
    </Page>
  );
}

const nftImage = [
  {
    src: '/images/nfts/yousui-nft-1.png',
    label: 'NFT 1',
  },
  {
    src: '/images/nfts/yousui-nft-2.png',
    label: 'NFT 2',
  },
  {
    src: '/images/nfts/yousui-nft-3.png',
    label: 'NFT 3',
  },
  {
    src: '/images/nfts/yousui-nft-4.png',
    label: 'NFT 4',
  },
  {
    src: '/images/nfts/yousui-nft-5.png',
    label: 'NFT 5',
  },
  {
    src: '/images/nfts/yousui-nft-6.png',
    label: 'NFT 6',
  },
];
export const SliderCustom = styled(Slider)(({ theme }) => ({
  '& .slick-track': {
    marginLeft: '-100%',
  },
  '& .slick-slide': {
    display: 'flex!important',
    justifyContent: 'center',
    position: 'relative',
    '& img': {
      width: 'min(100%,300px)',
    },
    '&.slick-active.slick-current': {
      transform: 'scale(0.75) translateX(100%)',
      transition: 'all 0.25s',
      filter: 'blur(3px)',
      opacity: 0.8,
      zIndex: 1,
    },
    '&.slick-active.slick-current + .slick-slide': {
      transform: 'scale(1)',
      opacity: '1!important',
      zIndex: 2,
      transition: 'all 0.5s',
      '& img': {
        background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.4) -8.02%, rgba(109, 133, 218, 0.4) 98.69%)',
        backdropFilter: 'blur(15spx)',
        borderRadius: '10px',
      },
    },
    '&.slick-active.slick-current + .slick-slide + .slick-slide': {
      transform: 'scale(0.75) translateX(-100%)',
      filter: 'blur(3px)',
      opacity: 0.8,
      zIndex: 1,
      transition: 'all 0.25s',
    },
  },
  '& .slick-arrow.slick-next': {
    right: 0,
    zIndex: 3,
    width: '36px',
    height: '36px',
    '&:after': {
      content: "''",
      inset: '0px',
      position: 'absolute',
      borderRadius: '50%',
      background: '#041224',
      WebkitMask:
        'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
      zIndex: '0',
      border: '1px solid #22DAD1',
    },
    '&:before': {
      color: '#22DAD1',
      fontSize: '24px',
      content: "'\\276F'",
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
    },
    '&:hover': {
      '&:before': {
        color: '#041224',
      },
      '&:after': {
        background: 'linear-gradient(0deg, #00C5D3 81.61%, #42EECF 94.62%)',
      },
    },
  },
  '& .slick-arrow.slick-prev': {
    left: 0,
    zIndex: 3,
    width: '36px',
    height: '36px',
    '&:before': {
      color: '#22DAD1',
      fontSize: '24px',
      content: "'\\276E'",
      zIndex: 1,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -60%)',
    },
    '&:after': {
      content: "''",
      inset: '0px',
      position: 'absolute',
      borderRadius: '50%',
      background: '#041224',
      WebkitMask:
        'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box, linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
      zIndex: '0',
      border: '1px solid #22DAD1',
    },
    '&:hover': {
      '&:before': {
        color: '#041224',
      },
      '&:after': {
        background: 'linear-gradient(0deg, #00C5D3 81.61%, #42EECF 94.62%)',
      },
    },
  },

  [theme.breakpoints.down('sm')]: {
    // marginTop: 32,
    '& .slick-slide': {
      '& img': {
        width: 'min(100%,200px)',
      },
      '&.slick-active.slick-current': {
        transform: 'scale(0.65) translateX(110%)',
      },
      '&.slick-active.slick-current + .slick-slide': {
        transform: 'scale(1)',
      },
      '&.slick-active.slick-current + .slick-slide + .slick-slide': {
        transform: 'scale(0.65) translateX(-110%)',
      },
    },
  },
}));

function NFTSlider() {
  // const [selectedNft, setSelectedNft] = useState(0);
  const nftSliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    autoplay: true,
    arrows: true,
    // afterChange: function (index) {
    //   setSelectedNft(index);
    // },
  };
  return (
    <SliderCustom {...nftSliderSettings}>
      {nftImage.map((item, index) => (
        <Box sx={{ position: 'relative', display: 'flex!important', justifyContent: 'center' }} key={index}>
          <img alt={item.label} src={item.src} />
        </Box>
      ))}
    </SliderCustom>
  );
}

const MyNFT = ({ open = false, handleClose = () => { }, myNftList = [] }) => {
  const isMobile = useResponsive('down', 'sm');
  return (
    <CustomModal
      open={open}
      _close={() => handleClose()}
      isShowCloseButton={true}
    >

      <Stack>
        <Typography variant={isMobile ? 'h5' : 'h3'}>My NFT</Typography>
      </Stack>
      <Stack sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 2, m: 3, }}>
        {myNftList?.map((item, index) => (
          <Box component={'img'}
            alt={item.name}
            src={item.image_url}
            key={index}
            sx={{ width: 'min(25%,200px)' }}
          />
        ))}
      </Stack>
    </CustomModal>
  );
}
