import {
  Box, Container,
} from "@mui/material";
import { RoadmapBox, RoadmapList, RoadmapTitle, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";
import { IconDiscountCheck } from "@tabler/icons";


const RoadmapContent = [
  {
    title: 'Q4-2022',
    content: [
      'Idea Formation',
      'Team Formation',
      'Website Development',
      'XUI Tokenomics',
      'YouSUI Pitch Deck',
      'Core Platform',
      'Development',
    ],
    status: true
  },
  {
    title: 'Q1-2023',
    content: [
      'Core Platform',
      'Finalization',
      'Seed & Private',
      'Sale Round Public Sale Round',
      'YouSUI',
      'Contract Development',
      'Contract Audit',
      'YouSUI Free',
      'Launchpad',
      'YouSUI Swap',
    ]
  },
  {
    title: 'Q2-2023',
    content: [
      'Marketing Strategy',
      'Incubation Program',
      'YouSUI First IDO',
      'Seeding for Partners',
      'Seeking for Uncubated',
      'Startups',
    ]
  },
  {
    title: 'Q3-2023',
    content: [
      'SUIXLaunch',
      'OneMarket',
      'NFTs Launchpad',
      'YouSUI First INO',
      'YouSUI First IGO',
      'YouSUI OneFam',
      'function development',

    ]
  },
  {
    title: 'Q4-2023',
    content: [
      'Oneverse Idea Formation',
    ]
  },

]


export default function Roadmap() {
  const isDesktop = useResponsive("up", "md");


  return (
    <Box id="Roadmap" pt={isDesktop ? 6 : 3} pb={10}>
      <Container>
        <TitleBox sx={{
          marginBottom: isDesktop ? '5rem' : '1rem',
        }}>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3.5rem' : '2rem',
            fontFamily: "SVN-Gilroy-heavy",
          }}>
            ROADMAP
          </TypographyGradient>
          <Box component={'p'} sx={{ color: 'white' }}>
            What stage are we at?
          </Box>
        </TitleBox>
        {RoadmapContent.map((item, index) => (
          isDesktop ?
            (<RoadmapBox key={index}>
              <Box sx={{ width: '40%' }} className='Roadmap-Content' >
                <RoadmapTitle>
                  {item.title}  {item.status && <img src="/images/home/check.png" width='40px' alt="" />}
                </RoadmapTitle>
                <RoadmapList>
                  {item.content.map((text, j) => (
                    <li key={j}> {text}</li>
                  ))}
                </RoadmapList>
              </Box>
              <Box sx={{ width: '20%' }}>
                <img src="/images/home/line-map.png" alt="" />
              </Box>
              <Box sx={{ width: '40%' }} />
            </RoadmapBox>)
            : (
              <RoadmapBox key={index}>
                <Box sx={{ width: '100%' }} className='Roadmap-Content' >
                  <RoadmapTitle>
                    {item.title}
                  </RoadmapTitle>
                  <RoadmapList>
                    {item.content.map((text, j) => (
                      <li key={j}> {text}</li>
                    ))}
                  </RoadmapList>
                </Box>
              </RoadmapBox>
            )
        ))}
      </Container>
    </Box>
  );
}


