import React, { memo } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const MyPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (event, value) => {
    if (value < 1 || value > totalPages) {
      return;
    }
    onPageChange(value);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="end" alignItems="center" mt={2}>
      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
    </Stack>
  );
};

export default memo(MyPagination);
