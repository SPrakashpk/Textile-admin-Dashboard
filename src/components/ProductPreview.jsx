import { Box, Typography, Button, Chip, Stack } from "@mui/material";

const ProductPreview = ({ product, variants, onBack, onSubmitFinal }) => {
  if (!product || !variants) {
    return <Typography color="error">No product data available for preview.</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>New Product</Typography>

      {/* Product Info */}
      <Stack spacing={1} mb={4}>
        <Typography><b>Product Code:</b> &nbsp;{product.code}</Typography>
        <Typography><b>Category:</b> &nbsp;{product.category}</Typography>
        <Typography><b>Sub Category:</b>&nbsp; {product.subCategory}</Typography>
        <Typography><b>Product Name:</b>&nbsp; {product.name}</Typography>
        <Typography><b>Product Type:</b> &nbsp;{product.productType}</Typography>
        <Typography><b>Price:</b> &nbsp;₹{product.price}</Typography>
        <Typography><b>GST:</b> &nbsp;{product.gst}</Typography>
      </Stack>

      {/* Variants */}
      <Box mt={2}>
        <Typography variant="h6" gutterBottom><b>Variants</b></Typography>
        <Stack spacing={2}>
          {variants.map((variant, index) => (
            <Box key={index} p={2} border="1px solid #ccc" borderRadius={2}>
              <Typography variant="subtitle1"><b>Variant {index + 1}</b></Typography>

              <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                <Typography><b>Color:</b></Typography>&nbsp;
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: variant.color,
                    border: "1px solid #999"
                  }}
                />
              </Stack>

              <Typography mt={1}><b>Size:</b> &nbsp;{variant.size || "N/A"}</Typography>
              <Typography><b>Quantity:</b> &nbsp;{variant.quantity || "N/A"}</Typography>

              <Box mt={1}>
                <Typography><b>Photos:</b></Typography>&nbsp;
                <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                  {Array.isArray(variant.image) && variant.image.length > 0 ? (
                    variant.image.map((file, j) =>
                      file instanceof File ? (
                        <img
                          key={j}
                          src={URL.createObjectURL(file)}
                          alt={`variant-${index}-photo-${j}`}
                          style={{ height: 56, width: 56, objectFit: "cover", borderRadius: 5 }}
                          onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                        />
                      ) : null
                    )
                  ) : (
                    <Typography fontSize="0.875rem" color="text.secondary">No image uploaded</Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Status and Actions */}
      <Box mt={4}>
        <Typography><b>Status:</b></Typography>&nbsp;
        <Stack direction="row" spacing={2} mt={1}>
          <Chip label="Active" color="success" />
          <Chip label="Inactive" color="error" variant="outlined" />
          <Chip label="Out of Stock" color="primary" variant="outlined" />
        </Stack>

        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
          <Button variant="outlined" onClick={onBack}>Back</Button>
<Button
  variant="contained"
  color="primary"
  onClick={() => {
    if (typeof onSubmitFinal === "function") {
      onSubmitFinal();
    } else {
      console.warn("onSubmitFinal prop not passed");
    }
  }}
>
  Submit Product
</Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductPreview;
