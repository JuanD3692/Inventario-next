"use client";
import { memo, useCallback, useState } from "react";
import { CardContent, Typography, Box, IconButton } from "@mui/material";
import { motion } from "framer-motion"; // Importar framer-motion
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InventoryIcon from "@mui/icons-material/Inventory";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

const MotionCard = motion.div;

const ProductCard = ({ product, onDelete, onEdit, onCopy }) => {
  const { id, codigo, nombre, descripcion, cantidad, creacion } = product;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const handleDeleteClick = useCallback((e) => {
    e.stopPropagation(); // Detener la propagación del evento
    setConfirmDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setConfirmDialogOpen(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    onDelete(id);
    setConfirmDialogOpen(false);
  }, [id, onDelete]);

  const handleCardClick = useCallback(() => {
    onEdit(product);
  }, [product, onEdit]);

  const handleCopyClick = useCallback(
    (e) => {
      e.stopPropagation();
      onCopy(product);
    },
    [product, onCopy]
  );

  const formattedDate = new Date(creacion).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        whileHover={{
          y: -8,
          boxShadow: "0 20px 40px rgba(79, 70, 229, 0.1)",
          scale: 1.01,
          borderColor: "rgba(99, 102, 241, 0.2)",
        }}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1px solid rgba(229, 231, 235, 0.8)",
          borderRadius: 12,
          maxWidth: "400px",
          margin: "0 auto",
          position: "relative",
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
          cursor: "pointer",
        }}
        onClick={handleCardClick}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.4 }}
          style={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
          }}
        />

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Código: {codigo}
              </Typography>
              <Typography
                variant="h6"
                component="h3"
                sx={{ fontWeight: 600, color: "text.primary" }}
              >
                {nombre}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                aria-label="Copiar producto"
                onClick={handleCopyClick}
                size="small"
                sx={{
                  color: "primary.light",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: "rgba(99, 102, 241, 0.08)",
                  },
                }}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>

              <IconButton
                aria-label="Eliminar producto"
                onClick={handleDeleteClick}
                size="small"
                sx={{
                  color: "text.disabled",
                  "&:hover": {
                    color: "error.main",
                    bgcolor: "rgba(239, 68, 68, 0.08)",
                  },
                }}
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {descripcion}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "text.secondary",
              fontSize: "0.875rem",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <InventoryIcon fontSize="small" />
              <Typography variant="body2">
                Stock: {cantidad} unidades
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">{formattedDate}</Typography>
            </Box>
          </Box>
        </CardContent>
      </MotionCard>

      <DeleteConfirmationDialog
        open={confirmDialogOpen}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        productName={nombre}
      />
    </>
  );
};

export default memo(ProductCard);
