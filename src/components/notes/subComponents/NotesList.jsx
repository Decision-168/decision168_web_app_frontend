import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import React from "react";

const NotesList = () => {
  const data = [1, 2, 3, 4, 5, 6, 7];
  const theme = useTheme();
  return (
    
      <Paper
        elevation={0}
        sx={{
          p: 1,
          mr: 2,
          ml: 1,
          borderRadius: "10px",
        }}
      >
        <PerfectScrollbar>
            <Box sx={{
          maxHeight: "500px",
          minHeight: "500px",
        }}>
        {data.map((item, index) => {
          return (
            <Card key={index} sx={{ mb: 1 }}>
              <CardContent sx={{ textAlign: "left" }}>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 600, mb: "10px" }}
                >
                  My Notes {item}
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
                    2023-11-03
                  </Typography>
                  <Typography sx={{ fontSize: "14px" }}>
                    My Notes {item}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          );
        })}
        </Box>
        </PerfectScrollbar>
      </Paper>
  );
};

export default NotesList;
