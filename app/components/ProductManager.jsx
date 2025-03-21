"use client";
import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Dialog,
} from "@mui/material";
import {
  Search as SearchIcon,
  Add as AddIcon,
  Sort as SortIcon,
  FilterAlt as FilterAltIcon,
  Close as CloseIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import { gradients } from "../theme/theme";
import CustomSnackbar from "./CustomSnackbar";
import { useSnackbar } from "../hooks/useSnackbar";
import ProductFilter from "./ProductFilter";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    sortBy: "creacion",
    sortOrder: "asc",
    searchTerm: "",
  });
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const { snackbar, hideSnackbar, showSuccess, showError } = useSnackbar();

  const addProduct = useCallback(
    (newProduct) => {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...newProduct,
          id: Date.now(),
          creacion: new Date().toISOString(),
        },
      ]);
      showSuccess(
        `El producto "${newProduct.nombre}" ha sido agregado correctamente.`
      );
    },
    [showSuccess]
  );

  const deleteProduct = useCallback(
    (productId) => {
      const productToDelete = products.find(
        (product) => product.id === productId
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      if (productToDelete) {
        showSuccess(
          `El producto "${productToDelete.nombre}" ha sido eliminado.`
        );
      }
    },
    [products, showSuccess]
  );

  const editProduct = useCallback(
    (updatedProduct) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      showSuccess(
        `El producto "${updatedProduct.nombre}" ha sido actualizado.`
      );
    },
    [showSuccess]
  );

  const copyProduct = useCallback(
    (productToCopy) => {
      const newProduct = {
        ...productToCopy,
        id: Date.now(),
        nombre: `${productToCopy.nombre} (Copia)`,
        creacion: new Date().toISOString(),
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      showSuccess(`Se ha creado una copia de "${productToCopy.nombre}".`);
    },
    [showSuccess]
  );

  const handleFilterChange = useCallback((newCriteria) => {
    setFilterCriteria((prev) => ({ ...prev, ...newCriteria }));
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filterCriteria.searchTerm) {
      const searchLower = filterCriteria.searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchLower) ||
          product.descripcion.toLowerCase().includes(searchLower)
      );
    }

    result.sort((a, b) => {
      const { sortBy, sortOrder } = filterCriteria;
      const multiplier = sortOrder === "asc" ? 1 : -1;

      switch (sortBy) {
        case "nombre":
          return multiplier * a.nombre.localeCompare(b.nombre);
        case "creacion":
          return multiplier * a.creacion.localeCompare(b.creacion);
        case "stock":
          // Convertir a número para asegurar comparación numérica correcta
          const stockA = Number(a.cantidad) || 0;
          const stockB = Number(b.cantidad) || 0;
          return multiplier * (stockA - stockB);
        default:
          return 0;
      }
    });

    return result;
  }, [products, filterCriteria]);

  const handleOpenAddModal = useCallback(() => {
    setModalMode("add");
    setEditingProduct(null);
    setOpenAddModal(true);
  }, []);

  const handleOpenEditModal = useCallback((product) => {
    setModalMode("edit");
    setEditingProduct(product);
    setOpenAddModal(true);
  }, []);

  const handleOpenCopyModal = useCallback((product) => {
    setModalMode("copy");
    setEditingProduct(product);
    setOpenAddModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpenAddModal(false);
    setEditingProduct(null);
  }, []);

  const renderSnackbar = useMemo(
    () => (
      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        autoHideDuration={snackbar.autoHideDuration}
        onClose={hideSnackbar}
      />
    ),
    [snackbar, hideSnackbar]
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#ffffff",
        position: "relative",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box
          sx={{
            position: "relative",
            left: 0,
            mb: 5,
            width: "100%",
            zIndex: 1100,
            backdropFilter: gradients.headerBlur,
            WebkitBackdropFilter: gradients.headerBlur,
            borderBottom: "1px solid",
            borderColor: "rgba(229, 231, 235, 0.5)",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
              width: "100%",
              borderBottom: "none",
              background: "transparent",
            }}
          >
            <Toolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  py: 1,
                  px: { xs: 2, md: "15vw" },
                }}
              >
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.primary",
                  }}
                >
                  <RedeemOutlinedIcon sx={{ color: "primary.main" }} />
                  Inventario
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleOpenAddModal}
                  sx={{
                    boxShadow: 1,
                    "&:hover": { boxShadow: 2 },
                    transition: "all 0.2s",
                  }}
                >
                  Nuevo Producto
                </Button>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </motion.div>

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          pb: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              border: 0,
              borderRadius: 3,
              mx: 2,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
            }}
          >
            <ProductFilter
              criteria={filterCriteria}
              onFilterChange={handleFilterChange}
            />
          </Paper>
        </motion.div>

        <Box sx={{ mt: 3, px: 2, pb: 10 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={filterCriteria.searchTerm + filteredProducts.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProductList
                products={filteredProducts}
                onDeleteProduct={deleteProduct}
                onEditProduct={handleOpenEditModal}
                onCopyProduct={handleOpenCopyModal}
              />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Container>

      <AnimatePresence>
        {openAddModal && (
          <Dialog
            open={openAddModal}
            fullWidth
            keepMounted={false}
            PaperProps={{
              sx: {
                width: { xs: "100%", sm: 500 },
                borderRadius: 2,
                maxHeight: "85vh",
                overflow: "auto",
                margin: { xs: 2, sm: "auto" },
              },
            }}
            scroll="paper"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  bgcolor: modalMode === "edit" ? "info.main" : "primary.main",
                  position: "sticky",
                  top: 0,
                  zIndex: 10,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {modalMode === "edit" ? (
                    <EditIcon sx={{ color: "white" }} />
                  ) : modalMode === "copy" ? (
                    <ContentCopyIcon sx={{ color: "white" }} />
                  ) : (
                    <AddIcon sx={{ color: "white" }} />
                  )}
                  <Typography
                    variant="h2"
                    sx={{ fontWeight: 600, color: "white" }}
                  >
                    {modalMode === "edit"
                      ? "Editar Producto"
                      : modalMode === "copy"
                      ? "Copiar Producto"
                      : "Nuevo Producto"}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    color: "white",
                    "&:hover": { color: "rgba(255,255,255,0.8)" },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 3 }}
                >
                  {modalMode === "edit"
                    ? "Modifique los detalles del producto a continuación."
                    : modalMode === "copy"
                    ? "Revise los detalles del producto copiado."
                    : "Complete los detalles del producto a continuación."}{" "}
                  Todos los campos son obligatorios.
                </Typography>

                <ProductForm
                  onAddProduct={addProduct}
                  onEditProduct={editProduct}
                  onClose={handleCloseModal}
                  product={editingProduct}
                  mode={modalMode === "copy" ? "copy" : modalMode}
                />
              </Box>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>

      {renderSnackbar}
    </Box>
  );
};

export default ProductManager;
