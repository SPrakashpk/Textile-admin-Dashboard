import React, { useState } from "react";
import {
  Box, Typography, TextField, Button, MenuItem, Select,
  InputLabel, FormControl, Table, TableHead, TableRow, TableCell,
  TableBody, Pagination, TableContainer, Paper, InputAdornment,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import UploadForm from "./UploadForm";
import ProductPreview from "./ProductPreview";

// Sample Stock Data
const stockData = [
  { id: 1, code: "001", category: "Men", subCategory: "T-shirt", product: "Printed T-shirt", date: "07/12/2023", qty: 100 },
  { id: 2, code: "002", category: "Men", subCategory: "Shirt", product: "Formal Shirt", date: "07/12/2023", qty: 200 },
  { id: 3, code: "003", category: "Women", subCategory: "Saree", product: "Cotton Saree", date: "07/12/2023", qty: 300 },
  { id: 4, code: "004", category: "Kids", subCategory: "Shorts", product: "Shorts", date: "07/12/2023", qty: 400 },
  { id: 5, code: "005", category: "Accessories", subCategory: "Belt", product: "Leather Belt", date: "07/12/2023", qty: 500 },
  { id: 6, code: "006", category: "Women", subCategory: "Kurthi", product: "Anarkali", date: "07/12/2023", qty: 250 },
  { id: 7, code: "007", category: "Kids", subCategory: "T-shirt", product: "Cartoon T-shirt", date: "07/12/2023", qty: 150 },
  { id: 8, code: "008", category: "Accessories", subCategory: "Cap", product: "Sports Cap", date: "07/12/2023", qty: 300 },
  { id: 9, code: "009", category: "Men", subCategory: "Pant", product: "Track Pants", date: "07/12/2023", qty: 180 },
  { id: 10, code: "010", category: "Women", subCategory: "Shawl", product: "Wool Shawl", date: "07/12/2023", qty: 220 },
];

const categories = ["All", "Men", "Women", "Kids", "Accessories"];

const Stocks = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const [viewMode, setViewMode] = useState("table"); // "table", "form", "preview"
  const [productData, setProductData] = useState(null);
  const [variantData, setVariantData] = useState(null);

  const handleAddMore = (id) => {
    alert(`Add more stock for ID: ${id}`);
  };

  const handleFormSubmit = (product, variants) => {
    setProductData(product);
    setVariantData(variants);
    setViewMode("preview");
  };

  const filteredData = stockData.filter((item) =>
    (category === "All" || item.category === category) &&
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <Box m={4}>
      <Typography variant="h4" mb={3}>Stocks</Typography>

      {/* Filter Bar */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={2} gap={2}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            size="small"
            label="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button variant="contained" style={{backgroundColor:"#005226"}} onClick={() => setViewMode("form")}>
          + New Product
        </Button>
      </Box>

      {/* Table View */}
      {viewMode === "table" && (
        <>
          <TableContainer component={Paper}
            sx={{
              backgroundColor: theme.palette.background.alt,
              borderRadius: "8px",
            }}
          >
            <Table className="app-data-table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
                  <TableCell><b>Sl. No.</b></TableCell>
                  <TableCell><b>Product Code</b></TableCell>
                  <TableCell><b>Category</b></TableCell>
                  <TableCell><b>Sub Category</b></TableCell>
                  <TableCell><b>Product</b></TableCell>
                  <TableCell><b>Updated On</b></TableCell>
                  <TableCell><b>Available Qty.</b></TableCell>
                  <TableCell><b>Action</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, i) => (
                  <TableRow key={row.id}>
                    <TableCell>{startIndex + i + 1}</TableCell>
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.category}</TableCell>
                    <TableCell>{row.subCategory}</TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.qty}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleAddMore(row.id)}
                      >
                        Add More
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
            />
          </Box>
        </>
      )}

      {/* Upload Form */}
      {viewMode === "form" && (
        <UploadForm
          onBack={() => setViewMode("table")}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Product Preview */}
      {viewMode === "preview" && (
        <ProductPreview
          product={productData}
          variants={variantData}
          onBack={() => setViewMode("form")}
        />
      )}
    </Box>
  );
};

export default Stocks;