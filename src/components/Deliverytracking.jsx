import React, {useState} from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Chip, useTheme, Grid, TextField,
   MenuItem, Pagination, InputAdornment, Select, InputLabel, FormControl,
} from "@mui/material";
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';

const deliveryData = [
  {
    id: 1,
    date: "07/12/2023",
    name: "Ramesh",
    contact: "99999 88888",
    product: "Printed Shirt",
    location: "Coimbatore",
    status: "Delivered",
  },
  {
    id: 2,
    date: "07/12/2023",
    name: "Naveen",
    contact: "99999 88888",
    product: "Kurthi",
    location: "Erode",
    status: "Out for Delivery",
  },
  {
    id: 3,
    date: "07/12/2023",
    name: "Sherin",
    contact: "99999 88888",
    product: "Sports Shorts",
    location: "Chennai",
    status: "Pending",
  },
  {
    id: 4,
    date: "08/12/2023",
    name: "Ajith",
    contact: "99998 77777",
    product: "Formal Pants",
    location: "Madurai",
    status: "Cancelled",
  },
  {
    id: 5,
    date: "08/12/2023",
    name: "Gokul",
    contact: "99997 66666",
    product: "Round Neck T-Shirt",
    location: "Salem",
    status: "Delivered",
  },
  {
    id: 6,
    date: "09/12/2023",
    name: "Meena",
    contact: "99996 55555",
    product: "Cotton Saree",
    location: "Tiruppur",
    status: "Out for Delivery",
  },
  {
    id: 7,
    date: "09/12/2023",
    name: "Akash",
    contact: "99995 44444",
    product: "Plain Shirt",
    location: "Trichy",
    status: "Pending",
  },
  {
    id: 8,
    date: "09/12/2023",
    name: "Tharani",
    contact: "99994 33333",
    product: "Blouse",
    location: "Tanjore",
    status: "Delivered",
  },
  {
    id: 9,
    date: "10/12/2023",
    name: "Vijay",
    contact: "99993 22222",
    product: "Track Pants",
    location: "Vellore",
    status: "Cancelled",
  },
  {
    id: 10,
    date: "10/12/2023",
    name: "Lavanya",
    contact: "99992 11111",
    product: "Anarkali Kurti",
    location: "Kanchipuram",
    status: "Delivered",
  },
  {
    id: 11,
    date: "11/12/2023",
    name: "Hari",
    contact: "99991 00000",
    product: "Printed T-Shirt",
    location: "Tirunelveli",
    status: "Out for Delivery",
  },
  {
    id: 12,
    date: "11/12/2023",
    name: "Divya",
    contact: "99990 12345",
    product: "Hand Kerchief",
    location: "Namakkal",
    status: "Pending",
  }
];


const getStatusColor = (status) => {
  switch (status) {
    case "Delivered": return "success";
    case "Out for Delivery": return "warning";
    case "Pending": return "default";
    case "Cancelled": return "error";
    default: return "default";
  }
};
const categories = ["All", "Delivered", "Out for Delivery", "Pending", "Cancelled"];


const DeliveryTracking = () => {
  
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const theme = useTheme();

  const filteredData = deliveryData.filter((item) =>
    (category === "All" || item.status === category) &&
    item.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  return (
    <Box m={4}>
      <Typography variant="h4" mb={3}>Delivery Tracking</Typography>
      <Box mb={3} display="flex" justifyContent="flex-end" gap={2}>
            <Grid item xs={12} sm={4}>
          <FormControl fullWidth sx={{width: "150px"}}>
            <InputLabel>Category</InputLabel>
            <Select
             size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} sm={3}>
          <TextField
             size="small"
                fullWidth
                placeholder="Search..."
                value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
        </Grid>
        </Box>
    


      <TableContainer component={Paper}sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "8px",}}>
        <Table className="app-data-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell>Sl. No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, i) => (
              <TableRow key={row.id}>
                <TableCell>{startIndex + i +1}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contact}</TableCell>
                <TableCell>{row.product}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Chip label={row.status} color={getStatusColor(row.status)} />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="contained">Track</Button>
                </TableCell>
              </TableRow>
            ))}
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

export default DeliveryTracking;
