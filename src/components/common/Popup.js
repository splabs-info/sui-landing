import PropTypes from "prop-types";
// @mui
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Collapse } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Icon
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";


const SubContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: 0, left: 0,
  width: "100%",
  background: "#fff",
  zIndex: 1000,
  borderRadius: "10px 10px 0px 0px",

}));

const Popup = ({ children, open = false, title = null, subContent = null, openSubContent = false, onClose, sx = {}, ...other }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeSubContent, setActiveSubContent] = useState(false)
  useEffect(() => {
    if (openSubContent === true) {
      setActiveSubContent(true)
    } else {
      setTimeout(() => {
        setActiveSubContent(false)
      }, 200);
    }
  }, [openSubContent])
  return (
    <>
      <Dialog
        open={Boolean(open)}
        onClose={onClose}
        fullScreen={fullScreen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={"md"}
        className={activeSubContent ? "active-sub-content" : ""}
        sx={{
          "& .MuiPaper-root": {
            ...sx,
          },
          "&.active-sub-content .MuiPaper-root": {
            position: "relative",
            "&:before": {
              content: '""',
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              background: "rgba(0,0,0,0.3)",
              zIndex: 1
            }
          }
        }}
      >
        {title && <DialogTitle>{title}</DialogTitle>}
        <DialogContent sx={{ padding: "0.5rem" }}>
          {children}
        </DialogContent>
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
        <SubContent>
          <Collapse in={openSubContent}>
            <Box padding="1.5rem">
              {
                subContent
              }
            </Box>
          </Collapse>
        </SubContent>
      </Dialog>
    </>
  );
}

Popup.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.node,
};

export default Popup;
