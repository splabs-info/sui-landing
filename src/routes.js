import Bridge from 'modules/bridge/Bridge';
import FreeMinting from 'modules/free-minting/FreeMinting';
import IDORound from 'modules/ido-round';
import StakingFarming from 'modules/staking/OverallPage';
import SwapV3Page from 'modules/swap-v3/SwapV3Page';
import React, { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ClientLayout from './layouts';
import ComingSoon from './pages/ComingSoon';
import Homepage from './pages/Homepage';
import IDOLaunchpad from './pages/IDOLaunchpad';
import NotFound from './pages/Page404';
import Whitepaper from './pages/Whitepaper';
import Claims from 'pages/Claims';
import ClaimsDetail from 'pages/ClaimsDetail';

const Login = React.lazy(() => import('./pages/Login'));
const MyProfilePage = React.lazy(() => import('./pages/MyProfile'));
const IDODetail = React.lazy(() => import('./pages/IDODetail'));
const TXUIIDO = React.lazy(() => import('./pages/IDO/TXUI'));
const INOLaunchPad = React.lazy(() => import('./pages/INOLaunchPad'));

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <ClientLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        {
          path: 'ido-launchpad',
          element: (
            <Suspense>
              <IDOLaunchpad />
            </Suspense>
          ),
        },
        {
          path: 'ido-launchpad/round',
          element: (
            <Suspense>
              <IDORound />
            </Suspense>
          ),
        },
        // {
        //   path: 'ido-launchpad/sua',
        //   element: (
        //     <Suspense>
        //       <IDODetail />
        //     </Suspense>
        //   ),
        // },
        // {
        //   path: 'ido-launchpad/:projectId',
        //   element: (
        //     <Suspense>
        //       <TXUIIDO />
        //     </Suspense>
        //   ),
        // },
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
          path: 'whitepaper',
          element: <Navigate to="/whitepaper/introduction-of-yousui" />
        },
        {
          path: 'whitepaper/:sub',
          element: <Whitepaper />
        },
        {
          path: 'staking',
          element: (
            <StakingFarming />
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
        {
          path: 'my-profile',
          element: (
            <Suspense>
              <MyProfilePage />
            </Suspense>
          ),
        },
        {
          path: 'claim-tokens',
          element: (
            <Suspense>
              <Claims />
              {/* <ComingSoon /> */}
            </Suspense>
          ),
        },
        {
          path: '/claim-tokens/:projectId',
          element: (
            <Suspense>
              <ClaimsDetail />
              {/* <ComingSoon /> */}
            </Suspense>
          ),
        },
        {
          path: '/nft-marketplace',
          element: (
            <Suspense>
              <ComingSoon />
            </Suspense>
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