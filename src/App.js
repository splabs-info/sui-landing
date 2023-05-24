import {
    WalletProvider as SUIWalletProvider,
    SuiDevnetChain,
    SuiTestnetChain,
    SuiWallet,
    SuietWallet,
} from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import BackgroundJob from './components/common/BackgroundJob';
import ScrollToTop from './components/common/ScrollToTop';
import ShowErrorComponent from './components/common/ShowErrorComponent';
import { WalletProvider } from './hooks/use-connect';
import Routers from './routes';
// import { _changeLanguage } from './store/setting/settingActions';
import './styles/index.css';
import './styles/suiet-wallet-kit-custom.css';
import ThemeProvider from './theme';
import { SUIWalletContext } from 'provider/SuiProvider';
const queryClient = new QueryClient();

const SupportedChains = [SuiDevnetChain, SuiTestnetChain];

export default function App() {
    // const dispatch = useDispatch();

    // useEffect(() => {
    // dispatch(_changeLanguage(localStorage.getItem('lang')));
    // console.log("Version: 0.0.2")
    // }, []);

    useEffect(() => {
        localStorage.removeItem('lang');
    }, []);

    return (
        <ThemeProvider>
            <SUIWalletProvider defaultWallets={[SuiWallet, SuietWallet]} chains={SupportedChains}>
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
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </ThemeProvider>
    );
}
