import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider'
// @mui
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------


const CustomSlider = ({ title = '', color, background, value, max, disabledMark, disabledBorder, style, refresh, reset, ...other }) => {
    const [marks, setMarks] = useState([])
    useEffect(() => {
        const step = parseInt(max / 500) - 1
        var temp = []
        for (var i = 0; i < step; i++) {
            temp.push((i + 1) * 500)
        }
        setMarks(temp)
    }, [max, value])

    const BoxStyle = styled(Box)({
        borderRadius: "50px",
        border: disabledBorder ? "" : `1px solid ${color ? color : "#C3C9CE"}`,
        padding: "1px",
        "& .horizontal-slider": {
            height: "100%",
            overflow: "hidden",
            borderRadius: "50px",
            background: background ? background : "rgba(0,0,0,0.1)",
            "& .example-thumb": {
                display: "none"
            },
            "& .example-track-0": {
                height: "100%",
                background: `${color ? color : "#C3C9CE"}`
            },
            "& .example-mark": {
                height: "100%",
                width: "1px",
                background: "rgba(255,255,255,0.5)",
                "&:nth-of-type(0)": {
                    display: "none"
                }
            }
        }
    });

    return (
        <Stack width="100%" >
            {title}
            <BoxStyle {...other}>
                <ReactSlider
                    className="horizontal-slider"
                    marks={disabledMark ? null : marks}
                    markClassName="example-mark"
                    value={value}
                    min={0}
                    max={max}
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    disabled
                />
            </BoxStyle>
        </Stack>
    )
};

CustomSlider.propTypes = {
    title: PropTypes.string,
    max: PropTypes.number,
    value: PropTypes.number,
    disabledMark: PropTypes.bool,
    style: PropTypes.object,
    refresh: PropTypes.bool
};

export default CustomSlider;
