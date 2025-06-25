import React, { useState } from "react";
import {
  Box, Typography, TextField, Select, MenuItem,
  FormControl, InputLabel, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper, Chip, Button,
  IconButton, Pagination, useTheme, InputAdornment,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


         
// Sample data
const sampleOrders = [{
    date: "07/12/2023",
    name: "Ramesh",
    location: "Coimbatore",
    contact: "99999 88888",
    category: "Men",
    subCategory: "Shirt",
    product: "Plain Shirt",
    quantity: 2,
    price: 200,
    status: "Dispatched",
  },
  {
    date: "07/12/2023",
    name: "Naveen",
    location: "Erode",
    contact: "99999 88888",
    category: "Women",
    subCategory: "Kurthi",
    product: "V Neck",
    quantity: 1,
    price: 100,
    status: "Cancelled",
  },
  {
    date: "07/12/2023",
    name: "Gokul",
    location: "Madurai",
    contact: "99999 88888",
    category: "Women",
    subCategory: "Saree",
    product: "Cotton Saree",
    quantity: 2,
    price: 200,
    status: "Dispatched",
  },
  {
    date: "07/12/2023",
    name: "Ajith",
    location: "Chennai",
    contact: "99999 88888",
    category: "Men",
    subCategory: "Shirt",
    product: "Casual Shirt",
    quantity: 1,
    price: 150,
    status: "Pending",
  },
  {
    date: "07/12/2023",
    name: "Ajin",
    location: "Teni",
    contact: "99999 88888",
    category: "Kids",
    subCategory: "Shorts",
    product: "Sports Shorts",
    quantity: 3,
    price: 300,
    status: "Dispatched",
  },
  {
    date: "07/12/2023",
    name: "Sherin",
    location: "Nagercoil",
    contact: "99999 88888",
    category: "Men",
    subCategory: "Shorts",
    product: "Denim Shorts",
    quantity: 2,
    price: 250,
    status: "Cancelled",
  },
  {
    date: "07/12/2023",
    name: "Abish",
    location: "Theni",
    contact: "99999 88888",
    category: "Women",
    subCategory: "Saree",
    product: "Silk Saree",
    quantity: 1,
    price: 400,
    status: "Dispatched",
  },
  {
    date: "07/12/2023",
    name: "Akash",
    location: "Tirunelveli",
    contact: "99999 88888",
    category: "Men",
    subCategory: "Vest",
    product: "Cotton Vest",
    quantity: 4,
    price: 180,
    status: "Pending",
  },
  {
    date: "07/12/2023",
    name: "Salim",
    location: "Salem",
    contact: "99999 88888",
    category: "Kids",
    subCategory: "T-Shirts",
    product: "Round Neck",
    quantity: 3,
    price: 300,
    status: "Cancelled",
  },
  {
    date: "07/12/2023",
    name: "Joseph",
    location: "Chennai",
    contact: "99999 88888",
    category: "Men",
    subCategory: "Shirt",
    product: "Formal Shirt",
    quantity: 1,
    price: 120,
    status: "Dispatched",
  },];

    
const uniqueProducts = ["All", ...new Set(sampleOrders.map(o => o.product))];

// Helper to get status color
const getStatusColor = (status) => {
  if (status === "Dispatched") return "success";
  if (status === "Cancelled") return "error";
  return "default";
};

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [productFilter, setProductFilter] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredOrders = sampleOrders.filter(order => {
  const matchesCategory = category === "All" || order.category === category;
  const matchesProduct = productFilter === "All" || order.product === productFilter;
  const matchesSearch = Object.values(order).some(value =>
    typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const matchesDate = !selectedDate || order.date === dayjs(selectedDate).format("DD/MM/YYYY");

  return matchesCategory && matchesProduct && matchesSearch && matchesDate;
});


  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Orders</Typography>

      {/* Filters */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" mb={3} gap={2}>
        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="outlined" color="secondary" startIcon={<FilterListIcon />}>Filter</Button>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Men">Men</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Products</InputLabel>
            <Select
              value={productFilter}
              onChange={(e) => {
                setProductFilter(e.target.value);
                setPage(1);
              }}
              label="Products"
            >
              {uniqueProducts.map((prod, i) => (
                <MenuItem key={i} value={prod}>{prod}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </Box>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Box >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Date"
                    value={selectedDate}
                    onChange={(newValue) => {
                      setSelectedDate(newValue);
                      setPage(1);
                    }}
                   

                    slotProps={{
                      textField: {
                        size: "small",
                        fullWidth:"ture",
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>

          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "8px" }}>
        <Table className="app-data-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              {["Sl. no.", "Date", "Name", "Location", "Contact Number", "Category", "Sub Category", "Products", "Qty", "Price", "Status", ""].map((col, i) => (
                <TableCell key={i}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order, i) => (
              <TableRow key={i}>
                <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.location}</TableCell>
                <TableCell>{order.contact}</TableCell>
                <TableCell>{order.category}</TableCell>
                <TableCell>{order.subCategory}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>₹{order.price}</TableCell>
                <TableCell>
                  <Chip label={order.status} color={getStatusColor(order.status)} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton><MoreVertIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {paginatedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} align="center">No orders found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination count={totalPages} page={page} onChange={(e, val) => setPage(val)} />
      </Box>
    </Box>
  );
};

export default OrdersPage;
