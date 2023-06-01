import { Close } from "@mui/icons-material";
import { Backdrop, Box, Fade, IconButton, Modal, styled } from "@mui/material";
import React from "react";

const CustomBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  backgroundImage: 'linear-gradient(180deg, rgba(104, 230, 184, 0.2), rgba(109, 133, 218, 0.2))!important',
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
  '& svg': {
    color: '#fff9'
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
      sx={{ zIndex: 999999 }}
    >
      <Fade in={open}>
        <CustomBox p={p}>
          {isShowCloseButton && (
            <CloseButton onClick={_close}>
              <Close />
            </CloseButton>
          )}
          {children}
        </CustomBox>
      </Fade>
    </Modal>
  );
}
