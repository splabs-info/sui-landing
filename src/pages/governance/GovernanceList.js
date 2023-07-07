import { Box, Grid, Typography } from '@mui/material';
import { ImgTitleBox, TextTypography } from 'components/home/HomeStyles';
import { GovernanceCard } from './GovernanceCard';

const governanceList = [
  {
    title: 'Suggestion ↗',
    avatar: '/images/governance/gov-1.jpg',
    description: 'Have an idea to improve YouSUI? Share it with us! Your suggestions can shape the future Of YouSUI.',
    link: '/suggestion',
    status: false,
    linkName: 'Suggest Now',
    startTime: '2023-06-10T11:00:00',
    endTime: '2023-06-10T12:00:00',
  },
  {
    title: 'Snapshot ↗',
    avatar: '/images/governance/gov-2.jpg',
    description: 'A snapshot is taken on the last day of each month to enable the distribution of wXUI tokens.',
    link: '/staking',
    status: false,
    linkName: 'Stake XUI',
    startTime: '2023-06-10T11:00:00',
    endTime: '2023-06-10T12:00:00',
  },
  {
    title: 'Governance  ↗',
    avatar: '/images/governance/gov-3.jpg',
    description: 'Voting within the YouSUI Governance system is only possible using wXUI tokens.',
    link: '/governance',
    status: false,
    linkName: 'Vote Now',
    startTime: '2023-06-10T11:00:00',
    endTime: '2023-06-10T12:00:00',
  },
  {
    title: 'Result ↗',
    avatar: '/images/governance/gov-4.jpg',
    description: 'Empower YouSUI with your suggestions. Vote using wXUI tokens in our Governance system. ',
    link: '/governance',
    status: false,
    linkName: 'Previous Governance',
    startTime: '2023-06-10T11:00:00',
    endTime: '2023-06-10T12:00:00',
  },
];
export default function GovernanceList() {
  return (
    <Box mb={10} mt={10} position="relative">
      <ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" sx={{ top: '-10px', width: '90px' }} />
      <Typography sx={{ color: '#21DAD1', marginLeft: '32px' }} variant="h3">
        Shape the future of YouSUI.
      </Typography>

      <TextTypography mt={2} ml={'32px'}>
        Join our governance apps and influence the protocol's evolution.
      </TextTypography>
      <Grid container spacing={5} mt={2}>
        {governanceList.map((item, index) => (
          <Grid item md={6} xs={12} key={index}>
            <GovernanceCard {...item} key={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
