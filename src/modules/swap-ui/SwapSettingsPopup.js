import CustomModal from "components/common/CustomModal";
import { TypographyGradient } from "components/home-v2/HomeStyles";
import { SettingBox, SlippageBox, SlippageSwitch } from "./SwapStyles";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { GradientShadowTypography } from "components/common/CustomTypography";
import React from "react";
const slippageList = [
    { label: "0.1%", value: "0.1" },
    { label: "0.5%", value: "0.5" },
    { label: "1.0%", value: "1" },
    { label: "Custom", value: "custom" },
]
export function SwapSettings({ open, handleClose, ...props }) {
    const [slippageValue, setSlippageValue] = React.useState(0);
    const [slippageAuto, setSlippageAuto] = React.useState(false);
    return (
        <CustomModal
            open={open}
            _close={handleClose}
            isShowCloseButton={true}
        >
            <Box textAlign={'left'} mb={2}>
                <TypographyGradient variant="h3">Setting</TypographyGradient>
            </Box>
            <SettingBox>
                <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mb={4}>
                    <Box textAlign={'left'}>
                        <Typography color={'white'} variant="h6">Automatic Slippage Tolerance</Typography>
                        <Typography color={'white'} variant="body2">Turn off automatic slippage toleranceto adjust the value</Typography>
                    </Box>
                    <SlippageSwitch
                        onChange={(e) => setSlippageAuto(e.target.checked)}
                    />
                </Stack>
                {!slippageAuto && <>
                    <Divider />
                    <Stack direction="row" justifyContent={'space-between'} alignItems={'center'} mt={4}>
                        <Typography color={'white'} variant="h6">Slippage</Typography>
                        <Typography color={'white'} variant="h6">{slippageValue === "custom" ? "--" : slippageValue} %</Typography>
                    </Stack>
                    <SlippageBox>
                        {slippageList.map((slippage) => (
                            <Stack
                                width={"25%"}
                                minWidth={"max-content"}
                                key={slippage.value}
                                className={slippageValue === slippage.value ? "active" : ""}
                                onClick={() => {
                                    setSlippageValue(slippage.value);
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "#9997"
                                    }}
                                >
                                    {slippage.label}
                                </Typography>

                            </Stack>
                        ))}
                    </SlippageBox>
                </>}
            </SettingBox>
        </CustomModal>
    )
}