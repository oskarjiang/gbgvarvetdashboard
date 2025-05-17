import React, { useEffect, useRef } from "react";
import { Box, Paper, Typography, Button } from "@mui/material";

const MAP_URL =
  "https://goteborgsvarvet.r.mikatiming.com/2025/?pid=tracking&pidp=tracking";

const RaceMap = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Set the cookie for the mikatiming domain using our proxy
    const setCookie = async () => {
      try {
        // Use the proxy setting from package.json
        await fetch("/2025/?pid=tracking&pidp=tracking", {
          method: "HEAD", // Just need headers, not body
          headers: {
            Cookie:
              "results_favorites=9TG4PPOP277354%7C9TG4PPOP277348%7C9TG4PPOP277428%7C9TG4PPOP278E75%7C9TG4PPOP279145%7C9TG4PPOP26F541%7C9TG4PPOP27816F%7C9TG4PPOP275A54;",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
          },
          credentials: "include", // Include cookies in the request
        });

        // Reload the iframe to use the newly set cookie
        if (iframeRef.current) {
          iframeRef.current.src = MAP_URL;
        }
      } catch (error) {
        console.error("Error setting cookies:", error);
      }
    };

    setCookie();
  }, []);

  const reloadMap = () => {
    if (iframeRef.current) {
      iframeRef.current.src = MAP_URL;
    }
  };

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
        <Box
          sx={{
            p: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 500,
            }}
          >
            Official Göteborgsvarvet 2025 Tracking Map
          </Typography>
          <Button size="small" variant="text" onClick={reloadMap}>
            Reload
          </Button>
        </Box>
        <Box
          component="iframe"
          ref={iframeRef}
          src={MAP_URL}
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
