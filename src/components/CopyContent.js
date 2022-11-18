import PropTypes from "prop-types";
// icons
import { IconFolders } from "@tabler/icons";
// @mui
import { Grid, IconButton, Stack, Typography } from "@mui/material";

// thirtpaty
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Popup from "./Popup";
import { useState } from "react";

// ----------------------------------------------------------------------

CopyContent.propTypes = {
  children: PropTypes.node,
  text: PropTypes.string,
  ellipsis: PropTypes.bool,
  length: PropTypes.number,
};

export default function CopyContent({
  children,
  text,
  ellipsis,
  to,
  hideButton,
  confirmMessage,
  length = 5,
  ...other
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const handleCopy = () => {
    if (confirmMessage) {
      setShowConfirm(true);
    } else {
      toast.success("Copied");
    }
  };

  return text ? (
    <Grid container width="100%">
      <Grid item xs={12}>
        <Stack
          direction={"row"}
          flexGrow={1}
          alignItems="center"
          justifyContent="space-between"
          {...other}
        >
          <Stack
            direction={"row"}
            sx={{
              cursor: "pointer",
              maxWidth: `calc(100% - ${!hideButton ? "40px" : "0px"})`,
            }}
            onClick={() => (to ? window.open(to) : null)}
          >
            {/* {text.length > 15 ? (
              <Typography variant="body">{fAddress(text)}</Typography>
            ) : (
              <> */}
            <Typography variant="body" noWrap>
              {text.slice(0, text.length - length)}
            </Typography>
            <Typography variant="body">
              {text.slice(text.length - length, text.length)}
            </Typography>
            {/* </>
            )} */}
          </Stack>
          {!hideButton && (
            <CopyToClipboard text={text} onCopy={() => handleCopy()}>
              <IconButton color="primary" sx={{ padding: "0 8px" }}>
                <IconFolders stroke={2} size={"1.2rem"} />
              </IconButton>
            </CopyToClipboard>
          )}
        </Stack>
      </Grid>
      {confirmMessage && (
        <Popup open={showConfirm} onClose={() => setShowConfirm(false)}>
          <Stack
            alignItems="center"
            sx={{ width: "cacl(90vw + 50px)", maxWidth: "450px" }}
          >
            <Typography variant="h5" sx={{ color: "#54C7EF" }}>
              Copied
            </Typography>
            <Typography margin={"2rem 0px"}>{confirmMessage}</Typography>
          </Stack>
        </Popup>
      )}
    </Grid>
  ) : null;
}
