import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { round } from 'lodash';
const CircleBox = styled(Box)(({ theme }) => ({
    height: '260px',
    width: '260px',
    position: 'relative',
    padding: '25px',
}));
const InnerCircleBox = styled(Box)(({ theme }) => ({
    height: '210px',
    width: '210px',
    borderRadius: '50%',
    border: '8px solid #336E76',
    boxShadow: '0px 0px 20px #68A9B140, inset 0px 0px 20px #68A9B140',
}));
const OuterCircleBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    '& svg': {
        transform: 'rotate(270deg)',
        height: '240px',
        width: '240px',
    },
    '& circle': {
        boxShadow: '0px 0px 15px #68A9B1, inset 0px 0px 15px #68A9B1',
    },
}));
const PercentBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
}));

export const ProcessCircleBox = ({ radius, percent, totalSold, totalSupply }) => {
    let widthInner, widthOuter, width, perimeter, perProcess;
    if (radius) {
        widthInner = 2 * radius + 10;
        widthOuter = 2 * radius + 40;
        width = 2 * radius + 60;
        perimeter = 2 * Math.PI * radius;
        perProcess = perimeter - perimeter * (percent / 100);
    }

    return (
        <CircleBox
            sx={{
                height: radius ? width : '260px',
                width: radius ? width : '260px',
            }}
        >
            <InnerCircleBox
                sx={{
                    height: radius ? widthInner : '210px',
                    width: radius ? widthInner : '210px',
                }}
            />
            <PercentBox>
                <Typography variant="h5">{totalSold ? round((totalSold / totalSupply) * 100, 2) : 0}%</Typography>
            </PercentBox>
            <OuterCircleBox>
                <svg
                    style={{
                        height: radius ? widthOuter : '240px',
                        width: radius ? widthOuter : '240px',
                    }}
                >
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#6D85DA" />
                            <stop offset="100%" stopColor="#68E5B8" />
                        </linearGradient>
                    </defs>
                    <circle
                        cx={radius ? radius + 20 : '120'}
                        cy={radius ? radius + 20 : '120'}
                        r={radius ? radius : '100'}
                        stroke="url(#grad1)"
                        strokeWidth="16px"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={radius ? perimeter : '628'} // 2r pi
                        strokeDashoffset={radius ? perProcess : '157'} // 2r pi - 2r pi * 50%
                    />
                </svg>
            </OuterCircleBox>
        </CircleBox>
    );
};
