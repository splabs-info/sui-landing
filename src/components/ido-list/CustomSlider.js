import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SoldBox = styled(Box)(({ theme }) => ({
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '1.5rem',
    padding: '2rem',
    position: 'relative',
    boxShadow: 'rgba(204,204,204,0.4) 0px 0px 15px 0px',
    color: '#28A3AB',
    [theme.breakpoints.down('sm')]: {
        background: 'transparent',
        borderRadius: '0',
        padding: '0',
        position: 'relative',
        boxShadow: 'none',
    },
}));

const CustomSlider = ({
    title,
    color,
    background,
    value,
    max,
    disabledMark,
    disabledBorder,
    style,
    refresh,
    reset,
    ...other
}) => {
    const [marks, setMarks] = useState([]);
    useEffect(() => {
        const step = parseInt(max / 500) - 1;
        var temp = [];
        for (var i = 0; i < step; i++) {
            temp.push((i + 1) * 500);
        }
        setMarks(temp);
    }, [max, value]);

    const BoxStyle = styled(Box)(({ theme }) => ({
        height: '26px',
        borderRadius: '15px',
        // '&::after': {
        //     content: "''",
        //     position: 'absolute',
        //     top: '4px',
        //     height: '15px',
        //     width: '15px',
        //     border: '1px solid #FEF3E0',
        //     borderRadius: '2px',
        //     background: '#FEA59C',
        //     boxShadow: 'white 0 0 5px -1px',
        //     transform: 'rotate(45deg)',
        //     zIndex: '2',
        // },
        '& .horizontal-slider': {
            height: '100%',
            overflow: 'hidden',
            borderRadius: '15px',
            background: background ? background : 'rgba(0,0,0,0.1)',
            '& .example-thumb': {
                display: 'none',
            },
            '& .example-track-0': {
                height: '100%',
                background: `${color ? color : '#C3C9CE'}`,
            },
            '& .example-mark': {
                height: '100%',
                width: '1px',
                background: 'rgba(255,255,255,0.5)',
                '&:nth-of-type(0)': {
                    display: 'none',
                },
            },
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0.5rem 0',
            height: '20px',
            padding: '0px',
            '&::before': {
                borderRadius: '10px',
                padding: ' 1px',
            },
            '&::after': {
                top: '3px',
                height: '15px',
                width: '15px',
            },
        },
    }));

    const CusStask = styled(Stack)({
        width: '100%',
    });

    return (
        <CusStask>
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
        </CusStask>
    );
};

CustomSlider.propTypes = {
    title: PropTypes.object,
    max: PropTypes.number,
    value: PropTypes.number,
    disabledMark: PropTypes.bool,
    style: PropTypes.object,
    refresh: PropTypes.bool,
};

export default CustomSlider;
