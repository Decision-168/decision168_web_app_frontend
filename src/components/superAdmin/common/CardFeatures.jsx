/* eslint-disable react/prop-types */
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function CardFeatures({ items }) {
  const navigate = useNavigate();
  return (
    <Grid container>
      {items.map((item, index) => (
        <Grid item xs={6} sm={3} md={12} key={index}>
          <Stack alignItems="center" flexDirection={"column"}>
            <Typography variant="text" display="block" gutterBottom>
              {item.count}
            </Typography>
            <Typography
              variant="text"
              sx={{
                cursor: "pointer",
                fontSize: "13px",
                color: "#343a40",
                fontWeight: "900",
                ":hover": {
                  color: "#c7df19",
                },
              }}
              onClick={() => navigate(item.link)}>
              {item.label}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
}
