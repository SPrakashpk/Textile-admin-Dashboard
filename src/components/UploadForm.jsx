// src/scenes/uploadProducts/UploadForm.jsx
import React, { useState } from "react";
import {
  Box, TextField, Button, MenuItem, Select, FormControl,
  Typography, Grid, Link, Dialog, DialogTitle,
  DialogContent, DialogActions, 
} from "@mui/material";
import { SketchPicker } from "react-color";
import { useTheme } from "@mui/material/styles";
import DropzoneWrapper from "./Imageuploader";



const UploadForm = ({ onBack, onSubmit }) => {
  const theme = useTheme();


  const defaultProduct = {
    code: "", name: "", category: "", subCategory: "",
    price: "", gst: "", status: "", image: null,
    description: "", productType: "",
  };

  const defaultVariants = [
    { color: "#000000", size: "", quantity: "", image: [], showColorPicker: false },
  ];

  const [product, setProduct] = useState(defaultProduct);
  const [variants, setVariants] = useState(defaultVariants);
  const [categories, setCategories] = useState(["Men", "Women", "Kids"]);
  const [productTypes, setProductTypes] = useState(["Western Wear", "Ethnic Wear", "Sportswear"]);
  const [openCategory, setOpenCategory] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [newType, setNewType] = useState("");
  const [openSize, setOpenSize] = useState(false);
  const [newSize, setNewSize] = useState("");
  const [sizes, setSizes] = useState(["S", "M", "L", "XL"]); // default size options


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };
  
const handleVariantImageUpload = (index, files) => {
  const updated = [...variants];
  const validFiles = Array.isArray(files)
    ? files.filter((file) => file instanceof File)
    : files instanceof File
    ? [files]
    : [];

  updated[index].image = validFiles;
  setVariants(updated);
};



  const handleDiscard = (e) => {
   setProduct(defaultProduct);
setVariants(defaultVariants);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.code || !product.name || !product.category || !product.productType) {
  alert("Please fill all required product fields.");
  return;
    }

    for (let i = 0; i < variants.length; i++) {
      if (!variants[i].size || !variants[i].quantity) {
        alert(`Please complete all fields for variant ${i + 1}.`);
        return;
      }
    }

    onSubmit(product, variants);
  };


  


   return (
    
    <Box p={3} component="form"   onSubmit={handleSubmit}>
      <Typography variant="h5" mb={3}>Upload New Product</Typography>
      <Grid container spacing={2} >
        {/** Product Code */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <Box mb={2}>
            <Typography fontWeight="bold">Product Code</Typography>
            <TextField name="code" fullWidth value={product.code} onChange={handleChange} />
          </Box>
        </Grid>

        {/** Category + Add */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <FormControl fullWidth>
            <Box display="flex" justifyContent="space-between" mb={0}>
              <Typography fontWeight="bold">Category</Typography>
              <Link component="button" color="secondary" onClick={() => setOpenCategory(true)}>Add New Category</Link>
            </Box>
            <Select name="category" value={product.category} onChange={handleChange}>
              {categories.map((cat, i) => (
                <MenuItem key={i} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/** Sub Category */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <Box mb={2}>
            <Typography fontWeight="bold">Sub Category</Typography>
            <TextField name="subCategory" fullWidth value={product.subCategory} onChange={handleChange} />
          </Box>
        </Grid>

        {/** Product Name */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <Box mb={1}>
            <Typography fontWeight="bold">Product Name</Typography>
            <TextField name="name" fullWidth value={product.name} onChange={handleChange} />
          </Box>
        </Grid>

        {/** Product Type + Add */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <FormControl fullWidth>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography fontWeight="bold">Product Type</Typography>
              <Link component="button" color="secondary" onClick={() => setOpenType(true)}>Add New Product Type</Link>
            </Box>
            <Select name="productType" value={product.productType} onChange={handleChange}>
              {productTypes.map((type, i) => (
                <MenuItem key={i} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/** Price */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <Box mb={1}>
            <Typography fontWeight="bold">Price</Typography>
            <TextField type="number" name="price" fullWidth value={product.price} onChange={handleChange} />
          </Box>
        </Grid>

        {/** GST */}
        <Grid item xs={12} md={6} sx={{ width: "450px" }}>
          <FormControl fullWidth>
            <Typography fontWeight="bold" mb={1}>GST</Typography>
            <Select name="gst" value={product.gst} onChange={handleChange}>
              <MenuItem value="5%">5%</MenuItem>
              <MenuItem value="10%">10%</MenuItem>
              <MenuItem value="12%">12%</MenuItem>
              <MenuItem value="18%">18%</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" mt={4}>Available Colours, Sizes & Quantity</Typography>
          <Box display="flex" justifyContent="flex-end">
            <Link component="button" color="secondary" onClick={() => setVariants([...variants, { ...defaultVariants[0] }])}>+ Add More Items</Link>
          </Box>
        </Grid>
        <Grid container spacing={2}>
        {variants.map((variant, index) => (
          <React.Fragment key={index}>
            <Grid item xs={2} md={2}  sx={{ width: "140px" }}>
              <Typography fontWeight="bold" mb={1}>Color</Typography>
              <Box position="relative">
                <Button
                  sx={{ backgroundColor: variant.color, minWidth: "100%", height: 55 }}
                  onClick={() => handleVariantChange(index, "showColorPicker", !variant.showColorPicker)}
                />
                {variant.showColorPicker && (
                  <Box position="absolute" zIndex={999}>
                    <SketchPicker
                      color={variant.color}
                      onChangeComplete={(color) => {
                        handleVariantChange(index, "color", color.hex);
                        handleVariantChange(index, "showColorPicker", false);
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>

            <Grid item xs={3} md={2} sx={{ width: "250px" }}>
            <FormControl fullWidth>
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography fontWeight="bold">Size</Typography>
                  <Link component="button" color="secondary" onClick={() => setOpenSize(true)}>
                    Add New Size
                  </Link>
                </Box>
                <Select
                  name="size"
                  value={variant.size}
                  onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                >
                  {sizes.map((s, i) => (
                    <MenuItem key={i} value={s}>{s}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            </Grid>

            <Grid item xs={3} md={2} sx={{ width: "250px" }}>
              <Typography fontWeight="bold" mb={1}>Quantity</Typography>
              <TextField type="number" value={variant.quantity} onChange={(e) => handleVariantChange(index, "quantity", e.target.value)} fullWidth />
            </Grid>

            <Grid item xs={3} md={3} sx={{ width: "250px" }}>
              <Box display="flex" justifyContent="space-between" mb={0}>
              <Typography fontWeight="bold">Upload Image</Typography>
               {variants.length > 1 && (
               <Link color="error" onClick={() => {
                  const updated = variants.filter((_, i) => i !== index);
                  setVariants(updated);
                }}>
                  Delete Item
                </Link>

              )}
              </Box>
              {variant.image.length === 0 && (
               <DropzoneWrapper
                  onDrop={(acceptedFiles) => handleVariantImageUpload(index, acceptedFiles)}
                />
              )}
             {variant.image.length > 0 && (
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {variant.image.map((file, i) => (
                    <img
                      key={i}
                      src={URL.createObjectURL(file)}
                      alt={`preview-${i}`}
                      style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }}
                      onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                    />
                  ))}
                </Box>
              )}


            </Grid>

            {/* <Grid item xs={1} md={2} display="flex" alignItems="center">
              {variants.length > 1 && (
                <IconButton color="error" onClick={() => {
                  const updated = variants.filter((_, i) => i !== index);
                  setVariants(updated);
                }}>
                  <DeleteIcon />
                </IconButton>
              )}
            </Grid> */}
          </React.Fragment>
        ))}
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
            <Button variant="outlined" color="error" onClick={handleDiscard}>Discard</Button>
            <Button variant="contained" color="primary" type="submit">Continue</Button>
          </Box>
        </Grid>
      

      {/* Category Dialog */}
      <Dialog open={openCategory} onClose={() => setOpenCategory(false)}
         PaperProps={{
            sx: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
          }}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategory(false)} variant="outlined" color="error">Cancel</Button>
          <Button onClick={() => {
            setCategories([...categories, newCategory]);
            setNewCategory("");
            setOpenCategory(false);
          }}
          variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Product Type Dialog */}
      <Dialog open={openType} onClose={() => setOpenType(false)}
       PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}>
        <DialogTitle>Add New Product Type</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Product Type" value={newType} onChange={(e) => setNewType(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenType(false)} variant="outlined" color="error">Cancel</Button>
          <Button onClick={() => {
            setProductTypes([...productTypes, newType]);
            setNewType("");
            setOpenType(false);
          }}
          variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openSize} onClose={() => setOpenSize(false)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
          },
        }}>
          <DialogTitle>Add New Size</DialogTitle>
          <DialogContent>
            <TextField
              label="Size"
              fullWidth
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenSize(false)} variant="outlined" color="error">Cancel</Button>
            <Button
              onClick={() => {
                if (newSize.trim()) {
                  setSizes([...sizes, newSize.trim()]);
                }
                setNewSize("");
                setOpenSize(false);
              }}
              variant="contained"
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

    </Box>
  );
};

export default UploadForm;
