import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import React from "react";
const data = [
  {
    id: "0",
    filename: "file1.txt",
    type: "Subtask",
  },
  {
    id: "1",
    filename: "file2.txt",
    type: "Subtask",
  },
  {
    id: "2",
    filename: "file3.txt",
    type: "Subtask",
  },
];
const RecentFiles = () => {
  return (
    <Paper elevation={0} sx={{ m: 1 }}>
      <Box
        sx={{
          p: 1,
          textAlign: "left",
          '& .MuiCardContent-root:last-child': {
            pb: 1
          }
        }}
      >
        <Typography sx={{ fontSize: 16, p: 1 }}>Recent Files</Typography>
        {data.map((filedata) => (
          <Card key={filedata.id} variant="outlined" sx={{ mb: 1 }}>
            <CardContent>
              <Grid container>
                <Grid item xs={12} lg={3}>
                    <TextSnippetIcon/>
                </Grid>
                <Grid item xs={12} lg={9} sx={{textAlign: "left"}}>
                  <Typography sx={{ fontSize: 14 }}>
                    {filedata.filename}
                  </Typography>
                  <Typography sx={{ color: "#c7df19", fontSize: 12 }}>
                    {filedata.type}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentFiles;
