import styled from '@emotion/styled';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import IcCopy from 'components/asset/icon/IcCopy';
import IcPeople from 'components/asset/icon/IcPeople';
import IcSex from 'components/asset/icon/IcSex';
import IcVerify from 'components/asset/icon/IcVerify';
import { UploadBtn } from 'components/create-profile';
import { UploadAvatar } from 'components/upload-avatar';
import { WalletContext } from 'hooks/use-connect';
import React from 'react';
const WrapperAreaInformation = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(178.73deg, rgba(104, 230, 184, 0.3) 0%, rgba(109, 133, 218, 0.3) 100%, 1)',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  height: '750px',
  padding: '40px',
}));

const DATA_DEFAULT = [
  { titleName: '_', icon: <IcCopy /> },
  { titleName: 'Email', title: 'john_br.son@gmail.com', icon: <MailOutlineIcon color="inherit" /> },
  {
    titleName: 'Day of Birth',
    title: '20.05.1998',
    icon: <IcPeople />,
  },
  { titleName: 'Sex', title: 'john_br.son@gmail.com', icon: <IcSex /> },
];

export default function AreaInformation({ onOpen }) {
  const onUploadAvatar = () => { };

  const { address } = React.useContext(WalletContext);

  console.log('address', address);
  return (
    <WrapperAreaInformation>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <UploadAvatar avatarUrl="" percent={''} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: 4 }}>
          <Typography color={'#ffffff'} variant="h5" align="center">
            YouSUI
          </Typography>
          <IcVerify />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {DATA_DEFAULT.map((el, i) => (
          <Box sx={{ display: 'flex', gap: '8px', color: '#ffffff' }}>
            <span>{el.icon}</span>
            {el.titleName && (
              <Typography color={'#ffffff'} component={'span'} variant="subtitle2" align="center">
                {el.titleName}
              </Typography>
            )}

            {el.title && (
              <Typography
                sx={{ fontWeight: 400 }}
                color={'#ffffff'}
                component={'span'}
                variant="subtitle2"
                align="center"
              >
                {/* {el.title} */}_
              </Typography>
            )}
          </Box>
        ))}
      </Box>

      <Box sx={{ textAlign: 'center', margin: '24px 0' }}>
        <UploadBtn variant="contained" startIcon={<CloudUploadOutlinedIcon />} onClick={onOpen}>
          {/* <StyledInputUpload
                        type="file"
                        accept="image/jpeg,image/png,image/svg,image/gif"
                        multiple
                        onChange={onOpen}
                    /> */}
          Update profile
        </UploadBtn>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Typography
          color={'#ffffff'}
          component={'span'}
          variant="subtitle2"
          align="center"
          sx={{ fontWeight: 'normal', fontStyle: 'italic' }}
        >
          Last signed in _
        </Typography>
      </Box>
    </WrapperAreaInformation>
  );
}
