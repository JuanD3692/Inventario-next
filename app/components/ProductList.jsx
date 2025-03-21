"use client";
import { memo, useState } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Container,
} from "@mui/material";
import ProductCard from "./ProductCard";
import InventoryIcon from "@mui/icons-material/Inventory";

const MotionContainer = motion(Container);
const MotionPaper = motion(Paper);

const ProductList = ({
  products,
  onDeleteProduct,
  onEditProduct,
  onCopyProduct,
}) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (products.length === 0) {
    return (
      <MotionPaper
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderRadius: 3,
          p: 6,
          textAlign: "center",
          color: "text.secondary",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        }}
      >
        <InventoryIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          No hay productos disponibles.
        </Typography>
        <Typography>Agrega un nuevo producto para comenzar.</Typography>
      </MotionPaper>
    );
  }
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const count = Math.ceil(products.length / rowsPerPage);

  return (
    <Box>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid container spacing={4} sx={{ mb: 15 }}>
          {paginatedProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={4}
              key={product.id}
              sx={{ maxWidth: "420px" }}
            >
              <ProductCard
                product={product}
                onDelete={onDeleteProduct}
                onEdit={onEditProduct}
                onCopy={onCopyProduct}
              />
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {products.length > 0 && (
        <MotionContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          maxWidth="lg"
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            borderRadius: "12px 12px 0 0",
            right: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            height: 64,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            py: 3,
            px: 3,
            borderTop: 1,
            borderColor: "grey.100",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={8} sm={8}>
              <Typography variant="body2" color="text.secondary">
                Mostrando {paginatedProducts.length} de {products.length}{" "}
                productos
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
              <FormControl
                variant="outlined"
                size="small"
                sx={{ minWidth: 120 }}
              >
                <InputLabel id="rows-per-page-label">Por página</InputLabel>
                <Select
                  labelId="rows-per-page-label"
                  id="rows-per-page"
                  value={rowsPerPage}
                  onChange={handleChangeRowsPerPage}
                  label="Por página"
                >
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={12}>12</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid
              item
              sx={{ display: "flex", justifyContent: "center" }}
              xs={12}
              sm={2}
            >
              <Pagination
                count={count}
                page={page}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                size="medium"
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "0.875rem",
                  },
                }}
              />
            </Grid>
          </Grid>
        </MotionContainer>
      )}
    </Box>
  );
};

export default memo(ProductList);
