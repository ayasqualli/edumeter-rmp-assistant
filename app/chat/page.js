"use client"; // Client Component
import { Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout'; // Import the Logout icon
import SendIcon from '@mui/icons-material/Send'; // Import the Send icon
import { useState } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth, signOut } from "@clerk/nextjs";


export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ]);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const sendMessage = async () => {
    if (!message.trim()) return;

    setMessages((messages) => [
      ...messages,
      { role: "user", content: message },
      { role: "assistant", content: "" },
    ]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }]),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      const processText = async ({ done, value }) => {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {
          stream: true,
        });
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            { ...lastMessage, content: lastMessage.content + text },
          ];
        });
        return reader.read().then(processText);
      };

      reader.read().then(processText);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out from Clerk first
      router.push('/'); // Then redirect
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle the error appropriately, e.g., show an error message to the user
    }
  };
  

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#1A1A1A" // Black background for the whole page
    >
      <Box
        width="50vw"
        maxWidth="600px"
        height="80vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        bgcolor="#2C2C2C" // Slightly lighter black for the chat box
        borderRadius="16px"
        boxShadow="0px 4px 12px rgba(0, 0, 0, 0.5)" // Subtle shadow for a modern look
        color="#FFFFFF" // White text
      >
        <Box
          width="100%"
          p={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          borderBottom="1px solid #6A0DAD" // Brighter purple border for the header
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Rate My Professor Chat
          </Typography>
          <IconButton onClick={handleLogout}>
            <LogoutIcon sx={{ color: "#6A0DAD" }} /> {/* Purple icon, no background */}
          </IconButton>
        </Box>

        <Stack
          direction={"column"}
          width="100%"
          p={3}
          spacing={2}
          overflow="auto"
          sx={{ 
            flexGrow: 1,
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#6A0DAD",
              borderRadius: "8px",
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === "assistant" ? "flex-start" : "flex-end"
              }
            >
              <Box
                bgcolor={
                  message.role === "assistant" ? "#6A0DAD" : "#424242" // Brighter purple for assistant, dark gray for user
                }
                color="white"
                borderRadius={16}
                p={2}
                maxWidth="75%"
                boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)" // Subtle shadow for a modern look
              >
                {message.content}
              </Box>
            </Box>
          ))}
        </Stack>

        <Box
          p={2}
          display="flex"
          alignItems="center"
          bgcolor="#2C2C2C" // Slightly lighter black for the input area
          borderTop="1px solid #6A0DAD" // Brighter purple border
        >
          <TextField
            label="Type your message..."
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            InputProps={{
              style: { 
                color: 'white', 
                backgroundColor: '#333333', 
                borderRadius: '8px', 
                borderColor: '#6A0DAD', // Purple border for input field
              },
            }}
            InputLabelProps={{
              style: { color: '#BDBDBD' },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6A0DAD", // Purple border
                },
                "&:hover fieldset": {
                  borderColor: "#6A0DAD", // Purple border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#6A0DAD", // Purple border when focused
                },
              },
            }}
          />
          <IconButton 
            onClick={sendMessage} 
            sx={{ 
              color: "#6A0DAD", // Purple color for the send icon
              ml: 1,
            }}
          > 
            <SendIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
