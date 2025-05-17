import React from "react";
import { Box, Paper, Typography } from "@mui/material";

const RaceMap = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%", // Take full height of parent container
        position: "relative",
        overflow: "hidden",
        borderRadius: 1,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: 1,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            p: 1.5,
            fontWeight: 500,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          Official Göteborgsvarvet 2025 Tracking Map
        </Typography>
        <Box
          component="iframe"
          src="https://goteborgsvarvet.r.mikatiming.com/2025/?pid=tracking&pidp=tracking"
          sx={{
            border: "none",
            width: "100%",
            height: "calc(100% - 48px)", // Subtract the header height
            display: "block",
          }}
          title="Göteborgsvarvet 2025 Live Tracking"
          allowFullScreen
          loading="lazy"
        />
      </Paper>
    </Box>
  );
};

export default RaceMap;
