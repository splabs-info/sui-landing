import { Box, Grid, Stack, Typography } from "@mui/material";
import CustomModal from "components/common/CustomModal";
import { TypographyGradient } from "components/home/HomeStyles";

export const Maintenance = ({ open = false }) => {
    return (
        <CustomModal open={open}>
            <Box
                sx={{
                    padding: { xs: 0, sm: '24px' }
                }}
            >
                <Grid container spacing={3} sx={{ textAlign: 'initial' }}>
                    <Grid item xs={12} md={8}>
                        <TypographyGradient variant="h2">MAINTENANCE
                            ANNOUNCEMENT</TypographyGradient>
                        <Stack gap={2} mt={2}>
                            <Typography color="white" >Due to system overload, we will perform maintenance for YouSUI in a few minutes. </Typography>
                            <Typography color="white">We apologize for any inconvenience and hope you understand.
                                We will try to complete the maintenance as soon as possible and notify you when the system is back online. </Typography>
                            <Typography color="white">Thank you for using YouSUI and supporting us.<br />
                                Sincerely,<br />
                                YouSUI team </Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Stack justifyContent={'center'} height={'100%'}>
                            <img src='/images/home/icon-maintain.png' alt="" width={'100%'} />
                        </Stack>
                    </Grid>
                </Grid>

            </Box>
        </CustomModal >
    );
};
