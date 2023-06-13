import { Box, Container } from '@mui/material';
import VestingTokens from 'components/claims/VestingTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home/HomeStyles';
import useResponsive from 'hooks/useResponsive';
export default function ClaimsDetail() {

	const isMobile = useResponsive('down', 'sm');
	return (
		<Page title="Vesting Token">
			<SectionBox
				sx={{
					backgroundImage: "url('/images/background/homebg6.png')",
				}}
			>
				<Box component={'img'} src='/images/background/bg-claim-detail.png' sx={{
					position: 'absolute',
					width: '100%',
					mixBlendMode: 'lighten',
					top: isMobile ? 120 : 40,
				}} />
				<Container maxWidth={'xl'}>
					<VestingTokens />
				</Container>
			</SectionBox>
		</Page>
	);
}
