"use client";
import { forwardRef, memo, useEffect, useState } from "react";
import {
  Snackbar,
  Box,
  Typography,
  IconButton,
  Paper,
  LinearProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const snackbarColors = {
  success: "#66cdaa",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
};

const snackbarIcons = {
  success: <CheckIcon />,
  error: <ErrorOutlineIcon />,
  warning: <WarningAmberIcon />,
  info: <InfoOutlinedIcon />,
};

const TimerProgressBar = ({ duration, isRunning, onComplete }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isRunning) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = 100 - (elapsed / duration) * 100;

      if (newProgress <= 0) {
        clearInterval(timer);
        setProgress(0);
        onComplete?.();
      } else {
        setProgress(newProgress);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [duration, isRunning, onComplete]);

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        "& .MuiLinearProgress-bar": {
          transition: "none",
        },
      }}
    />
  );
};

const SnackbarContent = forwardRef(
  ({ message, type = "success", onClose, duration }, ref) => {
    const color = snackbarColors[type] || snackbarColors.success;
    const icon = snackbarIcons[type] || snackbarIcons.success;

    return (
      <Paper
        ref={ref}
        elevation={4}
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: "384px",
          height: "96px",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "white",
          position: "relative",
        }}
      >
        <Box
          sx={{
            width: "16px",
            height: "100%",
            bgcolor: color,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              height: "100%",
              width: "8px",
              background: `url("data:image/svg+xml,%3Csvg width='16' height='96' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z' fill='${encodeURIComponent(
                color
              )}' stroke='${encodeURIComponent(
                color
              )}' stroke-width='2' stroke-linecap='round'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            },
          }}
        />

        <Box
          sx={{
            flex: 1,
            px: 2.5,
            py: 1.5,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              color: color,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              lineHeight: 1.5,
              mb: 0.5,
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} !
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              maxHeight: "2.5rem",
              lineHeight: 1.25,
            }}
          >
            {message}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "48px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            pt: 1.5,
          }}
        >
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: "grey.400",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.04)",
                color: "grey.600",
              },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <TimerProgressBar
          duration={duration}
          isRunning={true}
          onComplete={onClose}
        />
      </Paper>
    );
  }
);

SnackbarContent.displayName = "SnackbarContent";

const CustomSnackbar = ({
  open,
  message,
  type = "success",
  autoHideDuration = 6000,
  onClose,
}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.offsetHeight;
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      sx={{
        "& .MuiSnackbar-root": { maxWidth: "100%" },
      }}
      TransitionComponent={TransitionComponent}
    >
      <motion.div
        initial={{ opacity: 0, x: -100, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -100, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <SnackbarContent
          message={message}
          type={type}
          onClose={onClose}
          duration={autoHideDuration}
        />
      </motion.div>
    </Snackbar>
  );
};

const TransitionComponent = (props) => {
  const { children, in: inProp } = props;
  if (!inProp) return null;
  return children;
};

export default memo(CustomSnackbar);
