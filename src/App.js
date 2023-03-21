import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { C98Provider } from 'provider/C98Provider';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import BackgroundJob from './components/common/BackgroundJob';
import ScrollToTop from './components/common/ScrollToTop';
import ShowErrorComponent from './components/common/ShowErrorComponent';
import { WalletProvider } from './hooks/use-connect';
import Routers from './routes';
import { _changeLanguage } from './store/setting/settingActions';
import './styles/index.css';
import ThemeProvider from './theme';

const queryClient = new QueryClient();

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(_changeLanguage(localStorage.getItem('lang')));
    }, [dispatch]);

    return (
        <ThemeProvider>
            <WalletProvider>
                {/* <C98Provider> */}
                <QueryClientProvider client={queryClient}>
                    <ScrollToTop />
                    <BaseOptionChartStyle />

                    <Routers />

                    <ShowErrorComponent />
                    <BackgroundJob />
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
                </QueryClientProvider>
                {/* </C98Provider> */}
            </WalletProvider>
        </ThemeProvider>
    );
}
