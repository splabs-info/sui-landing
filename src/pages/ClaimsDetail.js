import { Container } from '@mui/material';
import Page from 'components/common/Page';
import { SectionBox } from 'components/home-v2/HomeStyles';
export default function ClaimsDetail() {

	return (
		<Page title="Vesting">
			<SectionBox
				sx={{
					backgroundImage: "url('/images/background/homebg6.png')",
				}}
			>
				<Container maxWidth={'xl'}>

				</Container>
			</SectionBox>
		</Page>
	);
}
