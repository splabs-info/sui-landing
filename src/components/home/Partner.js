import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { ImgTitleBox, TitleBox, TypographyGradient } from 'components/home/HomeStyles';

const ContainerPartner = styled(Box)(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gap: '1rem',
  gridTemplateColumns: 'repeat(6, 1fr)',
  '& a': {
    background: "url('/images/home/new-frame.svg')",
    backgroundSize: '100% 100%',
    minHeight: '90px',
    margin: '2px',
    backgroundRepeat: 'no-repeat',
    padding: '0px 16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
    gridTemplateColumns: 'repeat(2, 1fr)',
    '& a': {
      padding: '8px 16px',
      height: '64px',
    },
  },
}));

const CustomLogo = styled('img')(() => ({
  transition: 'transform 150ms ease-in-out',
  display: 'block',
  padding: '1rem',
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
  { label: 'flowx', link: 'https://flowx.finance' },
  { label: 'abex', link: 'https://abex.fi/' },
  { label: 'cetus', link: 'https://www.cetus.zone/' },
  { label: 'pyth', link: 'https://pyth.network/' },
  { label: 'coin98', link: 'https://coin98.net/' },
  { label: 'vmeta', link: 'https://vmeta3.com/' },
  { label: 'giro', link: 'https://giroswap.com/' },
  { label: 'notifi', link: 'https://notifi.network/' },
  { label: 'bucket', link: 'https://bucketprotocol.io/' },
  { label: 'umi', link: 'https://umi.ag/swap' },
  { label: 'sui-game', link: 'https://suigame.io/' },
  { label: 'mises', link: 'https://www.mises.site/' },
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
            >
              <CustomLogo src={`./images/partners/${partner.label}.svg`} alt={partner.label} />
            </a>
          ))}
        </ContainerPartner>
      </Box>
    </Container>
  );
}
