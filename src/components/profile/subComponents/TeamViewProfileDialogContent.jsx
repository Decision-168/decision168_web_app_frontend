import { Grid, Paper } from "@mui/material";
import CardFeaturesTeam from "../../common/CardFeaturesTeam";
import CoverImage from "../../common/CoverImage";
import TeamPersonalInfo from "./TeamPersonalInfo";
import { useEffect, useState } from "react";
import CardAvatar from "../../common/CardAvatar";
import { getUserDetails } from "../../../api/modules/dashboardModule";

export default function TeamViewProfileDialogContent({ memberID }) {
  const [memberDetail, setMemberDetail] = useState([]);

  useEffect(() => {
    const fetchTeamProfileData = async () => {
      try {
        const response = await getUserDetails(memberID);
        setMemberDetail(response);
      } catch (error) {}
    };

    fetchTeamProfileData();
  }, [memberID]);

  const fullName = `${memberDetail?.first_name} ${memberDetail?.middle_name} ${memberDetail?.last_name} `;

  return (
    <Paper elevation={0} sx={{ height: "80vh" }}>
      <Grid container>
        <Grid item xs={12}>
          <CoverImage />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CardAvatar
            fullName={fullName}
            photo={memberDetail?.photo}
            designation={memberDetail?.designation}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <CardFeaturesTeam
            memberID={memberID}
            memberEmail={memberDetail?.email_address}
          />
        </Grid>
      </Grid>

      <Grid container mt={2}>
        <Grid item xs={12}>
          <TeamPersonalInfo memberDetail={memberDetail} />
        </Grid>
      </Grid>
    </Paper>
  );
}
