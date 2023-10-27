import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";

export default function CustomDataPicker({ label }) {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]} sx={{ paddingTop: "0px"}}>
        <Box sx={{ textAlign: "left", width:'100%' }}>
          <InputLabel htmlFor="date-picker-label" sx={{ fontSize: "14px" }}>
            {label}
          </InputLabel>
          <DatePicker sx={{ marginTop: "8px", width: "100%" }}  value={value} onChange={(newValue) => setValue(newValue)} id="date-picker-label" />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}
