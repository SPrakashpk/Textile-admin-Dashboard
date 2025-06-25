import React, { useState } from "react";
import {
  Box, Typography, Table, TableHead, TableRow, TableCell, TableBody,
  TableContainer, Paper, Button, TextField, Stack, Chip, InputAdornment, Pagination
} from "@mui/material";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';

const expenseData = [
  { id: 1, date: "2023-11-15", category: "Electricity", subCategory: "Bill", description: "Monthly EB bill", amount: 1300, status: "Paid" },
  { id: 2, date: "2023-11-15", category: "Internet", subCategory: "Wi-Fi", description: "Office internet", amount: 1500, status: "Paid" },
  { id: 3, date: "2023-11-15", category: "Water", subCategory: "Utility", description: "Water bill", amount: 500, status: "Unpaid" },
  { id: 4, date: "2023-11-15", category: "Furniture", subCategory: "Table", description: "New table for office", amount: 2000, status: "Paid" },
  { id: 5, date: "2023-11-15", category: "Print", subCategory: "Stationery", description: "Flyer printing", amount: 100, status: "Paid" },
  { id: 6, date: "2023-11-15", category: "Courier", subCategory: "Delivery", description: "Sample delivery", amount: 300, status: "Unpaid" },
  { id: 7, date: "2023-11-15", category: "Food", subCategory: "Snacks", description: "Team snacks", amount: 850, status: "Paid" },
  { id: 8, date: "2023-11-16", category: "Transport", subCategory: "Cab", description: "Client visit cab", amount: 450, status: "Paid" },
  { id: 9, date: "2023-11-16", category: "Print", subCategory: "Posters", description: "Poster printing", amount: 200, status: "Unpaid" },
  { id: 10, date: "2023-11-17", category: "Stationery", subCategory: "Paper", description: "A4 sheets", amount: 300, status: "Paid" },
];

const Expenses = () => {
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Filter logic
  const filtered = expenseData.filter((item) => {
    const itemDate = dayjs(item.date);
    const from = fromDate ? dayjs(fromDate) : null;
    const to = toDate ? dayjs(toDate) : null;

    const matchesDate = (!from || itemDate.isAfter(from.subtract(1, "day"))) &&
                        (!to || itemDate.isBefore(to.add(1, "day")));

    const matchesSearch =
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());

    return matchesDate && matchesSearch;
  });

  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginatedData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  // Summary
  const paidAmount = filtered
    .filter((item) => item.status === "Paid")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const unpaidAmount = filtered
    .filter((item) => item.status === "Unpaid")
    .reduce((acc, cur) => acc + cur.amount, 0);
  const totalAmount = paidAmount + unpaidAmount;

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Expenses</Typography>

      {/* Filters */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          direction="row"
          spacing={2}
          mb={2}
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {/* Date pickers */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(val) => { setFromDate(val); setPage(1); }}
              slotProps={{ textField: { size: "small" } }}
            />
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(val) => { setToDate(val); setPage(1); }}
              slotProps={{ textField: { size: "small" } }}
            />
          </Stack>

          {/* Search + Button */}
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" style={{backgroundColor:"#005226"}}>+ Add Expense</Button>
          </Stack>
        </Stack>
      </LocalizationProvider>

      {/* Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: theme.palette.background.alt, borderRadius: "8px" }}>
        <Table className="app-data-table">
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.primary.light }}>
              <TableCell>Sl. no.</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub Category</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, i) => (
              <TableRow key={item.id}>
                <TableCell>{(page - 1) * rowsPerPage + i + 1}</TableCell>
                <TableCell>{dayjs(item.date).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.subCategory}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Chip
                    label={item.status}
                    color={item.status === "Paid" ? "success" : "error"}
                    variant="outlined"
                  />
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">No matching expenses found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, val) => setPage(val)}
          color="primary"
        />
      </Box>

      {/* Summary */}
      <Stack
        direction="row"
        justifyContent="space-around"
        alignContent="center"
        mt={3}
        flexWrap="wrap"
        sx={{
          height: "56px",
          borderRadius: "8px",
          padding: 1
        }}
      >
        <Typography variant="body1" color="success.dark" fontSize="large" fontWeight="bold">
          Paid: ₹{paidAmount.toLocaleString()}
        </Typography>
        <Typography variant="body1" color="error.dark" fontSize="large" fontWeight="bold">
          Unpaid: ₹{unpaidAmount.toLocaleString()}
        </Typography>
        <Typography variant="body1" color="primary.light" fontSize="large" fontWeight="bold">
          Total: ₹{totalAmount.toLocaleString()}
        </Typography>
      </Stack>

      {/* Footer buttons */}
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button variant="contained" style={{backgroundColor:"#115210"}}>Print</Button>
        <Button variant="contained" color="primary">Save</Button>
      </Stack>
    </Box>
  );
};

export default Expenses;
