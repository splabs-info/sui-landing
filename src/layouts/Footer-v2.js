import {
  Box,
  Container,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { IconBrandTelegram } from "@tabler/icons";
import { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoSPlabs, { CusLink } from "../components/common/LogoSPlabs";
import { EndBox, Footer, SocialBox, FooterTitle, UlCustom, MenuCustom, GetIntoButton } from "../components/footer/FooterStyles";
import useResponsive from "../hooks/useResponsive";
import { _changeLanguage } from "../store/setting/settingActions";

const joinGateKeeper = [
  {
    label: "key_15",
    link: "/coming-soon"
  },
  {
    label: "key_16",
    link: "/coming-soon"
  },
  {
    label: "key_17",
    link: "/coming-soon"
  },
  {
    label: "key_Staking",
    link: "/coming-soon"
  },
  {
    label: "key_18",
    link: "/coming-soon"
  },
  {
    label: "key_19",
    link: "/coming-soon"
  },
]

const aboutGateKeeper = [
  {
    label: "key_11",
    link: "/coming-soon"
  },
  {
    label: "key_12",
    link: "/coming-soon"
  },
  {
    label: "key_13",
    link: "/coming-soon"
  },
  {
    label: "WHITEPAPER",
    link: "/whitepaper"
  },
  {
    label: "MEDIA_KIT",
    link: "/coming-soon"
  },
]

const socials = [
  {
    src: "/images/icon/icon-medium.png",
    link: "https://medium.com/@GatekeeperGlobal"
  },
  {
    src: "/images/icon/icon-twitter.png",
    link: "https://twitter.com/Sp_Gatekeeper"
  },
  {
    src: "/images/icon/icon-discord.png",
    link: "https://discord.gg/uGsNuBHU3C"
  },
  {
    src: "/images/icon/icon-telegram.png",
    link: ""
  },

]

export default function FooterV2() {

  const dispatch = useDispatch()
  const { setting } = useSelector((state) => state);
  const { library } = setting;

  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "lg");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(_changeLanguage(localStorage.getItem("lang")));
  }, [dispatch]);


  return (
    <Footer id='contact'>
      <Container maxWidth={"xl"}>
        <Grid container>
          <Grid
            item
            sm={12}
            md={12}
            lg={3}
            textAlign={isTablet && "center"}
          >
            <Box component='a' href="/"
              sx={{
                display: isTablet && 'flex',
                justifyContent: isTablet && 'center',
                '&:hover': {
                  borderBottom: '0px!important'
                }
              }}>
              <Box component={'img'} src="/logo2.png" width={isMobile ? 200 : '90%'} maxWidth={250} />
            </Box>
            <Typography mt={3} variant="body1" sx={{
              fontSize: '0.95rem',
              textAlign: isMobile && 'center',
              padding: isMobile ? '0 10%' : '0 20% 0 0 ',
            }}>
              The Gatekeeper Launchpad platform is a user-friendly platform that runs on Gate-Chain as a multi-chain platform for Metaverse, Game, and WEB 3.0.
            </Typography>
            <CusLink href="https://splabs.info/"
              target={'_blank'} sx={{ marginTop: '2rem', marginBottom: '0.5rem' }}>
              <Box component="img"
                src="/logo-splabs.png"
                width={'150px'}
              />
            </CusLink>
            <Typography variant="body1" sx={{
              fontSize: '0.95rem',
              textAlign: isMobile && 'center',
              padding: isMobile ? '0 10%' : '0 20% 0 0 ',
            }}>
              Splabs is a blockchain hub that provides global gamefi, metaverse, M2E, and Defi service solutions.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            lg={2}
            mt={isTablet && 3}
            textAlign={isMobile && "center"}
          >
            <FooterTitle>
              {library.key_9}
            </FooterTitle>
            <UlCustom >
              <li >
                <a href='mailto:business@gate-keeper.io' target="_blank" rel="noreferrer" style={{ fontSize: '1rem' }}>
                  business@gate-keeper.io
                </a>
              </li>
            </UlCustom>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            mt={isTablet && 3}
            textAlign={isMobile ? 'end' : 'start'}
            pr={isMobile && 2}
            sx={{ height: "100%", wordBreak: "break-all" }}
          >
            <FooterTitle>
              {library.key_10}
            </FooterTitle>

            <UlCustom >
              {aboutGateKeeper.map(item => (
                <li key={item.label}>
                  <a href={item.link} >
                    {library[item.label]}
                  </a>
                </li>
              ))}
            </UlCustom>
          </Grid>

          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            mt={isTablet && 3}
            pl={isMobile && 2}
            sx={{ height: "100%", textAlign: "start", wordBreak: "break-all" }}
          >
            <FooterTitle>
              {library.key_14}

            </FooterTitle>

            <UlCustom >
              {joinGateKeeper.map(item => (
                <li key={item.label} >
                  <a href={item.link} target="_blank" rel="noreferrer">
                    {library[item.label]}
                  </a>
                </li>
              ))}
            </UlCustom>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            lg={3}
            mt={isTablet && 3}
            textAlign={useResponsive("down", "md") && "center"}
          >
            <FooterTitle>
              {library.key_20}
            </FooterTitle>
            <SocialBox>
              {socials.map((item, index) =>
              (item.link ?
                <Box key={index} component='a' href={item.link} target={'_blank'}>
                  <Box component='img' src={item.src} />
                </Box> :
                <Box key={index} component='a' onClick={handleClick} sx={{ cursor: 'pointer' }}>
                  <Box component='img' src={item.src} />
                </Box>
              ))}
              <MenuCustom
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                className="Menu"
                sx={{
                  background: "transparent!important",
                  border: "1px solid black",
                  color: "white",
                  marginTop: '15px',
                  "& a": {
                    color: "white",
                    textDecoration: 'none',
                  },
                  "& .MuiMenu-paper": {
                    background: '#0a0a0a!important',
                  }
                }}
              >
                <a
                  href="https://t.me/GateKeeperGlobal"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MenuItem onClick={handleCloseMenu}>
                    <IconBrandTelegram />    Gate-Keeper Global </MenuItem></a>
                <a
                  href="https://t.me/GateKeeperChat"
                  target="_blank"
                  rel="noreferrer"
                > <MenuItem onClick={handleCloseMenu}>
                    <IconBrandTelegram />    Gate-Keeper Chat</MenuItem></a>
              </MenuCustom>
            </SocialBox>

            <FooterTitle mt={3}>
              {library.key_21}
            </FooterTitle>
            <GetIntoButton>
              Get into Social Platform
            </GetIntoButton>
          </Grid>

        </Grid>
      </Container>
      <EndBox>
        <Typography>
          Copyright © 2022 SPLabs Co. LTD | All Rights Reserved
        </Typography>
      </EndBox>
    </Footer>
  );
}
