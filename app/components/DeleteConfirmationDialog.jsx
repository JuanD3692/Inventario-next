"use client";
import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Importar framer-motion
import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  productName,
}) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: "hidden",
              border: 1,
              borderColor: "grey.100",
              boxShadow: "0 20px 70px -10px rgba(0,0,0,0.15)",
              maxWidth: 480,
            },
            component: motion.div,
            initial: { opacity: 0, scale: 0.9, y: 20 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.95, y: 10 },
            transition: { duration: 0.3 },
          }}
        >
          <DialogContent sx={{ px: 4, py: 4 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: 88,
                    height: 88,
                    mx: "auto",
                    mb: 1,
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      delay: 0.2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: `${theme.palette.error.light}20`,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: 0,
                        left: 4,
                      }}
                    >
                      <ErrorOutlineIcon
                        sx={{
                          fontSize: 40,
                          color: "error.main",
                        }}
                      />
                    </Box>
                  </motion.div>

                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 4,
                      right: 0,
                      bgcolor: "error.main",
                      borderRadius: "50%",
                      width: 28,
                      height: 28,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{
                        fontSize: 16,
                        color: "white",
                      }}
                    />
                  </Box>
                </Box>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Box sx={{ maxWidth: 400, width: "100%" }}>
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: 600,
                        color: "text.primary",
                        mb: 1.5,
                      }}
                    >
                      ¿Eliminar producto?
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        lineHeight: 1.6,
                      }}
                    >
                      Estás a punto de eliminar{" "}
                      <Box
                        component="span"
                        sx={{ fontWeight: 500, color: "text.primary" }}
                      >
                        "{productName}"
                      </Box>
                      . Esta acción no se puede deshacer y el producto será
                      eliminado permanentemente.
                    </Typography>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </DialogContent>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <Box
              sx={{
                px: 4,
                py: 2.5,
                bgcolor: "grey.50",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "flex-end",
                gap: 1.5,
              }}
            >
              <Button
                onClick={onClose}
                variant="outlined"
                sx={{
                  order: { xs: 2, sm: 1 },
                  bgcolor: "white",
                  borderColor: "grey.200",
                  color: "text.primary",
                  borderRadius: 3,
                  textTransform: "none",
                  py: 1.25,
                  "&:hover": {
                    bgcolor: "grey.50",
                    borderColor: "grey.300",
                  },
                  "&:focus": {
                    boxShadow: `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.grey[200]}`,
                  },
                }}
              >
                Cancelar
              </Button>
              <Button
                onClick={onConfirm}
                variant="contained"
                sx={{
                  order: { xs: 1, sm: 2 },
                  bgcolor: "error.main",
                  color: "white",
                  borderRadius: 3,
                  textTransform: "none",
                  py: 1.25,
                  "&:hover": {
                    bgcolor: "error.dark",
                  },
                  "&:focus": {
                    boxShadow: `0 0 0 2px ${theme.palette.background.paper}, 0 0 0 4px ${theme.palette.error.main}`,
                  },
                }}
              >
                Eliminar producto
              </Button>
            </Box>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default memo(DeleteConfirmationDialog);
