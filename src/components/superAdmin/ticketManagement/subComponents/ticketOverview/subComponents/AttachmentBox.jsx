/* eslint-disable react/prop-types */
import { DescriptionOutlined, DownloadRounded, SearchRounded } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import ReduxDialog from "../../../../common/ReduxDialog";
import AttachedPreview from "../../AttachedPreview";
import { openModal } from "../../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";

const AttachmentBox = ({ ticketDetail }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box px={2} pt={2} pb={5} bgcolor="#fff" boxShadow="0 12px 24px #12263f08" borderRadius="5px" padding={2}>
      <Grid item xs={12}>
        <Typography fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
          Attached Files
        </Typography>
      </Grid>
      {ticketDetail.attached_files && (
        <Grid container xs={12} display={"flex"} padding={2}>
          <Grid item xs={8} display={"flex"} alignItems={"center"} gap={2} textAlign={"left"}>
            <Avatar sx={{ width: 45, height: 45, bgcolor: "#383838" }}>
              <DescriptionOutlined />
            </Avatar>
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
              {ticketDetail.attached_files}
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
      )}
    </Box>
  );
};

export default AttachmentBox;
