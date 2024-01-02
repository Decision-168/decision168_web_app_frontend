/* eslint-disable react/prop-types */
import { DownloadRounded, KeyboardDoubleArrowRight, SearchRounded } from "@mui/icons-material";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/action/modalSlice";
import ReduxDialog from "../../common/ReduxDialog";
import AttachedPreview from "./AttachedPreview";

const AttachedFileContent = ({ ticketDetail }) => {
  const theme = useTheme();

  const dispatch = useDispatch();

  return (
    <Box px={2} pt={2} pb={3} borderTop="1px solid #dadada">
      {ticketDetail?.attached_files ? (
        <Grid item xs={12} display={"flex"} boxShadow="0 12px 24px #12263f08" borderRadius="5px" padding={2}>
          <Grid item xs={8} textAlign={"left"}>
            <KeyboardDoubleArrowRight color="primary" />
            <Typography
              sx={{
                textDecoration: "none",
                color: "#343a40",
                fontWeight: "900",
                fontSize: "13px",
                textAlign: "left",
                cursor: "pointer",
                "&:hover": { color: theme.palette.primary.main },
              }}>
              {ticketDetail?.attached_files}
            </Typography>
          </Grid>
          <Grid item xs={4} display={"flex"} justifyContent={"flex-end"} alignItems={"flex-start"}>
            <IconButton onClick={() => dispatch(openModal("attachedModal"))}>
              <SearchRounded color="primary" />
            </IconButton>
            <ReduxDialog
              value={"attachedModal"}
              modalTitle={"1676984285_decision_168_unlock_power_of_getting_started_post.png"}
              showModalButton={false}
              modalSize={"md"}>
              <AttachedPreview />
            </ReduxDialog>
            <IconButton>
              <DownloadRounded color="primary" />
            </IconButton>
          </Grid>
        </Grid>
      ) : (
        <Typography sx={{ textAlign: "left", fontSize: "14px" }}>No Attached Files...</Typography>
      )}
    </Box>
  );
};

export default AttachedFileContent;
