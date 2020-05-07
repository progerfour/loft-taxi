import React, { useEffect } from "react";
import { Button, Snackbar, IconButton } from "@material-ui/core/";
import CloseIcon from "@material-ui/icons/Close";

const ErrorMessage = ({ errorMessage }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(!errorMessage == "");
  }, [errorMessage]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message={errorMessage}
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default ErrorMessage;
