/* eslint-disable react/prop-types */
import {
  AccountCircleRounded,
  AttachFile,
  EventAvailableRounded,
  ManageAccountsRounded,
  PersonAddAlt1Rounded,
  Sort,
  SquareRounded,
  SwapVertRounded,
  ToggleOnRounded,
  WarningRounded,
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import SelectBox from "./SelectBox";
import { getUser } from "../../../api/modules/ticketManagementModule";
import { useEffect, useState } from "react";
import Assignee from "./Assignee";

const TicketDetail = ({ ticketDetail, items }) => {
  const [userDetail, setUserDetail] = useState({});

  // get user detail
  const fetchUserDetail = async (id) => {
    try {
      const response = await getUser(id);
      setUserDetail(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserDetail(ticketDetail.created_by);
  }, [ticketDetail.created_by]);

  return (
    <>
      <Box px={2} pt={2} pb={5} borderTop="1px solid #dadada">
        <Grid boxShadow="0 12px 24px #12263f08" borderRadius="5px" padding={2}>
          <Grid xs={12}>
            <Typography display="flex" alignItems="center" fontSize="16px" fontWeight={600} textAlign="left" mb={1}>
              <SquareRounded color="primary" sx={{ mr: "2px" }} />
              Subject:
              <Typography ml={1} fontSize="16px">
                {ticketDetail?.subject}
              </Typography>
            </Typography>

            <Typography display="flex" alignItems="center" fontSize="12px" fontWeight={600} textAlign="left" ml="27px">
              Opened On:
              <Typography ml={1} fontSize="12px">
                {new Date(ticketDetail?.opened_date).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
              </Typography>
            </Typography>
          </Grid>

          <Grid xs={12} textAlign={"left"} mt={3}>
            <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600}>
              <Sort color="primary" sx={{ mr: "2px" }} />
              Description:
            </Typography>
            <Typography ml="27px" fontSize="14px">
              {ticketDetail?.description}
            </Typography>

            <Grid xs={12} display="flex" gap={6} textAlign="left">
              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <WarningRounded color="primary" sx={{ mr: "2px" }} />
                  Type:
                  <Typography ml={1} fontSize="14px">
                    {ticketDetail?.type}
                  </Typography>
                </Typography>
              </Grid>

              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <SwapVertRounded color="primary" sx={{ mr: "2px" }} />
                  Priority:
                  <Typography ml={1} fontSize="14px">
                    {ticketDetail?.priority}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} display="flex" gap={6} textAlign="left">
              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <PersonAddAlt1Rounded color="primary" sx={{ mr: "2px" }} />
                  Created By:
                  <Typography ml={1} fontSize="14px">
                    {userDetail?.first_name + " " + userDetail?.last_name}
                  </Typography>
                </Typography>
              </Grid>

              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <EventAvailableRounded color="primary" sx={{ mr: "2px" }} />
                  Created On:
                  <Typography ml={1} fontSize="14px">
                    {new Date(ticketDetail?.opened_date).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} display="flex" gap={6} alignItems="center" textAlign="left">
              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <ManageAccountsRounded color="primary" sx={{ mr: "2px" }} />
                  Assignee:
                  <Grid item xs={12} ml={1}>
                    {ticketDetail.status === "closed" || ticketDetail.status === "cancelled" || ticketDetail.status === "resolved" ? (
                      <Assignee assignee={ticketDetail.assignee} />
                    ) : (
                      <SelectBox TicketId={ticketDetail?.ticket_id} items={items} assignee={ticketDetail?.assignee} />
                    )}
                  </Grid>
                </Typography>
              </Grid>

              <Grid xs={6}>
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <EventAvailableRounded color="primary" sx={{ mr: "2px" }} />
                  Assigned On:
                  <Typography ml={1} fontSize="14px">
                    {ticketDetail?.assigned_date === null
                      ? ""
                      : new Date(ticketDetail?.assigned_date).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
            <Grid xs={12} textAlign="left">
              <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                <AccountCircleRounded color="primary" sx={{ mr: "2px" }} />
                Assigned By:
                <Typography ml={1} fontSize="14px"></Typography>
              </Typography>
            </Grid>
            <Grid xs={12} textAlign="left">
              <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                <ToggleOnRounded color="primary" sx={{ mr: "2px" }} />
                Status:
                <Typography ml={1} fontSize="14px">
                  {ticketDetail?.status}
                </Typography>
              </Typography>
            </Grid>
            {ticketDetail?.attached_files && (
              <Grid xs={12} textAlign="left">
                <Typography display="flex" alignItems="center" fontSize="14px" fontWeight={600} textAlign="left" mt={2}>
                  <AttachFile color="primary" sx={{ mr: "2px" }} />
                  Attached Files:
                  <Typography ml={1} fontSize="14px">
                    {ticketDetail?.attached_files}
                  </Typography>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TicketDetail;
