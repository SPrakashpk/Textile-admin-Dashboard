import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';

const DropzoneWrapper = ({ onDrop }) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #aaa',
        padding: 2,
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: 'primary',
        cursor: 'pointer',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="body2" color="textSecondary">
        Drag or click to upload images
      </Typography>
    </Box>
  );
};

export default DropzoneWrapper;