import { Box, Grid, Button } from "@mui/material";
import { useState } from "react";
import BasicBreadcrumbs from "../common/BasicBreadcrumbs";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FormatListBulleted, GridView, Add } from "@mui/icons-material";
import { useCallback } from "react";
import GridSection from "./subComponents/GridSection";
import RadioSection from "./subComponents/RadioSection";
// import TreeSection from "./subComponents/TreeSection";
const FileCabinet = () => {
  const [alignment, setAlignment] = useState("list");
  const [value, setValue] = useState("all");

  const handleChangeSwitch = useCallback((event, newAlignment) => {
    setAlignment(newAlignment);
  }, []);
  const handleChangeRadio = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const treedata = [
    {
      id: 0,
      name: 'Root',
      children: [
        {
          id: 1,
          name: 'Child 1',
          children: [
            {
              id: 2,
              name: 'Child 2',
            },
          ],
        },
        {
          id: 3,
          name: 'Child 3',
        },
      ],
    },
  ];

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
            <TreeSection nodes={treedata} value={value} />
          ) : (
            <GridSection value={value} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FileCabinet;