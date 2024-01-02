import { Box, Grid, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import BasicBreadcrumbs from "./../../../common/BasicBreadcrumbs";
import TicketBox from "./subComponents/TicketBox";
import { useEffect, useState } from "react";
import { getAllSupporter, getTicketDetail, getUser } from "../../../../api/modules/ticketManagementModule";
import AttachmentBox from "./subComponents/AttachmentBox";
import ChatSection from "../chatSection/ChatSection";

const Index = () => {
  const [allSupporter, setAllSupporter] = useState([]);
  const [ticketDetail, setTicketDetail] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // get ticket detail
  const fetchTicketDetail = async (id) => {
    try {
      const response = await getTicketDetail(id);
      setTicketDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  // get user detail
  const fetchUserDetail = async (id) => {
    try {
      const response = await getUser(id);
      setUserDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  // get supporter list
  const fetchAllSupporter = async () => {
    try {
      const response = await getAllSupporter();
      setAllSupporter(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTicketDetail(id);
    fetchUserDetail(ticketDetail.created_by);
    fetchAllSupporter();
  }, [id, ticketDetail.created_by]);

  const items = allSupporter?.map((supporter) => {
    const { reg_id, first_name, last_name } = supporter;
    const data = { value: reg_id, text: first_name + " " + last_name };
    return data;
  });

  return (
    <Box sx={{ flexGrow: 1 }} mt="-20px" mb={2}>
      <Grid container>
        <Grid item xs={12} lg={12} mb={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}>
            <BasicBreadcrumbs currentPage="overview" />
            <Button
              sx={{ fontSize: "12px", color: "white", ml: "40px" }}
              size="small"
              color="secondary"
              variant="contained"
              onClick={() => navigate("/super-admin/support-list")}>
              <ArrowBack sx={{ fontSize: "12px", mr: "5px" }} />
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item display={"flex"} gap={3} xs={12} lg={12}>
          <Grid xs={8} display={"flex"} flexDirection={"column"} gap={3}>
            <TicketBox items={items} ticketDetail={ticketDetail} userDetail={userDetail} />
            <AttachmentBox ticketDetail={ticketDetail} />
          </Grid>
          <Grid xs={4}>
            <ChatSection ticket_id={ticketDetail.ticket_id} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Index;
