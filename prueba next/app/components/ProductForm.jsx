"use client";
import { useState, useCallback, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Inventory as PackageIcon,
  Description as FileTextIcon,
  Archive as ArchiveIcon,
} from "@mui/icons-material";
import validator from "validator";

const initialFormState = {
  codigo: "",
  nombre: "",
  descripcion: "",
  cantidad: "",
};

const MAX_DESCRIPTION_LENGTH = 350;

const ProductForm = ({
  onAddProduct,
  onEditProduct,
  product,
  onClose,
  mode = "add",
}) => {
  // Inicializar formData según el modo y si hay producto
  const [formData, setFormData] = useState(() => {
    if ((mode === "edit" || mode === "copy") && product) {
      return {
        codigo: product.codigo.toString(),
        nombre: mode === "copy" ? `${product.nombre} (Copia)` : product.nombre,
        descripcion: product.descripcion,
        cantidad: product.cantidad.toString(),
      };
    }
    return initialFormState;
  });
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);
  const [charCountProgress, setCharCountProgress] = useState(0);

  // Actualizar contador de caracteres cuando cambia la descripción
  useEffect(() => {
    setCharCount(formData.descripcion.length);
    setCharCountProgress(
      (formData.descripcion.length / MAX_DESCRIPTION_LENGTH) * 100
    );
  }, [formData.descripcion]);

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Si es el campo código, validar que solo sean dígitos
      if (name === "codigo" && value !== "" && !validator.isNumeric(value)) {
        return; // No actualizar el estado si no es numérico
      }

      // Si es descripción, limitar a MAX_DESCRIPTION_LENGTH caracteres
      if (name === "descripcion" && value.length > MAX_DESCRIPTION_LENGTH) {
        setFormData((prev) => ({
          ...prev,
          [name]: value.slice(0, MAX_DESCRIPTION_LENGTH),
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Limpiar error cuando se modifica un campo
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.codigo) {
      newErrors.codigo = "El código es obligatorio";
    } else if (!validator.isNumeric(formData.codigo)) {
      newErrors.codigo = "El código debe contener solo números";
    }

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
    }

    if (!formData.cantidad) {
      newErrors.cantidad = "La cantidad es obligatoria";
    } else if (
      !validator.isNumeric(formData.cantidad) ||
      Number(formData.cantidad) < 0
    ) {
      newErrors.cantidad = "La cantidad debe ser un número positivo";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      if (validateForm()) {
        // Convertir a los tipos de datos correctos
        const productData = {
          codigo: Number(formData.codigo),
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          cantidad: Number(formData.cantidad),
        };

        if (mode === "edit" && product) {
          onEditProduct({
            ...productData,
            id: product.id,
            creacion: product.creacion,
          });
        } else {
          // Para "add" y "copy", usamos onAddProduct
          onAddProduct(productData);
        }

        setFormData(initialFormState);
        if (onClose) onClose();
      }
    },
    [
      formData,
      validateForm,
      onAddProduct,
      onEditProduct,
      mode,
      product,
      onClose,
    ]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{ width: "100%" }}
    >
      <Stack spacing={4}>
        {/* Código del Producto */}
        <Box>
          <Typography
            variant="body2"
            component="label"
            htmlFor="codigo"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
            }}
          >
            <EditIcon sx={{ fontSize: 16, mr: 1, color: "grey.400" }} />
            Código del Producto (solo números)
          </Typography>
          <TextField
            fullWidth
            id="codigo"
            name="codigo"
            type="text"
            value={formData.codigo}
            onChange={handleChange}
            error={!!errors.codigo}
            helperText={errors.codigo}
            placeholder="Ej: 12345"
            variant="outlined"
            size="small"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*", // Para teclados móviles mostrar teclado numérico
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.2s",
                "&.Mui-focused": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                },
              },
            }}
          />
        </Box>

        {/* Nombre del Producto */}
        <Box>
          <Typography
            variant="body2"
            component="label"
            htmlFor="nombre"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
            }}
          >
            <PackageIcon sx={{ fontSize: 16, mr: 1, color: "grey.400" }} />
            Nombre del Producto
          </Typography>
          <TextField
            fullWidth
            id="nombre"
            name="nombre"
            type="text"
            value={formData.nombre}
            onChange={handleChange}
            error={!!errors.nombre}
            helperText={errors.nombre}
            placeholder="Ej: Laptop HP Pavilion"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.2s",
                "&.Mui-focused": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                },
              },
            }}
          />
        </Box>

        {/* Descripción con contador de caracteres */}
        <Box>
          <Typography
            variant="body2"
            component="label"
            htmlFor="descripcion"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
            }}
          >
            <FileTextIcon sx={{ fontSize: 16, mr: 1, color: "grey.400" }} />
            Descripción
          </Typography>
          <TextField
            fullWidth
            id="descripcion"
            name="descripcion"
            multiline
            rows={4}
            value={formData.descripcion}
            onChange={handleChange}
            error={!!errors.descripcion}
            helperText={errors.descripcion}
            placeholder="Describe las características del producto..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.2s",
                "&.Mui-focused": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                },
              },
            }}
          />
          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 2 }}>
            <LinearProgress
              variant="determinate"
              value={charCountProgress}
              sx={{
                flexGrow: 1,
                height: 6,
                borderRadius: 3,
                backgroundColor: "grey.200",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    charCount > MAX_DESCRIPTION_LENGTH * 0.9
                      ? "error.main"
                      : charCount > MAX_DESCRIPTION_LENGTH * 0.7
                      ? "warning.main"
                      : "success.main",
                },
              }}
            />
            <Typography
              variant="caption"
              color={
                charCount > MAX_DESCRIPTION_LENGTH * 0.9
                  ? "error"
                  : "text.secondary"
              }
              sx={{
                fontWeight:
                  charCount > MAX_DESCRIPTION_LENGTH * 0.9 ? 600 : 400,
              }}
            >
              {charCount}/{MAX_DESCRIPTION_LENGTH}
            </Typography>
          </Box>
        </Box>

        {/* Cantidad en Stock */}
        <Box>
          <Typography
            variant="body2"
            component="label"
            htmlFor="cantidad"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: 500,
              color: "text.primary",
              mb: 1,
            }}
          >
            <ArchiveIcon sx={{ fontSize: 16, mr: 1, color: "grey.400" }} />
            Cantidad en Stock
          </Typography>
          <TextField
            fullWidth
            id="cantidad"
            name="cantidad"
            type="number"
            value={formData.cantidad}
            onChange={handleChange}
            error={!!errors.cantidad}
            helperText={errors.cantidad}
            placeholder="Ej: 100"
            variant="outlined"
            size="small"
            inputProps={{ min: 0 }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                transition: "all 0.2s",
                "&.Mui-focused": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 3px rgba(99, 102, 241, 0.1)",
                },
              },
            }}
          />
        </Box>
      </Stack>

      {/* Footer con botones - Quitar las propiedades que causan problemas de scroll */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 4,
          pt: 3,
          pb: 1,
          bgcolor: "grey.50",
          borderTop: 1,
          borderColor: "grey.100",
          borderRadius: 0, // Quitar border radius que causa problemas
        }}
      >
        <Button
          onClick={onClose}
          type="button" // Asegurar que sea de tipo button para que no envíe el formulario
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            "&:hover": { color: "text.primary" },
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: 1,
            textTransform: "none",
            px: 2,
            py: 1,
            fontSize: "0.875rem",
            fontWeight: 500,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {mode === "edit"
            ? "Actualizar Producto"
            : mode === "copy"
            ? "Crear Copia"
            : "Guardar Producto"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
