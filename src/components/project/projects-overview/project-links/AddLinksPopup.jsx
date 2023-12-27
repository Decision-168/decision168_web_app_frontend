import { Box, Button, DialogActions, DialogContent, Grid } from "@mui/material";
import React, { useState } from "react";
import AddLinks from "../../portfolio-projects-list/AddLinks";
import { toast } from "react-toastify";
import { closeModal } from "../../../../redux/action/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { updateProjectLinkData } from "../../../../api/modules/ProjectModule";

const AddLinksPopup = ({
  projectId,
  refreshData,
  oldLinks,
  oldLinkComments,
}) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState([
    {
      link: "",
      linkComment: "",
    },
  ]);
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const handleLinks = async () => {
    const pLinksArr = fields.map((item) => {
      return item.link;
    });
    const pLinkCommentsArr = fields.map((item) => {
      return item.linkComment;
    });
    const newLinks = pLinksArr.join(",");
    const newLinkComments = pLinkCommentsArr.join(",");

    let projectLinks = newLinks;
    let projectLinkComments = newLinkComments;

    if (oldLinks) {
      projectLinks = `${oldLinks},${newLinks}`;
    }

    if (oldLinkComments) {
      projectLinkComments = `${oldLinkComments},${newLinkComments}`;
    }

    try {
      const formData = {
        plink: projectLinks,
        plink_comment: projectLinkComments,
      };
      formData.pid = projectId;
      formData.pcreated_by = userID;

      const response = await updateProjectLinkData(formData);
      toast.success(`${response.message}`);
      refreshData();
      dispatch(closeModal("add-links"));
    } catch (error) {
      toast.error(`${error.response?.error}`);
    }
  };

  return (
    <>
      <DialogContent dividers>
        <Box sx={{ width: "100%", background: "white", p: 2, borderRadius: 1 }}>
          <Grid container spacing={1}>
            <AddLinks fields={fields} setFields={setFields} />
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            pt: 1,
            mr: 2,
            width: "100%",
          }}
        >
          <Button variant="contained" size="small" onClick={handleLinks}>
            Save Changes
          </Button>
        </Box>
      </DialogActions>
    </>
  );
};

export default AddLinksPopup;
