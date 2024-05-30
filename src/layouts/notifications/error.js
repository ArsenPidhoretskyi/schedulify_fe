import { useState } from "react";
import MDSnackbar from "../../components/MDSnackbar";

// eslint-disable-next-line react/prop-types
export default function ErrorNotification({ title, message, dateTime, errorSB, closeErrorSB }) {
  return (
    <MDSnackbar
      color="error"
      icon="warning"
      title={title}
      content={message}
      dateTime={dateTime}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
}
