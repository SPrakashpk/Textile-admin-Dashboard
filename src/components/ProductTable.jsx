import React, { useState } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, useTheme,
  Pagination, 
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";


const ProductTable = ({ status }) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const rowsPerPage = 10;

  const products = [
     { id: "001", date: "10/11/2023", code: "001", category: "Men", subCategory: "T-shirt", product: "Men Printed Polo", price: "Rs. 100", gst: "10%", status: "Active" },
  { id: "002", date: "11/11/2023", code: "002", category: "Men", subCategory: "Shirt", product: "Men Casual Shirt", price: "Rs. 350", gst: "12%", status: "Inactive" },
  { id: "003", date: "12/11/2023", code: "003", category: "Women", subCategory: "Kurti", product: "Women Ethnic Kurti", price: "Rs. 500", gst: "5%", status: "Active" },
  { id: "004", date: "13/11/2023", code: "004", category: "Women", subCategory: "Top", product: "Women Crop Top", price: "Rs. 250", gst: "10%", status: "Out of Stock" },
  { id: "005", date: "14/11/2023", code: "005", category: "Kids", subCategory: "Frock", product: "Kids Party Frock", price: "Rs. 400", gst: "8%", status: "Active" },
  { id: "006", date: "15/11/2023", code: "006", category: "Men", subCategory: "Jeans", product: "Men Slim Fit Jeans", price: "Rs. 700", gst: "12%", status: "Active" },
  { id: "007", date: "16/11/2023", code: "007", category: "Women", subCategory: "Leggings", product: "Women Printed Leggings", price: "Rs. 280", gst: "5%", status: "Inactive" },
  { id: "008", date: "17/11/2023", code: "008", category: "Men", subCategory: "T-shirt", product: "Men Round Neck T-shirt", price: "Rs. 200", gst: "10%", status: "Active" },
  { id: "009", date: "18/11/2023", code: "009", category: "Women", subCategory: "Dress", product: "Women Maxi Dress", price: "Rs. 650", gst: "8%", status: "Out of Stock" },
  { id: "010", date: "19/11/2023", code: "010", category: "Kids", subCategory: "T-shirt", product: "Kids Cartoon Tee", price: "Rs. 150", gst: "5%", status: "Active" },
  { id: "011", date: "20/11/2023", code: "011", category: "Men", subCategory: "Shirt", product: "Men Formal Shirt", price: "Rs. 420", gst: "12%", status: "Inactive" },
  { id: "012", date: "21/11/2023", code: "012", category: "Women", subCategory: "Saree", product: "Silk Saree", price: "Rs. 1200", gst: "5%", status: "Active" },
  { id: "013", date: "22/11/2023", code: "013", category: "Men", subCategory: "Shorts", product: "Men Sports Shorts", price: "Rs. 300", gst: "10%", status: "Out of Stock" },
  { id: "014", date: "23/11/2023", code: "014", category: "Women", subCategory: "Top", product: "Women Bell Sleeve Top", price: "Rs. 270", gst: "8%", status: "Active" },
  { id: "015", date: "24/11/2023", code: "015", category: "Kids", subCategory: "Pants", product: "Kids Denim Pants", price: "Rs. 330", gst: "5%", status: "Inactive" },
  { id: "016", date: "25/11/2023", code: "016", category: "Men", subCategory: "Track Pant", product: "Men Running Track", price: "Rs. 550", gst: "10%", status: "Active" },
  { id: "017", date: "26/11/2023", code: "017", category: "Women", subCategory: "Skirt", product: "Women Pleated Skirt", price: "Rs. 600", gst: "8%", status: "Inactive" },
  { id: "018", date: "27/11/2023", code: "018", category: "Kids", subCategory: "Jacket", product: "Kids Winter Jacket", price: "Rs. 750", gst: "12%", status: "Active" },
  { id: "019", date: "28/11/2023", code: "019", category: "Women", subCategory: "Sweater", product: "Women Wool Sweater", price: "Rs. 880", gst: "5%", status: "Out of Stock" },
  { id: "020", date: "29/11/2023", code: "020", category: "Men", subCategory: "Blazer", product: "Men Office Blazer", price: "Rs. 2200", gst: "18%", status: "Active" },
  { id: "021", date: "30/11/2023", code: "021", category: "Kids", subCategory: "Shirt", product: "Kids Formal Shirt", price: "Rs. 260", gst: "5%", status: "Inactive" },
  { id: "022", date: "01/12/2023", code: "022", category: "Men", subCategory: "Sweatshirt", product: "Men Hooded Sweatshirt", price: "Rs. 900", gst: "10%", status: "Active" },
  { id: "023", date: "02/12/2023", code: "023", category: "Women", subCategory: "Jumpsuit", product: "Women Floral Jumpsuit", price: "Rs. 780", gst: "8%", status: "Active" },
  { id: "024", date: "03/12/2023", code: "024", category: "Kids", subCategory: "Kurta", product: "Kids Ethnic Kurta", price: "Rs. 480", gst: "5%", status: "Out of Stock" },
  { id: "025", date: "04/12/2023", code: "025", category: "Women", subCategory: "Top", product: "Women Peplum Top", price: "Rs. 340", gst: "8%", status: "Inactive" },
  { id: "026", date: "05/12/2023", code: "026", category: "Men", subCategory: "Cap", product: "Men Baseball Cap", price: "Rs. 120", gst: "12%", status: "Active" },
  { id: "027", date: "06/12/2023", code: "027", category: "Kids", subCategory: "Shorts", product: "Kids Summer Shorts", price: "Rs. 190", gst: "5%", status: "Active" },
  { id: "028", date: "07/12/2023", code: "028", category: "Women", subCategory: "Palazzo", product: "Women Palazzo Pant", price: "Rs. 410", gst: "5%", status: "Inactive" },
  { id: "029", date: "08/12/2023", code: "029", category: "Men", subCategory: "Joggers", product: "Men Cotton Joggers", price: "Rs. 620", gst: "10%", status: "Out of Stock" },
  { id: "030", date: "09/12/2023", code: "030", category: "Kids", subCategory: "Sweater", product: "Kids Knit Sweater", price: "Rs. 540", gst: "5%", status: "Active" }];


 

 // Normalize status to match tab values
const normalize = (text) => text.toLowerCase().replace(/\s+/g, "-");

const normalizedStatus = normalize(status);
const filtered = products.filter(
  (prod) => normalize(prod.status) === normalizedStatus
);


// Search filtering
const searched = filtered.filter((prod) =>
  prod.product.toLowerCase().includes(search.toLowerCase()) ||
  prod.code.toLowerCase().includes(search.toLowerCase()) ||
  prod.category.toLowerCase().includes(search.toLowerCase())
);


  const totalPages = Math.ceil(searched.length / rowsPerPage);
  const paginated = searched.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box mt={2}>
      {/* <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h6">Product List</Typography>
        <TextField
          size="small"
          placeholder="Search by name/code/category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            )
          }}
        />
      </Stack> */}

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "8px",
        }}
      >
        <Table className="app-data-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell>Sl. No.</TableCell>
              <TableCell>Posted On</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>GST</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}
              >
                <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.subCategory}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>{row.gst}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color:
                        row.status === "Active"
                          ? theme.palette.success.main
                          : row.status === "Inactive"
                          ? theme.palette.warning.main
                          : theme.palette.error.main,
                      fontWeight: "bold"
                    }}
                  >
                    {row.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <VisibilityIcon fontSize="small" color="info" />
                  </IconButton>
                  <IconButton>
                    <EditIcon fontSize="small"  />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={10}>
                  <Typography textAlign="center" color="text.secondary">
                    No matching products found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default ProductTable;
