import Bridge from 'modules/bridge/Bridge';
import FreeMinting from 'modules/free-minting/FreeMinting';
import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts';
import ComingSoon from './pages/ComingSoon';
import Homepage from './pages/Homepage';
import IDOLaunchpad from './pages/IDOLaunchpad';
import NotFound from './pages/Page404';
import StakingPage from './pages/StakingPage';
import Whitepaper from './pages/Whitepaper';
import SwapV3Page from 'modules/swap-v3/SwapV3Page';
import StakingFarming from 'modules/staking/OverallPage';
import IDORound from 'modules/ido-round';

const Login = React.lazy(() => import('./pages/Login'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfile'));
const IDODetail = React.lazy(() => import('./pages/IDODetail'));
const TestPage = React.lazy(() => import('./pages/Test'));
const INOLaunchPad = React.lazy(() => import('./pages/INOLaunchPad'));

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <ClientLayout />,
            children: [
                { path: '/', element: <Homepage /> },
                {
                    path: 'my-profile',
                    element: (
                        <Suspense>
                            <MyProfilePage />
                        </Suspense>
                    ),
                },
                {
                    path: 'ido-launchpad',
                    element: (
                        <Suspense>
                            <IDOLaunchpad />
                        </Suspense>
                    ),
                },
                {
                    path: 'ino-launchpad',
                    element: (
                        <Suspense>
                            <INOLaunchPad />
                        </Suspense>
                    ),
                },
                {
                    path: 'ino-launchpad/free-minting-nft',
                    element: (
                        <Suspense>
                            <FreeMinting />
                        </Suspense>
                    ),
                },
                {
                    path: 'ido-launchpad/sua',
                    element: (
                        <Suspense>
                            <IDODetail />
                            {/* <ComingSoon /> */}
                        </Suspense>
                    ),
                },
                {
                    path: 'ido-launchpad/round',
                    element: (
                        <Suspense>
                            <IDORound />
                            {/* <ComingSoon /> */}
                        </Suspense>
                    ),
                },
                { path: 'whitepaper/:sub', element: <Whitepaper /> },
                { path: 'whitepaper', element: <Navigate to="/whitepaper/introduction-of-yousui" /> },
                {
                    path: 'staking',
                    element:
                        // <StakingPage />
                        <StakingFarming />
                },
                {
                    path: 'claim-tokens',
                    element: (
                        <Suspense>
                            {/* <Claims /> */}
                            <ComingSoon />
                        </Suspense>
                    ),
                },
                {
                    path: '/claim-tokens/:sub',
                    element: (
                        <Suspense>
                            {/* <ClaimsDetail />*/}
                            <ComingSoon />
                        </Suspense>
                    ),
                },
                {
                    path: 'test-page',
                    element: (
                        <React.Suspense>
                            <TestPage />
                        </React.Suspense>
                    ),
                },
                {
                    path: 'bridge',
                    element: <Bridge />,
                },
                {
                    path: 'swap',
                    element: <SwapV3Page />,
                },
            ],
        },
        {
            path: '/login',
            element: (
                <React.Suspense>
                    <Login />
                </React.Suspense>
            ),
        },
        { path: '404', element: <NotFound /> },
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
