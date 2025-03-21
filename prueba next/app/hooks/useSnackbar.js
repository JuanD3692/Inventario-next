"use client";
import { useState, useCallback } from "react";

export const useSnackbar = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
    autoHideDuration: 6000,
  });

  const showSnackbar = useCallback(
    (message, type = "success", autoHideDuration = 6000) => {
      setSnackbar({
        open: true,
        message,
        type,
        autoHideDuration,
      });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  const showSuccess = useCallback(
    (message) => showSnackbar(message, "success"),
    [showSnackbar]
  );
  const showError = useCallback(
    (message) => showSnackbar(message, "error"),
    [showSnackbar]
  );

  return {
    snackbar,
    hideSnackbar,
    showSuccess,
    showError,
  };
};
