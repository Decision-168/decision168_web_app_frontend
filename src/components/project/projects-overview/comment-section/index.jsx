import React, { useState, useEffect, Fragment } from "react";
import { Button, Popover, Typography, Box, Grid, IconButton, useMediaQuery } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MentionsInput, Mention } from "react-mentions";
import { Send } from "@mui/icons-material";
import ScrollBar from "react-perfect-scrollbar";
import mentionsInputStyle from "./mentionInputStyle";
import MessagesByDate from "./MessagesByDate";
import { getMentionList, getProjectComments, insertComments } from "../../../../api/modules/ProjectModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { getSubtaskComments, getTaskComments } from "../../../../api/modules/taskModule";
const CommentSection = ({ projectId, taskId, subtaskId }) => {
  console.log("projectId", projectId);
  console.log("taskId", taskId);
  console.log("subtaskId", subtaskId);
  const user = useSelector(selectUserDetails);
  // const userID = user?.reg_id;
  const userID = 1; //for testing

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentionList, setMentionList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mentionInput, setMentionInput] = useState("");
  const [loading, setLoading] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 600px)");

  const fetchCommentData = async () => {
    setLoading(true);

    try {
      let comments = [];

      if (projectId && userID) {
        const projectResponse = await getProjectComments(projectId, userID);
        comments = projectResponse.projectCommentDetail;
      }

      if (taskId && userID) {
        const taskResponse = await getTaskComments(taskId, userID);
        comments = taskResponse.taskCommentDetail;
      }

      if (subtaskId && userID) {
        const subtaskResponse = await getSubtaskComments(subtaskId, userID);
        comments = subtaskResponse.subtaskCommentDetail;
      }

      setMessages(comments);
    } catch (error) {
      console.error("Error fetching comment data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [projectId, taskId, userID]);

  // useEffect(() => {
  //   const storedMessages = localStorage.getItem(`project_${projectId}_messages`);
  //   if (storedMessages) {
  //     setMessages(JSON.parse(storedMessages));
  //   }
  // }, [projectId]);

  const saveMessagesToLocalStorage = (messages) => {
    // localStorage.setItem(`project_${projectId}_messages`, JSON.stringify(messages));
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString();
  };

  const [formValues, setFormValues] = useState({});
  const handleSendMessage = () => {
    // alert(`${JSON.stringify({
    //   project_id: projectId,
    //   tid: taskId,
    //   stid: subtaskId,
    //   message: newMessage
    // })}`)
    if (newMessage.trim() !== "") {
      const currentDate = getCurrentDate();
      const timestamp = new Date().toLocaleTimeString();
      const message = {
        id: Date.now(),
        sender: "Me",
        content: newMessage,
        timestamp: timestamp,
        date: currentDate,
        isMe: true,
      };
      const msg = {
        project_id: projectId,
        tid: taskId,
        stid: subtaskId,
        message: newMessage,
      };
      // setFormValues();
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
      setAnchorEl(null);
      setMentionInput("");
      insertMessage(msg);
      // saveMessagesToLocalStorage([...messages, message]);
    }
  };

  const insertMessage = async (mssg) => {
    console.log(mssg);
    try {
      const response = await insertComments(userID, mssg);
      fetchCommentData();
      // console.log(response)
      toast.success(`${response.message}`);
    } catch (error) {
      // console.error(error);
      toast.error(`${error.response?.error}`);
    }
  };

  const [mentionData, setMentionData] = useState([]);
  const fetchMentionData = async () => {
    try {
      const response = await getMentionList(projectId);
      setMentionData(response.mentionDetail);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchMentionData();
  }, [projectId]);

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    let mentionedUser = "";
    if (inputText.includes("@")) {
      setMentionList(mentionData);
      setAnchorEl(event.currentTarget);
      mentionedUser = inputText
        .split("@")[1]
        .replace(/\[|\]|\(|\)/g, "")
        .replace(/\d+/g, " ");
      setMentionInput(mentionedUser);
    } else {
      setAnchorEl(null);
      setMentionInput("");
    }
    setNewMessage(inputText.replace(/@\[.*?\]\(\d+\)/g, mentionedUser));
  };

  const handleMentionClick = (mention) => {
    setNewMessage((prevMessage) => {
      const mentionText = `@${mention.display} `;
      return prevMessage.replace(/@\w+/, mentionText);
    });
    setAnchorEl(null);
    setMentionInput("");
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setMentionInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const renderMessagesByDate = () => {
    const groupedMessages = {};
    messages.forEach((message) => {
      if (!groupedMessages[message.date]) {
        groupedMessages[message.date] = [];
      }
      groupedMessages[message.date].push(message);
    });

    return Object.keys(groupedMessages).map((date, index) => (
      <Fragment key={index}>
        <MessagesByDate date={date} groupedMessages={groupedMessages} setMessages={setMessages} saveMessagesToLocalStorage={saveMessagesToLocalStorage} />
      </Fragment>
    ));
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: "100%",
        background: "white",
        p: 2,
        // mt: 2,
        borderRadius: 1,
      }}
      mb={2}
    >
      <Typography sx={{ color: "#495057", fontSize: 15, fontWeight: "600", textAlign: "left" }}>Comment Section</Typography>
      <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "5px" }}>
        {loading ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: 13,
              }}
            >
              Loading...
            </Typography>
          </Box>
        ) : messages.length > 0 ? (
          <ScrollBar>
            <Box sx={{ height: "100%" }}>{renderMessagesByDate()}</Box>
          </ScrollBar>
        ) : (
          <Box
            sx={{
              // maxHeight: "380px",
              display: "flex",
              alignItems: "top",
              flexDirection: "row",
              justifyContent: "center",
              padding: "10px",
              minHeight: "300px",
            }}
          >
            <Typography
              sx={{
                fontFamily: "roboto",
                color: "#495057",
                fontSize: 13,
              }}
            >
              No Comments Available
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            p: 1,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F5F5",
            padding: "2px 4px",
            margin: "3px",
            border: "1px solid #B9B8B9",
            borderRadius: "25px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box sx={{ width: isSmallScreen ? "100%" : "80%" }}>
              {/* Your first section */}
              <MentionsInput value={newMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} style={mentionsInputStyle} placeholder="Enter Comment...">
                <Mention trigger="@" data={mentionList} renderSuggestion={(suggestion, search, highlightedDisplay) => <Box>{highlightedDisplay}</Box>} onAdd={handleMentionClick} />
              </MentionsInput>
            </Box>
            <Box>
              {/* Your second section */}
              {isSmallScreen ? (
                <IconButton onClick={handleSendMessage} color="primary" size="small">
                  <ArrowUpward sx={{ fontSize: 20 }} />
                </IconButton>
              ) : (
                // <Button sx={{ width: "20%", height: "100%" }} onClick={handleSendMessage} variant="contained" color="primary" size="small" endIcon={<Send sx={{ fontSize: 7 }} />}>
                //   Send
                // </Button>

                <IconButton onClick={handleSendMessage} size="small" type="button" sx={{ fontSize: "1.2rem", bgcolor: "#B9B8B9", color: "#000000" }}>
                  <SendIcon fontSize="inherit" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>

        <Popover open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handlePopoverClose}>
          <Typography>
            {mentionList.map((mention) => (
              <Box key={mention.id} onClick={() => handleMentionClick(mention)} style={{ cursor: "pointer" }}>
                {mention.display}
              </Box>
            ))}
          </Typography>
        </Popover>
      </Box>
    </Box>
  );
};

export default CommentSection;
