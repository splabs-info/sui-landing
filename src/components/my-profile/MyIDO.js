import { Box, Divider, styled, Typography } from '@mui/material';
import { useWallet } from '@suiet/wallet-kit';
import { investCertificate, TXUI_PROJECT } from 'constant';
import useResponsive from 'hooks/useResponsive';
import { SuiContext } from 'provider/SuiProviderV2';
import React from 'react';
import { findCertificate } from 'utils/util';
import { TitleSection } from './TitleSection';
import { INVEST_CERTIFICATE } from 'onchain/constants'

export const StyledMyIDOBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) -8.02%, rgba(109, 133, 218, 0.3) 98.69%)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '15px',
  padding: '30px 75px',
  display: 'flex',
  justifyContent: 'space-between',
  border: '1px solid #00C5D3',
  alignItems: 'center',
  marginBottom: 24,
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: '24px 48px',
  },
}));

const StyledTitleInfo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white',
  textAlign: 'center',
  fontSize: 24,
  textShadow: '0px 0px 10px rgba(255, 255, 255, 0.5)',
  marginBottom: 24,
}));

const StyledInfo = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '23px',
  textAlign: 'center',
  color: 'white',
}));

const StyledLink = styled('a')(({ theme }) => ({
  '&:hover': {
    color: 'rgba(0, 229, 255, 0.2)',
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  height: 80,
  borderColor: 'rgba(0, 229, 255, 0.2)',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 12,
    marginBottom: 16,
  },
}));

const StyledInfoBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export const MyIDOArea = ({ myIDOs }) => {
  const tablet = useResponsive('down', 'md');

  //   const [myIDOs, setMyIDOs] = React.useState();

  //   const isMobile = useResponsive('down', 'sm');
  //   const wallet = useWallet();
  //   const { provider, projects } = React.useContext(SuiContext);

  //   const fetchData = React.useCallback(async () => {
  //     if (!wallet?.address || !wallet?.connected) return;

  //     const owner = wallet?.address;

  //     const otherObjects = await provider.getOwnedObjects({
  //       owner,
  //       options: { showContent: true },
  //     });

  //     if (otherObjects?.data?.length === 0) return;

  //     const certificateObjects = findCertificate(otherObjects?.data, INVEST_CERTIFICATE);

  //     if (!certificateObjects) return;

  //     const promises = certificateObjects.map(async (item) => {
  //       const certificate = await provider.getObject({
  //         id: item.data.objectId,
  //         options: { showContent: true },
  //       });

  //       const projectFields = certificate?.data?.content?.fields?.project?.fields;

  //       return {
  //         eventName: certificate?.data?.content?.fields?.event_name,
  //         issue_date: certificate?.data?.content?.fields?.issue_date || '',
  //         description: projectFields?.description || '',
  //         discord: projectFields?.discord || '',
  //         image_url: projectFields?.image_url || '',
  //         link_url: projectFields?.link_url || '',
  //         medium: projectFields?.medium || '',
  //         name: projectFields?.name || '',
  //         vesting_id: certificate?.data?.content?.fields?.vesting_id,
  //         project_id: certificate?.data?.content?.fields.id.id || '',
  //         telegram: projectFields?.telegram || '',
  //         twitter: projectFields?.twitter || '',
  //         website: projectFields?.website || '',
  //       };
  //     });

  //     const formattedMyIdo = await Promise.all(promises);

  //     setMyIDOs([...formattedMyIdo]);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [wallet?.address, wallet?.connected]);

  //   React.useEffect(() => {
  //     if (provider && projects) {
  //         fetchData();
  //         // fetchVestingData();
  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchData, projects]);



  return (
    <Box sx={{ marginBottom: 12 }}>
      <TitleSection title="MY IDO PARTICIPATED" />
      {myIDOs?.length !== 0 ? (
        <>
          {myIDOs?.map((item, index) => (
            <StyledMyIDOBox>
              {/* <StyledInfoBox>
                <StyledTitleInfo>Avatar</StyledTitleInfo>
                <img
                  src={item?.image_url}
                  alt=""
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 16,
                    margin: '0 auto',
                  }}
                />
              </StyledInfoBox> */}
              <StyledDivider orientation={tablet ? '' : 'vertical'} />
              <StyledInfoBox>
                <StyledTitleInfo>No</StyledTitleInfo>
                <StyledInfo>{index + 1}</StyledInfo>
              </StyledInfoBox>
              <StyledDivider orientation={tablet ? '' : 'vertical'} />

              <StyledInfoBox>
                <StyledTitleInfo>Project</StyledTitleInfo>
                <StyledInfo>{item?.name}</StyledInfo>
              </StyledInfoBox>
              <StyledDivider orientation={tablet ? '' : 'vertical'} />

              <StyledInfoBox>
                <StyledTitleInfo>Round name</StyledTitleInfo>
                <StyledInfo>{item?.eventName}</StyledInfo>
              </StyledInfoBox>

              <StyledDivider orientation={tablet ? '' : 'vertical'} />

              <StyledInfoBox>
                <StyledTitleInfo>View on explore</StyledTitleInfo>
                <StyledLink href={`https://suiexplorer.com/object/${TXUI_PROJECT}?network=testnet`} target="_blank">
                  View
                </StyledLink>
              </StyledInfoBox>
            </StyledMyIDOBox>
          ))}
        </>
      ) : (
        <StyledMyIDOBox>
          <StyledInfoBox>
            <StyledTitleInfo>It appears that you have not joined any IDOs at this time.</StyledTitleInfo>
          </StyledInfoBox>
        </StyledMyIDOBox>
      )}
    </Box>
  );
};
