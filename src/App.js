import {
  WalletProvider as SUIWalletProvider,
  SuiDevnetChain,
  SuiMainnetChain,
  SuiTestnetChain,
  SuiWallet,
  SuietWallet,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import BackgroundJob from './components/common/BackgroundJob';
import ScrollToTop from './components/common/ScrollToTop';
import ShowErrorComponent from './components/common/ShowErrorComponent';
import { WalletProvider } from './hooks/use-connect';
import Routers from './routes';
// import { _changeLanguage } from './store/setting/settingActions';
import { SUIWalletContext } from 'provider/SuiProvider';
import React from 'react';
import './styles/index.css';
import './styles/suiet-wallet-kit-custom.css';
import ThemeProvider from './theme';
const queryClient = new QueryClient();


const SupportedChains = [SuiTestnetChain, SuiDevnetChain, SuiMainnetChain];

export default function App() {
  React.useEffect(() => {
    console.log('Version: 0.0.5 - Free-minting-2');
    localStorage.removeItem('lang');
  }, []);

  return (
    <ThemeProvider>
      <SUIWalletProvider defaultWallets={[SuiWallet, SuietWallet]} chains={SupportedChains} autoConnect>
        <SUIWalletContext>
          <WalletProvider>
            <QueryClientProvider client={queryClient}>
              <ScrollToTop />
              <BaseOptionChartStyle />

              <Routers />

              <ShowErrorComponent />
              <BackgroundJob />
            </QueryClientProvider>
          </WalletProvider>
        </SUIWalletContext>
      </SUIWalletProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </ThemeProvider>
  );
}
