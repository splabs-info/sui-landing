// TradingViewWidget.jsx
import { Box } from '@mui/material';
import { memo, useEffect, useRef } from 'react';

function TradingViewWidget({ coin }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.style.ccsText = `.js-copyright-label: {display: none};`;
    script.innerHTML = JSON.stringify({
      symbol: `PYTH:${coin}USD`,
      locale: 'en',
      dateRange: '1D',
      colorTheme: 'dark',
      isTransparent: true,
      autosize: false,
      width: 600,
      height: 200,
      largeChartUrl: '',
      noTimeScale: true,
      chartOnly: true,
    });
    container.current.appendChild(script);
  }, []);

  return (
    <Box
      sx={{ '&.tradingview-widget-copyright': { display: 'none' } }}
      class="tradingview-widget-container"
      id={'trading-view'}
      ref={container}
    >
      <div class="tradingview-widget-container__widget"></div>
    </Box>
  );
}

export default memo(TradingViewWidget);
