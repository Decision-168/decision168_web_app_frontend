import { Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import React, { useEffect, useState } from "react";
import { getRecentFilesData } from "../../../api/modules/FileCabinetModule";
// const data = [
//   {
//     id: "0",
//     name: "docx_file.docx",
//     type: "subtask-file",
//     label: "Subtask",
//     color: "#004225",
//     overview: "yes",
//     section: "1",
//   },
//   {
//     id: "1",
//     name: "excel_file.xlsx",
//     type: "project-file",
//     label: "Project",
//     color: "#004225",
//     overview: "yes",
//     section: "1",
//   },
//   {
//     id: "2",
//     name: "img_file.png",
//     type: "task-file",
//     label: "Task",
//     color: "#004225",
//     overview: "yes",
//     section: "1",
//   },
//   {
//     id: "23",
//     name: "pdf_file.pdf",
//     type: "task-file",
//     label: "Task",
//     color: "#004225",
//     overview: "yes",
//     section: "1",
//   },
// ];
const RecentFiles = ({ handleFileOpen, regId, portfolioId }) => {
  const [recentFilesData, setRecentFilesData] = useState([]);
  // Recent Files Data ----------------------------------------------
  const fetchRecentFilesData = async () => {
    try {
      const response = await getRecentFilesData(regId, portfolioId);
      setRecentFilesData(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRecentFilesData();
  }, [regId]);

  return (
    <Paper elevation={0} sx={{ m: 1 }}>
      <Box
        sx={{
          p: 1,
          textAlign: "left",
          "& .MuiCardContent-root:last-child": {
            pb: 1,
          },
        }}
      >
        <Typography sx={{ fontSize: 16, p: 1 }}>Recent Files</Typography>
        {recentFilesData.map((filedata) => (
          <Card
            key={filedata.id}
            variant="outlined"
            sx={{ mb: 1, cursor: "pointer" }}
            onClick={() => handleFileOpen(filedata)}
          >
            <CardContent>
              <Grid container>
                <Grid item xs={12} lg={3}>
                  <TextSnippetIcon />
                </Grid>
                <Grid item xs={12} lg={9} sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontSize: 13 }}>{filedata.name}</Typography>
                  <Typography sx={{ color: "#c7df19", fontSize: 11 }}>
                    {filedata.label}
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
