import { Close } from "@mui/icons-material";
import { Backdrop, Box, Fade, IconButton, Modal, styled } from "@mui/material";
import React from "react";

const CustomBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundImage: 'linear-gradient(160deg, rgba(55, 79, 164, 0.1) 1.97%, rgba(109, 146, 218, 0.2) 46.59%, rgba(72, 204, 188, 0.5) 100%)!important',
  boxShadow: 'inset 0px 0px 30px rgba(255, 255, 255, 0.25)',
  backdropFilter: 'blur(20px)',
  outline: "none",
  color: 'white',
  textAlign: "center",
  maxWidth: 1000,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  borderRadius: 10,
  padding: theme.spacing(4),
  overflowY: "auto",
  maxHeight: "80vh",
  '& .icon-close svg': {
    color: '#fff9'
  },
  ':before': {
    content: "''",
    position: 'absolute',
    background: 'linear-gradient(286.83deg, rgba(255, 255, 255, 0) 0%, rgba(0, 172, 226, 0.596875) 99.99%, rgba(15, 162, 153, 0.6) 100%)',
    inset: '0px',
    zIndex: 0,
    borderRadius: '10px',
    padding: '1px',
    '-webkit-mask':
      'linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px) content-box content-box,linear-gradient(rgb(255, 255, 255) 0px, rgb(255, 255, 255) 0px)',
    '-webkit-mask-composite': 'xor',
  },
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(3),
    width: "600px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.7rem",
    borderRadius: "0px!important",
    padding: theme.spacing(2),
    width: "90%!important",
    ':before': {
      borderRadius: '0px',
    },
  },
}));

const CloseButton = styled(IconButton)({
  position: "absolute",
  top: 0,
  right: 0,
  minWidth: "unset!important",
  marginTop: "0px!important",
  background: "transparent!important",
  borderColor: "transparent!important",
});

export default function CustomModal({
  open,
  isShowCloseButton = false,
  _close,
  children,
  p = 0,
}) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      sx={{
        zIndex: 999999,
        '& .MuiBackdrop-root': {
          backdropFilter: 'blur(2px)',
        }
      }}
    >
      <Fade in={open}>
        <CustomBox p={p}>
          {isShowCloseButton && (
            <CloseButton onClick={_close}>
              <Close className="icon-close" />
            </CloseButton>
          )}
          {children}
        </CustomBox>
      </Fade>
    </Modal>
  );
}
