import {
  Box, Container,
} from "@mui/material";
import { RoadmapBox, RoadmapList, RoadmapTitle, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";


const RoadmapContent = [
  {
    title: 'Q3-2022',
    content: [
      'Idea Formation',
      'Team Formation',
      'Website Development',
      'Gatekeeper Tokenomics',
      'Gatekeeper Pitch Deck',
      'Core Platform',
      'Development',
    ]
  },
  {
    title: 'Q4-2022',
    content: [
      'Core Platform',
      'Finalization',
      'Seed & Private',
      'Sale Round Public Sale Round',
      'Gatekeeper',
      'Contract Development',
      'Contract Audit',
      'Gatekeeper Free',
      'Launchpad',
      'Gatekeeper Swap',
    ]
  },
  {
    title: 'Q1-2023',
    content: [
      'Marketing Strategy',
      'Incubation Program',
      'Gatekeeper First IDO',
      'Seeding for Partners',
      'Seeking for Uncubated',
      'Startups',
    ]
  },
  {
    title: 'Q3-2023',
    content: [
      'GatekeeperXLaunch',
      'OneMarket',
      'NFTs Launchpad',
      'Gatekeeper First INO',
      'Gatekeeper First IGO',
      'Gatekeeper OneFam',
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
          }}> ROADMAP
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
                  {item.title}
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


