

import React from "react";
import { Box } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <Box  sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        maxHeight: "100vh",  
        flex: "1", // Allow the loader to take up available space
      }}>
      <RotatingLines type="TailSpin" strokeColor="grey" height={50} width={50} visible={true} />
    </Box>
  );
};

export default Loader;
