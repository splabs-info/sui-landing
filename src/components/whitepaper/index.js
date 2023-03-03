import { Box, Container, Divider, Tab, Tabs, alpha } from '@mui/material';
import PropTypes from 'prop-types';
import useResponsive from '../../hooks/useResponsive';
import { wppContent } from './wppContent';
import { NormalText, NormalTextList, TitleText, WppContentBox } from './wppStyled';
import { TitleBox, TypographyGradient } from '../home/HomeStyles';
import { useState } from 'react';
import { IconSquareCheck } from '@tabler/icons';

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
    const isDesktop = useResponsive('up', 'md');
    const isMobile = useResponsive('down', 'sm');
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box pt={isDesktop ? 15 : 10} pb={isDesktop ? 15 : 10}>
            <Container>
                <TitleBox textAlign={'center'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
                    <TypographyGradient
                        sx={{
                            fontSize: isDesktop ? '3rem' : '2rem',
                            fontFamily: 'SVN-Gilroy-heavy',
                        }}
                    >
                        {!isMobile && <>GATEKEEPER</>} WHITEPAPER
                    </TypographyGradient>
                    <Box component="img" src="images/home/line.png" alt="" maxWidth={'50%'} />
                </TitleBox>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: isMobile && 'column',
                        marginTop: !isMobile ? 8 : 5,
                        minHeight: 600,
                        '& .MuiTab-root': {
                            textAlign: 'left',
                            alignItems: 'flex-start',
                        },
                    }}
                >
                    <Tabs
                        orientation={isMobile ? 'horizontal' : 'vertical'}
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        sx={{
                            borderRight: 1,
                            borderColor: 'divider',

                            mb: isMobile && 3,
                            minWidth: isDesktop ? 150 : 100,
                            '& button': { color: alpha('#fff', 0.7) },
                        }}
                    >
                        {wppContent.map((item, i) => (
                            <Tab label={item.category} key={i} />
                        ))}
                    </Tabs>
                    {wppContent.map((item, i) => (
                        <TabPanel value={value} key={i} index={i} style={{ width: '100%' }}>
                            <WppContentBox>
                                <TitleText variant="h3" pt={'0!important'}>
                                    {item.category}
                                </TitleText>
                                <Divider sx={{ borderColor: '#D0C4FC', opacity: 0.7, mb: 2, mt: 1 }} />
                                {item.description.map((desc, j) => (
                                    <Box key={j}>
                                        <TitleText variant="h5" color="secondary">
                                            {desc.title}
                                        </TitleText>
                                        {desc?.subtitle && (
                                            <TitleText variant="body1" pt={'8px!important'} sx={{ textIndent: '1rem' }}>
                                                {desc.subtitle}
                                            </TitleText>
                                        )}
                                        {desc?.content &&
                                            desc?.content.map((text, m) => (
                                                <NormalText variant={'body2'} key={m}>
                                                    {text}
                                                </NormalText>
                                            ))}
                                        {desc?.list && (
                                            <ul className={desc?.checklist ? 'CheckList' : ''}>
                                                {desc?.list.map((text, n) => (
                                                    <li key={n}>
                                                        <NormalTextList variant={'body1'}>{text}</NormalTextList>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </Box>
                                ))}
                            </WppContentBox>
                        </TabPanel>
                    ))}
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
