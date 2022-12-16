import { Box, Container, } from "@mui/material";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { ContainerProject, ProjectBox, SeeMoreButton, TitleBox, TypographyGradient } from "./HomeStyles";
import useResponsive from "../../hooks/useResponsive";


const CustomLogo = styled("img")(() => ({
  transition: "transform 150ms ease-in-out",
  padding: 0,
  display: "block",
  maxHeight: '60px',
  margin: '2rem 0',
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const projects = [
  {
    label: "stepwatch",
    link: "https://stepwatch.io/",
  },
  {
    label: "infinity",
    link: "https://infinityangel.io/",
  },
  {
    label: "airtnt",
    link: "https://airtnt.io/",
  },
  {
    label: "comingsoon",
    link: "/coming-soon",
  },
  {
    label: "comingsoon",
    link: "/coming-soon",
  },
  {
    label: "comingsoon",
    link: "/coming-soon",
  },

];

export default function Projects() {
  const isDesktop = useResponsive("up", "md");
  const { setting } = useSelector((state) => state);
  const { library } = setting;
  return (
    <Box pt={10} pb={isDesktop ? 10 : 5}>
      <Container>
        <TitleBox>
          <TypographyGradient sx={{
            fontSize: isDesktop ? '3rem' : '2rem',
            fontFamily: "SVN-Gilroy-regular",
          }}>
            <span style={{
              fontFamily: "SVN-Gilroy-heavy",
            }}> PROJECTS WILL</span> BE SUPPORTED
          </TypographyGradient>
          <Box component={'p'} sx={{ color: 'white' }}>
            Bring new technology to our community
          </Box>

        </TitleBox>
        <ContainerProject mt={4}>
          {projects.map((project, index) =>

            <ProjectBox key={index}>
              <img
                src={`./images/projects/project-${project.label}.png`}
                alt={project.label}
              />
              <CustomLogo
                src={`./images/projects/logo-${project.label}.png`}
                alt={project.label}
                width={'80%'}
              />
              <SeeMoreButton href={project.link} target="_blank">
                See More ...
              </SeeMoreButton>
            </ProjectBox>
          )}
        </ContainerProject>
      </Container>
    </Box>
  );
}
