import React, { useState, useEffect, Fragment } from "react";
import { Button, Popover, Typography, Box, Grid, IconButton, useMediaQuery, Paper } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { MentionsInput, Mention } from "react-mentions";
import { ArrowUpward, Send } from "@mui/icons-material";
import ScrollBar from "react-perfect-scrollbar";
import mentionsInputStyle from "./mentionInputStyle";
import MessagesByDate from "./MessagesByDate";
import { getMentionList, getProjectComments, insertComments } from "../../../../api/modules/ProjectModule";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../../../redux/action/userSlice";
import { getSubtaskComments, getTaskComments } from "../../../../api/modules/taskModule";
import { useTheme } from "@mui/material/styles";
import Loader from "../../../common/Loader";
const CommentSection = ({ projectId, taskId, subtaskId, commentModule }) => {
  const user = useSelector(selectUserDetails);
  const userID = user?.reg_id;
  const theme = useTheme();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentionList, setMentionList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mentionInput, setMentionInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCommentData = async () => {
    setLoading(true);
    if (commentModule == "project") {
      if (projectId && userID) {
        try {
          const response = await getProjectComments(projectId, userID);
          setMessages(response.projectCommentDetail);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    } else if (commentModule == "task") {
      if (taskId && userID) {
        try {
          const response = await getTaskComments(taskId, userID);
          setMessages(response.taskCommentDetail);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    } else if (commentModule == "subtask") {
      if (subtaskId && userID) {
        try {
          const response = await getSubtaskComments(subtaskId, userID);
          setMessages(response.subtaskCommentDetail);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    fetchCommentData();
  }, [subtaskId, taskId, projectId, userID]);

  const saveMessagesToLocalStorage = (messages) => {};

  const getCurrentDate = () => {
    return new Date().toLocaleDateString();
  };

  const [formValues, setFormValues] = useState({});
  const handleSendMessage = () => {
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
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
      setAnchorEl(null);
      setMentionInput("");
      insertMessage(msg);
    }
  };

  const insertMessage = async (mssg) => {
    try {
      const response = await insertComments(userID, mssg);
      fetchCommentData();
      toast.success(`${response.message}`);
    } catch (error) {
      toast.error(`${error.response?.error}`);
    }
  };

  const [mentionData, setMentionData] = useState([]);
  const fetchMentionData = async () => {
    try {
      const response = await getMentionList(projectId);
      setMentionData(response.mentionDetail);
    } catch (error) {}
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
   <Box sx={{ p: 2}}>
     <Paper elevation={0} sx={{ p: 2, bgcolor: "#F7F7F7", maxWidth: "100%" }}>
      {/* <Typography
        sx={{
          bgcolor: theme.palette.primary.main,
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "500",
          textAlign: "center",
          borderTopLeftRadius:"5px" ,
          borderTopRightRadius:"5px", 
          borderBottom:"2px solid #D9D9D9",
        }}
      >
        Comment Section
      </Typography> */}

      {loading ? (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography
            sx={{
              color: "#495057",
              fontSize: 13,
            }}
          >
            <Loader />
          </Typography>
        </Box>
      ) : messages.length > 0 ? (
        <ScrollBar>
          <Box sx={{ maxHeight: "50vh" }}>{renderMessagesByDate()}</Box>
        </ScrollBar>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
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
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            width: "100%",
            overflow: "hidden",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F5F5",
            padding: "3px 4px",
            margin: "3px",
            borderRadius: "5px",
          }}
        >
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <MentionsInput value={newMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} style={mentionsInputStyle} placeholder="Write Comment...">
              <Mention trigger="@" data={mentionList} renderSuggestion={(suggestion, search, highlightedDisplay) => <Box>{highlightedDisplay}</Box>} onAdd={handleMentionClick} />
            </MentionsInput>
          </Box>
          <Box>
            <Button onClick={handleSendMessage} variant="contained" color="primary" size="small" sx={{mb:0.8}}>
              Send
            </Button>
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
    </Paper>
   </Box>
  );
};

export default CommentSection;
