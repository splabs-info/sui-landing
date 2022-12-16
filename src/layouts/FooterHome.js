import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoSPlabs from "../components/common/LogoSPlabs";
import { EndBox, Footer, SocialBox, FooterTitle, UlCustom } from "../components/footer/FooterStyles";
import useResponsive from "../hooks/useResponsive";
import { _changeLanguage } from "../store/setting/settingActions";


// const whitepaper = [
//   {
//     lang: "English",
//     url: "/",
//     icon: "/images/icon/icon-en.png",
//   },
//   {
//     lang: "Korean",
//     url: "/",
//     icon: "/images/icon/icon-kr.png",
//   },
//   {
//     lang: "Vietnamese",
//     url: "/",
//     icon: "/images/icon/icon-vn.png",
//   },
//   {
//     lang: "Japanese",
//     url: "/",
//     icon: "/images/icon/icon-jp.png",
//   },
// ];

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
    label: "key_18",
    link: "/coming-soon"
  },
]

const aboutGateKeeper = [
  {
    label: "key_11",
    link: ""
  },
  {
    label: "MARKETPLACE",
    link: ""
  },
  {
    label: "key_12",
    link: ""
  },
  {
    label: "key_13",
    link: ""
  },

]

const socials = [
  {
    src: "/images/icon/icon-medium.png",
    link: ""
  },
  {
    src: "/images/icon/icon-twitter.png",
    link: ""
  },
  {
    src: "/images/icon/icon-discord.png",
    link: ""
  },
  {
    src: "/images/icon/icon-listen.png",
    link: ""
  },
  {
    src: "/images/icon/icon-telegram.png",
    link: ""
  },

]

export default function FooterHome() {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  const dispatch = useDispatch()
  const { setting } = useSelector((state) => state);
  const { library } = setting;

  const isMobile = useResponsive("down", "sm");
  const isTablet = useResponsive("down", "lg");

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  // };


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
              <Box component={'img'} src="/logo.png" width={isMobile ? 250 : '100%'} maxWidth={300} />
            </Box>
            <LogoSPlabs
              width={'150px'}
              sx={{ marginTop: '1rem', marginBottom: '0.5rem' }}
            />
            <Typography variant="body1" sx={{
              fontSize: ".9rem",
              textAlign: isMobile && 'center',
              padding: isMobile && '0 10%',
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
                <a href='mailto:business@gate-keeper.io' target="_blank" rel="noreferrer">
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
            {/* <div>
              <WhitePaperButton onClick={handleClick}>
                {library.key_7}&nbsp;&nbsp;
                <span
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "6px solid transparent",
                    borderRight: "6px solid transparent",
                    borderTop: "6px solid #fee8e2",
                  }}
                ></span>
              </WhitePaperButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {whitepaper.map((item) => (
                  <MenuItem
                    key={item.url}
                    onClick={handleCloseMenu}
                    sx={{
                      "& a": {
                        color: "#0a0a0a",
                        textDecoration: "none",
                        display: "inline-flex",
                      },
                    }}
                  >
                    <a href={item.url} target="_blank" rel="noreferrer">
                      <IconLang component={"img"} src={item.icon} />
                      {item.lang}
                    </a>
                  </MenuItem>
                ))}
              </Menu>
            </div> */}
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
              <LogoSPlabs
                width={'90px'}
              />
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
              {library.key_19}
            </FooterTitle>
            <SocialBox>
              {socials.map((item, index) => (
                <Box key={index} component='a' href={item.link}>
                  <Box component='img' src={item.src} />
                </Box>
              ))}
            </SocialBox>
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
