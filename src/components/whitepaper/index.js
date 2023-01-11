
import { Box, Container, Divider, Tab, Tabs } from "@mui/material";
import PropTypes from 'prop-types';
import useResponsive from "../../hooks/useResponsive";
import { wppContent } from "./wppContent";
import { NormalText, TitleText } from "./wppStyled";
import { TitleBox, TypographyGradient } from "../home/HomeStyles";
import { useState } from "react";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}
export default function WhitepaperContent() {
  const isDesktop = useResponsive("up", "md");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box pt={isDesktop ? 15 : 10} pb={isDesktop ? 15 : 10}>
      <Container>
        <TitleBox textAlign={'center'}>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3rem' : '2rem',
            fontFamily: "SVN-Gilroy-regular",
          }}>About
            <span style={{
              fontFamily: "SVN-Gilroy-heavy",
            }}> GATEKEEPER
            </span>
          </TypographyGradient>
        </TitleBox>
        <Box
          sx={{
            flexGrow: 1, display: 'flex', marginTop: 8, minHeight: 600,
            "& .MuiTab-root": {
              textAlign: 'left',
              alignItems: "flex-start",
            }
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', minWidth: 150 }}
          >
            {wppContent.map((item, i) =>
              <Tab label={item.category} key={i} />
            )}
          </Tabs>
          {wppContent.map((item, i) =>
            <TabPanel value={value} key={i} index={i}>
              <Box ml={5}>
                <TitleText variant="h3" pt={'0!important'}>
                  {item.category}
                </TitleText>
                <Divider sx={{ borderColor: 'deepskyblue', opacity: 0.7, mb: 2, mt: 1 }} />
                {item.description.map((desc, j) =>
                  <Box key={j}>
                    <TitleText variant="h5" >
                      {desc.title}
                    </TitleText>
                    {desc?.content && desc?.content.map((text, m) =>
                      <NormalText variant={'body1'} key={m}>
                        {text}
                      </NormalText>
                    )}
                    {desc?.list &&
                      <ul style={{ paddingLeft: 32 }}>
                        {desc?.list.map((text, n) =>
                          <li key={n}>
                            <NormalText variant={'body1'} >
                              {text}
                            </NormalText>
                          </li>
                        )}
                      </ul>
                    }
                  </Box>
                )}
              </Box>
            </TabPanel>
          )}

        </Box>
        {/* 
        {wppContent.map((item, i) =>
          <Box key={i} mt={2}>
            <TitleText variant="h2" >
              {item.category}
            </TitleText>
            <Divider sx={{ borderColor: 'deepskyblue', opacity: 0.7, mb: 2, mt: 1 }} />
            {item.description.map((desc, j) =>
              <Box key={j}>
                <TitleText variant="h5" >
                  {desc.title}
                </TitleText>
                {desc?.content && desc?.content.map((text, m) =>
                  <NormalText variant={'body1'} key={m}>
                    {text}
                  </NormalText>
                )}
                {desc?.list &&
                  <ul>
                    {desc?.list.map((text, n) =>
                      <li key={n}>
                        <NormalText variant={'body1'} >
                          {text}
                        </NormalText>
                      </li>
                    )}
                  </ul>
                }
              </Box>
              )}
          </Box>
        )} */}

      </Container>
    </Box>
  );
}
