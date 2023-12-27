import React, { memo, useState } from "react";
import Typography from "@mui/material/Typography";
import { Box, Divider, IconButton, MenuItem, Popover } from "@mui/material";
import { DoDisturb, MoreVert, Schedule } from "@mui/icons-material";
import moment from "moment";
import { deleteComment } from "../../../../api/modules/ProjectModule";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { toast } from "react-toastify";
const MessagesByDate = ({ date, groupedMessages, setMessages, saveMessagesToLocalStorage }) => {
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const [deletePopoverAnchor, setDeletePopoverAnchor] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (event, itemId) => {
    setDeletePopoverAnchor(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handlePopoverClose = () => {
    setDeletePopoverAnchor(null);
    setSelectedItemId(null);
  };

  const handleDeleteMessage = async () => {
    try {
      const response = await deleteComment(userID, selectedItemId);
      setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === selectedItemId ? { ...msg, isDeleted: true } : msg)));

      setMessages((prevMessages) => {
        saveMessagesToLocalStorage([...prevMessages]);
        return prevMessages;
      });
      setDeletePopoverAnchor(null);
      setSelectedItemId(null);

      toast.success(`${response.message}`);
    } catch (error) {
      console.error(error);
      toast.error(`${error.response?.error}`);
    }
  };

  return (
    <Box p={2}>
      <Divider>
        <Typography my={1} sx={{ fontSize: 13, color: "#495057" }}>
          {moment(date, "DD/MM/YYYY").format("Do MMMM, YYYY")}
        </Typography>
      </Divider>
      {groupedMessages[date].map((message) => (
        <Box key={message.id} sx={{ textAlign: message.isMe ? "right" : "left" }}>
          <Box
            sx={{
              background: "#eff2f7",
              textAlign: "right",
              borderRadius: "8px 8px 0 8px",
              my: 1,
              display: "inline-block",
              position: "relative",
              p: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {message.isMe ? (
                <>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#556EE6",
                      mx: 1,
                    }}
                  >
                    {message.cCode ? message.cCode : ""}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: "#343A40",
                      }}
                    >
                      {message.sender}
                    </Typography>
                    {!message.isDeleted && (
                      <>
                        <IconButton aria-label="more" onClick={(e) => handleDeleteClick(e, message.id)} size="small">
                          <MoreVert fontSize="inherit" />
                        </IconButton>
                        <Popover
                          elevation={1}
                          open={Boolean(deletePopoverAnchor)}
                          anchorEl={deletePopoverAnchor}
                          onClose={handlePopoverClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem onClick={handleDeleteMessage}>Delete</MenuItem>
                        </Popover>
                      </>
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: "600",
                        color: "#343A40",
                      }}
                    >
                      {message.sender}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: "600",
                      color: "#556EE6",
                      mx: 1,
                    }}
                  >
                    {message?.cCode ? message.cCode : ""}
                  </Typography>
                </>
              )}
            </Box>
            <Box>
              {message.isDeleted ? (
                <Typography
                  sx={{
                    fontStyle: "italic",
                    fontSize: 13,
                    color: "#495057",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <DoDisturb
                    sx={{
                      fontSize: 12,
                      color: "#74788d",
                      textAlign: message.isMe ? "right" : "left",
                    }}
                  />{" "}
                  You deleted this message
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontSize: 13,
                    color: "#495057",
                    textAlign: message.isMe ? "right" : "left",
                  }}
                >
                  {message.content}
                </Typography>
              )}
            </Box>
            {!message.isDeleted && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: message.isMe ? "end" : "start",
                  mt: 1,
                }}
              >
                <Schedule sx={{ fontSize: 12, color: "#74788d" }} />
                <Typography sx={{ fontSize: 12, color: "#74788d" }}>{moment(message.timestamp, "h:mm:ss A").format("hh:mm A")}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default memo(MessagesByDate);
