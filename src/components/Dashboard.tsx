import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { fetchRaceData } from "../services/raceService";
import { Runner } from "../types/race";
import RunnerCard from "./RunnerCard";
import RaceMap from "./RaceMap";

const PARTICIPANT_IDS = [
  "9TG4PPOP277348,9TG4PPOP277428,9TG4PPOP279145,9TG4PPOP275A54,9TG4PPOP277354,9TG4PPOP278E75,9TG4PPOP26F541,9TG4PPOP279490",
];

const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Typography
      variant="h5"
      align="center"
      sx={{
        opacity: 0.9,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        color: "#fff",
        textShadow: "0 2px 8px rgba(0,0,0,0.12)",
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      }}
    >
      {time.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}
    </Typography>
  );
};

const Dashboard: React.FC = () => {
  const [runners, setRunners] = useState<Runner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchRaceData(PARTICIPANT_IDS);
      const modifiedRunners = response.results.map((runner) => {
        if (runner.displayName === "Martin Cronholm") {
          return {
            ...runner,
            displayName: "Martin Cronholm (Samuel Schön)",
          };
        }
        return runner;
      });
      setRunners(modifiedRunners);
      setError(null);
    } catch (err) {
      setError("Failed to fetch race data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        py: 4,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 4, sm: 6, md: 8, lg: 10 } }}>
        <Paper
          elevation={0}
          sx={{
            p: 6,
            mb: 6,
            color: "primary.contrastText",
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
            backgroundImage: "url(/bg-pattern.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background:
                "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
              pointerEvents: "none",
            },
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 600,
              mb: 2,
              letterSpacing: "-0.02em",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            Göteborgsvarvet 2025
          </Typography>
          <Typography
            variant="h4"
            align="center"
            sx={{
              opacity: 0.9,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.12)",
              mb: 2,
            }}
          >
            Live Runner Tracking
          </Typography>
          <Clock />
        </Paper>

        {error && (
          <Paper
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "error.light",
              color: "error.contrastText",
              borderRadius: 1,
            }}
          >
            <Typography>{error}</Typography>
          </Paper>
        )}

        {loading && runners.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress sx={{ color: "primary.main" }} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            <Grid size={{ xs: 12 }}>
              <Paper
                elevation={1}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.2s ease-in-out",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 8px rgba(9, 30, 66, 0.25)",
                    borderColor: "primary.main",
                  },
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "primary.main",
                    color: "primary.contrastText",
                    borderTopLeftRadius: "inherit",
                    borderTopRightRadius: "inherit",
                    position: "relative",
                    overflow: "hidden",
                    backgroundImage: "url(/bg-pattern.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      background:
                        "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      fontSize: "1.5rem",
                    }}
                  >
                    Race Route
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1, p: 0, height: 500 }}>
                  <RaceMap />
                </Box>
              </Paper>
            </Grid>
            {[...runners]
              .sort(
                (a, b) =>
                  new Date(a.startDateTime).getTime() -
                  new Date(b.startDateTime).getTime()
              )
              .map((runner) => (
                <Grid
                  key={runner.idParticipant}
                  size={{ xs: 12, sm: 6, md: 4 }}
                >
                  <RunnerCard runner={runner} />
                </Grid>
              ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
