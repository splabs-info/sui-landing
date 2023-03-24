import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts';
// import Homepage from "./pages/Homepage";
import ComingSoon from './pages/ComingSoon';
import HomepageV2 from './pages/Homepage-v2';
import NotFound from './pages/Page404';
import StakingPage from './pages/StakingPage';
import Whitepaper from './pages/Whitepaper';

// ----------------------------------------------------------------------

const Login = React.lazy(() => import('./pages/Login'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfile'));
const Staking = React.lazy(() => import('./pages/IDO'));
export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <ClientLayout />,
            children: [
                // { path: "/", element: <Homepage /> },
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
                    path: 'ido',
                    element: (
                        <Suspense>
                            <Staking />
                        </Suspense>
                    ),
                },
                { path: 'whitepaper', element: <Whitepaper /> },
                { path: 'staking', element: <StakingPage /> },
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
