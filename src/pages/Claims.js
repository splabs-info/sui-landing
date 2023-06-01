
import { Box, Container } from '@mui/material';
import ClaimTokens from 'components/claims/ClaimTokens';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
import useResponsive from 'hooks/useResponsive';

export default function Claims() {
	const isMobile = useResponsive('down', 'sm');

	return (
		<Page title="Claim Tokens">
			<SectionBox
				sx={{
					backgroundImage: "url('/images/background/homebg6.png')",
					paddingTop: isMobile && 5,
				}}
			>
				<Box component={'img'} src='/images/background/bg-claim.png' sx={{
					position: 'absolute',
					width: '100%',
					mixBlendMode: 'lighten',
					top: isMobile ? 120 : 40,
				}} />
				<Container maxWidth={'xl'}>
					<ClaimTokens />
				</Container>
			</SectionBox>
		</Page>
	);
}
