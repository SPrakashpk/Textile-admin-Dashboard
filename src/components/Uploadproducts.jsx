import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, Button,} from "@mui/material";
import ProductTable from "./ProductTable";
import UploadForm from "./UploadForm";
import ProductPreview from "./ProductPreview";

const UploadProducts = () => {
  const [tab, setTab] = useState("active");
  const [viewMode, setViewMode] = useState("table"); 
  const [productData, setProductData] = useState(null);
  const [variantData, setVariantData] = useState(null);


  const handleFormSubmit = (product, variants) => {
    setProductData(product);
    setVariantData(variants);
    setViewMode("preview");
  };

  return (
    <Box m="2rem">
      <Typography variant="h4" mb={2}>Product Details</Typography>

      {viewMode === "table" && (
        <>
          <Tabs value={tab} onChange={(e, val) => setTab(val)}>
            <Tab label="Active" value="active" />
            <Tab label="Inactive" value="inactive" />
            <Tab label="Out of Stock" value="out-of-stock" />
          </Tabs>
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button variant="contained" style={{backgroundColor:"#005226"}} onClick={() => setViewMode("form")}>
              + New Product
            </Button>
          </Box>
          <Box mt={2}>
            <ProductTable status={tab} />
          </Box>
        </>
      )}

      {viewMode === "form" && (
        <UploadForm
          onBack={() => setViewMode("table")}
          onSubmit={(product, variants) => handleFormSubmit(product, variants)}
        />
      )}

      {viewMode === "preview" && (
  <ProductPreview
    product={productData}
    variants={variantData}
    onBack={() => setViewMode("form")}
    onSubmitFinal={() => {
      console.log("Final product submitted:", productData, variantData);
      setViewMode("table"); 
    }}
  />
)}

       
    </Box>
    
  );
};


export default UploadProducts;