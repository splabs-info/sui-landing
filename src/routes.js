import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts';
import ComingSoon from './pages/ComingSoon';
import HomepageV2 from './pages/Homepage-v2';
import IDOList from './pages/IDOList';
import NotFound from './pages/Page404';
import StakingPage from './pages/StakingPage';
import Whitepaper from './pages/Whitepaper';
// import FreeMinting from './pages/FreeMinting';

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
                { path: '/', element: <HomepageV2 /> },
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
                            <IDOList />
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
                    path: 'ido-launchpad/buy-token',
                    element: (
                        <Suspense>
                            <IDODetail />
                            {/* <ComingSoon /> */}
                        </Suspense>
                    ),
                },
                {
                    path: 'free-nft-claim',
                    element: (
                        <Suspense>
                            {/* <FreeMinting /> */}
                            <ComingSoon />
                        </Suspense>
                    ),
                },
                { path: 'whitepaper/:sub', element: <Whitepaper /> },
                { path: 'whitepaper', element: <Navigate to="/whitepaper/introduction-of-yousui" /> },
                { path: 'staking', element: <StakingPage /> },
                {
                    path: 'test-page',
                    element: (
                        <React.Suspense>
                            <TestPage />
                        </React.Suspense>
                    ),
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
