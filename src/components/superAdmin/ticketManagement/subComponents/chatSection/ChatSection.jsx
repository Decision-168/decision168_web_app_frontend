/* eslint-disable react/prop-types */
import { useState, useEffect, Fragment } from "react";
import { Button, Popover, Typography, Box } from "@mui/material";
import { MentionsInput, Mention } from "react-mentions";
import { Send } from "@mui/icons-material";
import ScrollBar from "react-perfect-scrollbar";
import mentionsInputStyle from "./mentionInputStyle";
import MessagesByDate from "./MessagesByDate";

const ChatSection = ({ ticket_id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [mentionList, setMentionList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [, setMentionInput] = useState("");

  useEffect(() => {
    const storedMessages = localStorage.getItem(`ticket_${ticket_id}_messages`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, [ticket_id]);

  const saveMessagesToLocalStorage = (messages) => {
    localStorage.setItem(`ticket_${ticket_id}_messages`, JSON.stringify(messages));
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
        sender: "Support Admin",
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
        <MessagesByDate
          date={date}
          groupedMessages={groupedMessages}
          setMessages={setMessages}
          saveMessagesToLocalStorage={saveMessagesToLocalStorage}
        />
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
        borderRadius: 1,
      }}
      borderTop="1px solid #dadada"
      mb={2}>
      <Typography sx={{ color: "#495057", fontSize: 15, fontWeight: "600", textAlign: "left", mb: 1 }}>Chat Section</Typography>
      <Box sx={{ border: "1px solid #E0E0E0", borderRadius: "5px" }}>
        {messages.length > 0 ? (
          <ScrollBar>
            <Box sx={{ maxHeight: "100%" }}>{renderMessagesByDate()}</Box>
          </ScrollBar>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "top",
              flexDirection: "row",
              justifyContent: "flex-start",
              padding: "10px",
              minHeight: "60px",
            }}>
            <Typography
              sx={{
                color: "#495057",
                fontSize: 13,
              }}>
              No message...
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            borderTop: "1px solid #E0E0E0",
            p: 1,
          }}>
          <MentionsInput
            value={newMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={mentionsInputStyle}
            placeholder="Enter Message...">
            <Mention
              trigger="@"
              data={mentionList}
              renderSuggestion={(suggestion, search, highlightedDisplay) => <Box>{highlightedDisplay}</Box>}
              onAdd={handleMentionClick}
            />
          </MentionsInput>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "end",
            }}>
            <Button sx={{ mt: 1 }} onClick={handleSendMessage} variant="contained" color="primary" size="small">
              Send <Send sx={{ ml: 1, fontSize: "12px" }} />
            </Button>
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
    </Box>
  );
};

export default ChatSection;
