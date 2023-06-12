import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home-v2/HomeStyles';

const ContainerPartner = styled(Box)(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gap: '1rem',
  gridTemplateColumns: 'repeat(6, 1fr)',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

const CustomLogo = styled('img')(() => ({
  transition: 'transform 150ms ease-in-out',
  padding: 0,
  display: 'block',
}));

const partners = [
  {
    label: 'navi',
    link: 'https://www.naviprotocol.io/',
  },
  {
    label: 'turbos',
    link: 'https://turbos.finance/',
  },
  {
    label: 'suiet',
    link: 'https://suiet.app/',
  },
  {
    label: 'move-studio-ide',
    link: 'https://www.movestudio.dev/',
  },
  {
    label: 'scallop',
    link: 'https://www.scallopx.com/',
  },
  {
    label: 'movement',
    link: '/',
  },
  {
    label: 'suiglobal',
    link: 'https://suiglobal.com/',
  },
  {
    label: 'okx',
    link: 'https://www.okx.com/',
  },
  {
    label: 'okx-wallet',
    link: 'https://www.okx.com/web3',
  },
  {
    label: 'suins',
    link: 'https://suins.io/',
  },
  {
    label: 'interest',
    link: 'https://interestprotocol.io/',
  },
  {
    label: 'bitkeep',
    link: 'https://bitkeep.com/',
  },
  {
    label: 'bc-vs',
    link: 'https://blockvision.org/',
  },
  {
    label: 'releap',
    link: 'https://releap.xyz/',
  },
  {
    label: 'loa',
    link: 'https://legendofarcadia.io/',
  },
  {
    label: 'suia',
    link: 'https://suia.io/',
  },
  { label: 'wormhole', link: 'https://wormhole.com/' },
  { label: 'movebit', link: 'https://www.movebit.xyz/' },
  { label: 'vedao', link: 'https://www.vedao.com/' },
  { label: 'cubic', link: 'https://www.cubicgames.xyz/home' },
];

export default function Partner() {
  return (
    <Container maxWidth={'xl'}>
      <Box mb={20}>
        <Box mb={5} sx={{ position: 'relative' }}>
          <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" />
          <TitleBox>
            <TypographyGradient>Partner</TypographyGradient>
          </TitleBox>
        </Box>
        <ContainerPartner mt={10}>
          {partners.map((partner, index) => (
            <a
              href={partner.link}
              target="_blank"
              rel="noreferrer"
              key={index}
              style={{
                background: "url('/images/home/new-frame.svg')",
                backgroundSize: '100% 100%',
                margin: '0.1rem',
                backgroundRepeat: 'no-repeat',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '80px',
              }}
            >
              <CustomLogo src={`./images/partners/${partner.label}.svg`} alt={partner.label} />
            </a>
          ))}
        </ContainerPartner>
      </Box>
    </Container>
  );
}
