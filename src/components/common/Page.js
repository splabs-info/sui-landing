import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
    <>
        <Helmet>
            <title>{`${title} | YouSUI`}</title>
            {meta}
        </Helmet>

        <Box
            sx={{
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
            ref={ref}
            {...other}
        >
            {children}
        </Box>
    </>
));

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    meta: PropTypes.node,
};

export default Page;
