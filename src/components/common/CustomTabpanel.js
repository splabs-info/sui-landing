import PropTypes from 'prop-types';
// import { Box } from '@mui/material';
import { Box, Grid,Container,Button,Stack,Typography,Divider } from "@mui/material";
// ----------------------------------------------------------------------

CustomTabpanel.propTypes = {
  // src: PropTypes.string.isRequired,
  props: PropTypes.any,
};

export default function CustomTabpanel({ props }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
