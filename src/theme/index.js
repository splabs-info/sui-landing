import { CssBaseline } from '@mui/material';
import { createTheme, StyledEngineProvider, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
import typography from './typography';

// import BeVietNamTTF from 'fonts/BeVietnamPro-Light.ttf';
// import BeVietNamRegularTTF from 'fonts/BeVietnamPro-Light.ttf';
// import BeVietNamMediumTTF from 'fonts/BeVietnamPro-Medium.ttf';

// const fontFace = `
//     @font-face {
//         font-family: 'Be Vietnam Regular';
//         src: url(${BeVietNamRegularTTF}) format('TrueType');
//     }
// `;
// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows,
        }),
        []
    );

    const theme = createTheme(themeOptions);
    theme.components = componentsOverride(theme);

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    );
}
