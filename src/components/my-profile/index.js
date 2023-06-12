/* eslint-disable jsx-a11y/alt-text */
import { Box, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useWallet } from '@suiet/wallet-kit';
import { CreateProfilePopup } from 'components';
import { SectionBox } from 'components/home-v2/HomeStyles';
import { WalletContext } from 'hooks/use-connect';
import { isNull } from 'lodash';
import React, { useContext, useState } from 'react';
import { useGetProfile, useLogin } from 'services/auth';
import { setAccessToken } from 'utils/auth';
import { ClaimAvailable } from './ClaimAvailable';
import { CurrentStakingPool } from './CurrentStakingPool';
import { IDOParticipated } from './IDOParticipated';
import AreaInformation from './Information';
import { MyIDOArea } from './MyIDO';
import { MyINOArea } from './MyINO';
import OverviewTabs from './OverviewTabs';
import { StakingBalance } from './StakingBalance';
const StyledResponsiveStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('lg')]: {
    flexDirection: 'column',
  },
}));
export default function MyInfo() {
  const [openCreateProfile, setOpenCreateProfile] = React.useState();
  const { address, active } = useContext(WalletContext);
  const wallet = useWallet();
  const [defaultInfo, setDefaultInfo] = useState(null);
  const [id, setId] = useState(null);
  const [flag, setFlag] = React.useState(false);

  const { mutateAsync: login, isLoading: isLoadingLogin, isSuccess: isLoginSuccess } = useLogin();
  const { profile, isLoading: isLoadingGetProfile, isSuccess: isGetProfileSuccess } = useGetProfile(id);

  const fetchData = React.useCallback(async () => {
    const targetAddress = wallet?.address || address;
    if (targetAddress) {
      try {
        const result = await login({ address: targetAddress });
        const { account, token } = result || {};
        setId(account?.ID);
        setAccessToken(token);
        setDefaultInfo(account);
      } catch (error) {
        // Xử lý lỗi ở đây (nếu cần)
      }
    }
  }, [address, login, wallet?.address]);

  React.useEffect(() => {
    if (address || wallet?.address) {
      fetchData();
    }
  }, [address, fetchData, wallet?.address]);

  React.useEffect(() => {
    if (!isNull(id) && isGetProfileSuccess && !isNull(defaultInfo)) {
      setDefaultInfo((prev) => ({ ...prev, ...profile }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  const handleOpen = () => {
    setOpenCreateProfile(true);
  };

  return (
    <>
      <SectionBox
        sx={{
          backgroundImage: "url('/images/background/bg-ido.png')",
        }}
      >
        <Container maxWidth={'xl'}>
          <Stack direction="column">
            {!address && !wallet?.address ? (
              <Box sx={{ display: 'flex', position: 'relative' }}>
                <img
                  src="/token-1.svg"
                  style={{
                    opacity: 0.25,
                    width: 500,
                    height: 500,
                    position: 'absolute',
                    top: '5%',
                    left: '32%',
                  }}
                  atl="token"
                />
                <Typography
                  sx={{
                    margin: '240px auto 190px auto',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 28,
                  }}
                >
                  PLEASE CONNECT WALLET BEFORE
                </Typography>
              </Box>
            ) : (
              <>
                {isLoadingLogin || isLoadingGetProfile || !isLoginSuccess ? (
                  <CircularProgress sx={{ margin: '128px auto 128px auto' }} />
                ) : (
                  <>
                    <StyledResponsiveStack direction="row" sx={{ marginBottom: 12 }}>
                      {!isNull(defaultInfo) && (
                        <AreaInformation onOpen={handleOpen} DATA_DEFAULT={defaultInfo} id={id} />
                      )}
                      <OverviewTabs />
                    </StyledResponsiveStack>

                    <Stack direction="column">
                      <Stack
                        direction="row"
                        sx={{
                          marginBottom: 12,
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                        }}
                      >
                        <IDOParticipated />
                        <CurrentStakingPool />
                      </Stack>

                      <StakingBalance />
                      <MyIDOArea />
                      <MyINOArea />
                      <ClaimAvailable />
                    </Stack>
                  </>
                )}
              </>
            )}
          </Stack>
        </Container>
      </SectionBox>
      <CreateProfilePopup
        open={openCreateProfile}
        handleClose={setOpenCreateProfile}
        data={defaultInfo}
        id={id}
        handleRefresh={() => setFlag(!flag)}
        setDefaultInfo={setDefaultInfo}
      />
    </>
  );
}
