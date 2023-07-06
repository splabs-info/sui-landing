import { Box, Container, Grid } from "@mui/material";
import Page from "components/common/Page";
import { ImgTitleBox, SectionBox, TextTypography, TitleBox, TypographyGradient } from "components/home/HomeStyles";
import useResponsive from "hooks/useResponsive";
import GovernanceList from "./GovernanceList";


export default function Governance() {

	const isMobile = useResponsive('down', 'sm');
	return (
		<Page title="Governance">
			<SectionBox
				sx={{
					backgroundImage: "url('/images/background/homebg56.png')",
					paddingTop: isMobile && 5,
				}}
			>
				<Box
					component={'img'}
					src="/images/background/bg-governance.png"
					sx={{
						position: 'absolute',
						width: '100%',
						mixBlendMode: 'lighten',
						top: isMobile ? 120 : -120,
					}}
				/>
				<Container maxWidth={'lg'}>
					<Box mb={5} mt={15} position="relative">
						<ImgTitleBox component={'img'} src="/images/home/shape.png" alt="" sx={{ top: '-40px' }} />
						<TitleBox>
							<TypographyGradient>THE GOVERNANCE</TypographyGradient>
						</TitleBox>

					</Box>
					<TextTypography variant={'body1'} width={'100%'} paddingLeft={isMobile ? 0 : 15}>
						YouSUI introduces its unique Governance System, built upon the staking of XUI tokens. By staking XUI tokens, users trigger the issuance of wXUI tokens on the first day of each month, proportional to the staked amount.
					</TextTypography>
					<Box
						component={'img'}
						src="/images/governance/gov.png"
						sx={{
							width: '100%',
							mixBlendMode: 'lighten',
						}}
					/>
					<GovernanceList />
				</Container>
			</SectionBox>
		</Page>
	);
}
