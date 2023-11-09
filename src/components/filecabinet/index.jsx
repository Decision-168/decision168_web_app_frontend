import { Box, Grid, Button } from "@mui/material";
import { memo, useState } from "react";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import ListSection from "subComponents/ListSection";
import GridSection from "subComponents/GridSection";
import RadioSection from "subComponents/RadioSection";
import { useCallback } from "react";
const index = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");

  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }} mb={2}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <BasicBreadcrumbs currentPage="file-cabinet" />
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeSwitch}
              aria-label="Platform"
            >
              <ToggleButton value="list">
                <FormatListBulleted sx={{ fontSize: 14 }} />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridView sx={{ fontSize: 14 }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9}>
          <RadioSection value={value} handleChange={handleChangeRadio} />
        </Grid>
        <Grid item xs={12}>
          {alignment === "list" ? (
            <ListSection value={value} />
          ) : (
            <GridSection value={value} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default memo(index);