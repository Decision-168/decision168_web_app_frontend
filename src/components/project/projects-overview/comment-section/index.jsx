import React, { useState, useEffect, Fragment } from "react";
import { Button, Popover, Typography, Box, Grid, IconButton } from "@mui/material";
import { MentionsInput, Mention } from "react-mentions";
import { Send } from "@mui/icons-material";
import ScrollBar from "react-perfect-scrollbar";
import mentionsInputStyle from "./mentionInputStyle";
import MessagesByDate from "./MessagesByDate";
const CommentSection = ({ projectId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentionList, setMentionList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mentionInput, setMentionInput] = useState("");

  useEffect(() => {
    const storedMessages = localStorage.getItem(`project_${projectId}_messages`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [projectId]);

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem(`project_${projectId}_messages`, JSON.stringify(messages));
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString();
  };

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

      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
      setAnchorEl(null);
      setMentionInput("");
      saveMessagesToLocalStorage([...messages, message]);
    }
  };

  const handleInputChange = (event) => {
    const inputText = event.target.value;
    let mentionedUser = "";
    if (inputText.includes("@")) {
      setMentionList([
        { id: 1, display: "Alim Mohammad" },
        { id: 2, display: "Syed Jammel" },
        { id: 3, display: "Arshad Khan" },
      ]);
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
        {messages.length > 0 ? (
          <ScrollBar>
            <Box sx={{ height: "100%" }}>{renderMessagesByDate()}</Box>
          </ScrollBar>
        ) : (
          <Box
            sx={{
              // maxHeight: "380px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
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
            p: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#F5F5F5",
            padding: "16px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              {/* Your first section */}
              <MentionsInput value={newMessage} onChange={handleInputChange} onKeyDown={handleKeyDown} style={mentionsInputStyle} placeholder="Enter Comment...">
                <Mention trigger="@" data={mentionList} renderSuggestion={(suggestion, search, highlightedDisplay) => <Box>{highlightedDisplay}</Box>} onAdd={handleMentionClick} />
              </MentionsInput>
            </Grid>
            <Grid item xs={2}>
              {/* Your second section */}
              <Button sx={{ width: "100%", height: "100%" }} onClick={handleSendMessage} variant="contained" color="primary" size="small" endIcon={<Send sx={{ fontSize: 7 }} />}>
                Send
              </Button>
            </Grid>
          </Grid>
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
