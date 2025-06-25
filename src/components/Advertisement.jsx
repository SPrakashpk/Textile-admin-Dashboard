import React, { useState } from "react";
import {
  Box, Typography, Grid, Card, CardActions, Button, Avatar,
  useTheme, Divider, Dialog, DialogTitle, DialogContent, TextField,
  DialogActions, FormControl, InputLabel, Select, MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDropzone } from "react-dropzone";

// Images
import Mens from "/Mens.jpg";
import Womens from "/Womens.jpg";
import Kids from "/Kids.jpg";
import Others from "/Others.jpg";

// Default ads
const initialAds = [
  { id: 1, category: "Mens", image: Mens, heading: "Men's Deals", content: "Shop new arrivals for men." },
  { id: 2, category: "Women", image: Womens, heading: "Women's Picks", content: "Trendy fashion for women." },
  { id: 3, category: "Kids", image: Kids, heading: "Kids Corner", content: "New collection for kids." },
  { id: 4, category: "Others", image: Others, heading: "Extras", content: "Accessories and more." },
];

const AdvertisementPage = () => {
  const [ads, setAds] = useState(initialAds);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ category: "", heading: "", content: "", image: null, id: null });
  const theme = useTheme();

  // Dropzone config
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        setForm((prev) => ({ ...prev, image: acceptedFiles[0] }));
      }
    }
  });

  const handleOpenDialog = (ad = null) => {
    if (ad) {
      setForm(ad); // edit
    } else {
      setForm({ category: "", heading: "", content: "", image: null, id: null }); // new
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setForm({ category: "", heading: "", content: "", image: null, id: null });
    setOpen(false);
  };

  const handleSave = () => {
    if (!form.category || !form.heading || !form.image) return;

    const newAd = {
      ...form,
      id: form.id || ads.length + 1,
      image: typeof form.image === "string" ? form.image : URL.createObjectURL(form.image),
    };

    setAds((prev) =>
      form.id ? prev.map((ad) => (ad.id === form.id ? newAd : ad)) : [...prev, newAd]
    );
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setAds((prev) => prev.filter((ad) => ad.id !== id));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Advertisement</Typography>
        <Button variant="contained" style={{backgroundColor:"#005226"}} onClick={() => handleOpenDialog()}>
          + Add Products
        </Button>
      </Box>

      <Grid container spacing={3}>
        {ads.map((ad) => (
          <Grid item xs={12} sm={6} md={6} lg={6} key={ad.id}>
            <Card sx={{ borderRadius: 2, backgroundColor: theme.palette.background.alt }} elevation={2}>
              {/* Image + Info */}
              <Box display="flex" alignItems="center" p={2}>
                <Avatar
                  src={ad.image}
                  variant="rounded"
                  sx={{ width: 100, height: 100, mr: 2 }}
                />
                <Box>
                  <Typography fontWeight="bold">
                    Product No.: {String(ad.id).padStart(2, "0")}
                  </Typography>
                  <Typography color="text.secondary">Category: {ad.category}</Typography>
                  <Typography fontWeight="bold">{ad.heading}</Typography>
                  <Typography color="text.secondary" fontSize="14px">{ad.content}</Typography>
                </Box>
              </Box>

              <Divider />

              {/* Actions */}
              <CardActions sx={{ justifyContent: "center", py: 1 }}>
                <Button startIcon={<DeleteIcon />} color="error" onClick={() => handleDelete(ad.id)}>
                  Delete
                </Button>
                <Button startIcon={<EditIcon />} color="success" onClick={() => handleOpenDialog(ad)}>
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth sx={{ borderRadius: 2, backgroundColor: theme.palette.background.alt }}>
        <DialogTitle>{form.id ? "Edit Advertisement" : "Add Advertisement"}</DialogTitle>
        <DialogContent sx={{ borderRadius: 2, backgroundColor: theme.palette.background.alt }}>
          <FormControl fullWidth margin="normal" size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              label="Category"
            >
              <MenuItem value="Mens">Mens</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </Select>
          </FormControl>

          <Box
            sx={{
              border: "2px dashed grey",
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              my: 2,
              borderRadius: 1,
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {form.image ? (
              <img
                src={
                  typeof form.image === "string"
                    ? form.image
                    : URL.createObjectURL(form.image)
                }
                alt="preview"
                style={{ width: 100, objectFit: "cover" }}
              />
            ) : (
              <Typography>Drag or click to upload image</Typography>
            )}
          </Box>

          <TextField
            label="Heading"
            fullWidth
            margin="normal"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
          />
          <TextField
            label="Content"
            fullWidth
            multiline
            minRows={3}
            margin="normal"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdvertisementPage;