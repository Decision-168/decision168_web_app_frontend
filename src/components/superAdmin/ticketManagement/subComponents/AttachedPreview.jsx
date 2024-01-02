import { Box, Button, Grid } from "@mui/material";
import previewImg from "../../../assets/images/1676984285_decision_168_unlock_power_of_getting_started_post.png";

const AttachedPreview = () => {
  return (
    <>
      <Box px={2} py={1} mb={3} borderTop="1px solid #dadada" borderBottom="1px solid #dadada">
        <Grid item xs={12} p={2}>
          <img src={previewImg} alt="image" height={400} width={"100%"} />
        </Grid>
      </Box>
      <Grid item xs={12} pb={2} pr={4} textAlign="right">
        <Button variant="contained">Download</Button>
      </Grid>
    </>
  );
};

export default AttachedPreview;
