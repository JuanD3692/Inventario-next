"use client";
import { useCallback, memo } from "react";
import { Box, InputBase, Button, ButtonGroup, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ProductFilter = ({ criteria, onFilterChange }) => {
  const handleSearchChange = useCallback(
    (e) => {
      onFilterChange({ searchTerm: e.target.value });
    },
    [onFilterChange]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Box sx={{ position: "relative" }}>
          <InputBase
            placeholder="Buscar productos por nombre, código o descripción..."
            value={criteria.searchTerm}
            onChange={handleSearchChange}
            sx={{
              pl: 5,
              pr: 2,
              py: 1,
              height: "42px",
              border: 0,
              borderRadius: 2,
              width: "100%",
              bgcolor: "white",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              transition: "box-shadow 0.2s ease-in-out",
              "&:focus-within": {
                boxShadow: "0 4px 12px rgba(79, 70, 229, 0.1)",
              },
            }}
          />
          <SearchIcon
            sx={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "grey.400",
            }}
          />
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: { xs: "center", md: "flex-end" },
        }}
      >
        <ButtonGroup variant="outlined" color="inherit" sx={{ height: "42px" }}>
          <Button
            startIcon={<SortIcon />}
            onClick={() =>
              onFilterChange({
                sortBy:
                  criteria.sortBy === "nombre"
                    ? "creacion"
                    : criteria.sortBy === "creacion"
                    ? "stock"
                    : "nombre",
              })
            }
            sx={{
              px: 3,
              color: "text.secondary",
              borderColor: "grey.200",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              "&:hover": { bgcolor: "grey.50" },
            }}
          >
            {criteria.sortBy === "nombre"
              ? "Por Nombre"
              : criteria.sortBy === "creacion"
              ? "Por Fecha"
              : "Por Stock"}
          </Button>
          <Button
            onClick={() =>
              onFilterChange({
                sortOrder: criteria.sortOrder === "asc" ? "desc" : "asc",
              })
            }
            sx={{
              px: 2,
              color: "text.secondary",
              borderColor: "grey.200",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              "&:hover": { bgcolor: "grey.50" },
            }}
          >
            {criteria.sortOrder === "asc" ? (
              <ArrowUpwardIcon />
            ) : (
              <ArrowDownwardIcon />
            )}
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

export default memo(ProductFilter);
