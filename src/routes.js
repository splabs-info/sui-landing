import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts';
import ComingSoon from './pages/ComingSoon';
import HomepageV2 from './pages/Homepage-v2';
import IDOLaunchpad from './pages/IDOLaunchpad';
import NotFound from './pages/Page404';
import StakingPage from './pages/StakingPage';
import Whitepaper from './pages/Whitepaper';
// import FreeMinting from 'pages/FreeMinting';
import Claims from 'pages/Claims';
import ClaimsDetail from 'pages/ClaimsDetail';
import PreSales from 'pages/PreSales';
import SwapPage from 'modules/swap/SwapPage';
import Bridge from 'modules/bridge/Bridge';
import FreeMinting from 'pages/FreeMinting';

const Login = React.lazy(() => import('./pages/Login'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfile'));
// const IDODetail = React.lazy(() => import('./pages/IDODetail'));
const Affiliate = React.lazy(() => import('./pages/Affiliate'));
const TXUIIDO = React.lazy(() => import('./pages/IDO/TXUI'));
const INOLaunchPad = React.lazy(() => import('./pages/INOLaunchPad'));

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <ClientLayout />,
      children: [
        { path: '/', element: <HomepageV2 /> },
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
              {/* <FreeMinting /> */}
              <ComingSoon />
            </Suspense>
          ),
        },
        {
          path: 'ido-launchpad/:projectId',
          element: (
            <Suspense>
              <TXUIIDO />
            </Suspense>
          ),
        },
        {
          path: 'pre-sales',
          element: (
            <Suspense>
              <PreSales />
            </Suspense>
          ),
        },
        {
          path: 'claim-tokens',
          element: (
            <Suspense>
              <Claims />
            </Suspense>
          ),
        },
        {
          path: '/claim-tokens/:projectId',
          element: (
            <Suspense>
              <ClaimsDetail />
            </Suspense>
          ),
        },
        {
          path: 'staking',
          element: <StakingPage />,
        },
        {
          path: 'whitepaper',
          element: <Navigate to="/whitepaper/introduction-of-yousui" />,
        },
        {
          path: 'whitepaper/:sub',
          element: <Whitepaper />,
        },
        {
          path: 'swap',
          element: <SwapPage />,
        },
        {
          path: 'bridge',
          element: <Bridge />,
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
